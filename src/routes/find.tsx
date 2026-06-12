import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useRef } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
  ArrowLeft,
  MessageCircle,
  Sparkles,
  Inbox,
  CheckCheck,
  Loader2,
  Share2,
  Trash2,
  ShieldCheck,
  ArrowUp,
  Image as ImageIcon,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCamp } from "@/lib/camp-store";
import { ITEMS, SIZES_BY_ITEM, type Item } from "@/lib/kit-data";
import { supabase } from "@/integrations/supabase/client";
import { shareApp, GENERIC_SHARE_TEXT, FEEDBACK_MAILTO, shareToWhatsApp } from "@/lib/share";
import { NotificationPermissionBanner } from "@/components/notification-permission-banner";
import { Footer } from "@/components/footer";

function getOwnerToken(listingId: string): string | null {
  try {
    const raw = localStorage.getItem("kitmatch:owner_tokens");
    if (!raw) return null;
    const map = JSON.parse(raw) as Record<string, string>;
    return map[listingId] ?? null;
  } catch {
    return null;
  }
}

function clearOwnerToken(listingId: string) {
  try {
    const raw = localStorage.getItem("kitmatch:owner_tokens");
    if (!raw) return;
    const map = JSON.parse(raw) as Record<string, string>;
    delete map[listingId];
    localStorage.setItem("kitmatch:owner_tokens", JSON.stringify(map));
  } catch {
    // ignore
  }
}

const findSearchSchema = z.object({
  item: z.string().optional().catch("all"),
  size: z.string().optional().catch("all"),
  perfect: z.boolean().optional().catch(false),
  camp: z.string().optional(),
});

type FindSearch = z.infer<typeof findSearchSchema>;

export const Route = createFileRoute("/find")({
  validateSearch: (search) => findSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Find Matches — KitMatch" },
      { name: "description", content: "Browse kit swap listings from corps members in your camp." },
    ],
  }),
  component: FindPage,
});

type SwapRow = {
  id: string;
  camp: string;
  name: string;
  platoon: string;
  whatsapp: string;
  item: string;
  have_size: string;
  need_size: string;
  status: string;
  created_at: string;
};

function FindPage() {
  const { camp: storedCamp, ready, setCamp } = useCamp();
  const navigate = useNavigate();
  const { item: itemFilter, size: sizeFilter, perfect: perfectOnly, camp: urlCamp } = Route.useSearch();
  const qc = useQueryClient();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const camp = urlCamp || storedCamp;

  useEffect(() => {
    if (ready && !camp) {
      navigate({ to: "/" });
    } else if (ready && urlCamp && urlCamp !== storedCamp) {
      setCamp(urlCamp);
    }
  }, [ready, camp, urlCamp, storedCamp, navigate, setCamp]);

  const PAGE_SIZE = 10;
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["swap_requests", camp, itemFilter, sizeFilter],
    enabled: !!camp,
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }): Promise<SwapRow[]> => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from("swap_requests")
        .select("id, camp, name, platoon, whatsapp, item, have_size, need_size, status, created_at", { count: "exact" })
        .eq("camp", camp!)
        .eq("status", "available");

      if (itemFilter && itemFilter !== "all") {
        query = query.eq("item", itemFilter);
      }

      if (sizeFilter && sizeFilter !== "all") {
        query = query.eq("need_size", sizeFilter);
      }

      const { data, error, count } = await query
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      if (pageParam === 0 && count !== null) setTotalCount(count);
      return data as SwapRow[];
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === PAGE_SIZE ? allPages.length : undefined;
    },
  });

  const listings = useMemo(() => data?.pages.flat() ?? [], [data]);

  const markSwapped = useMutation({
    mutationFn: async ({ id, status = "swapped" }: { id: string; status?: string }) => {
      const token = getOwnerToken(id);
      if (!token) throw new Error("Only the original poster can manage this listing.");
      const { data, error } = await supabase.rpc("mark_swap_swapped", {
        p_id: id,
        p_token: token,
      });
      if (error) throw error;
      if (!data) throw new Error("Could not update listing.");
      clearOwnerToken(id);
    },
    onSuccess: (_, variables) => {
      toast.success(variables.status === "swapped" ? "Marked as swapped" : "Listing removed");
      qc.invalidateQueries({ queryKey: ["swap_requests", camp] });
    },
    onError: (e: Error) => toast.error(e.message || "Couldn't update. Try again."),
  });

  const sizeOptions = useMemo(() => {
    if (!itemFilter || itemFilter === "all") return [];
    return SIZES_BY_ITEM[itemFilter as Item] ?? [];
  }, [itemFilter]);

  const updateFilters = (newFilters: Partial<FindSearch>) => {
    navigate({
      search: (prev) => ({ ...prev, ...newFilters }),
    });
  };

  const { perfect, others } = useMemo(() => {
    const myListingIds = listings.filter((l) => !!getOwnerToken(l.id)).map((l) => l.id);
    const myActiveListings = listings.filter((l) => myListingIds.includes(l.id));

    const isPerfect = (l: SwapRow) => {
      if (myActiveListings.length === 0) return false;

      const isMine = !!getOwnerToken(l.id);
      if (isMine) {
        // My listing is "perfect" if there's at least one OTHER person's listing that matches it
        return listings.some(
          (o) =>
            !getOwnerToken(o.id) &&
            o.item === l.item &&
            o.have_size === l.need_size &&
            o.need_size === l.have_size,
        );
      } else {
        // Someone else's listing is "perfect" if it matches one of MY listings
        return myActiveListings.some(
          (my) =>
            l.item === my.item && l.have_size === my.need_size && l.need_size === my.have_size,
        );
      }
    };

    const perfect: SwapRow[] = [];
    const others: SwapRow[] = [];
    for (const l of listings) (isPerfect(l) ? perfect : others).push(l);
    return { perfect, others: perfectOnly ? [] : others };
  }, [listings, perfectOnly]);

  if (!ready || !camp) return null;

  return (
    <main className="min-h-screen bg-background pb-12">
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-md mx-auto px-5 py-3 flex items-center gap-3">
          <Link to="/" className="size-9 rounded-lg border grid place-items-center hover:bg-accent">
            <ArrowLeft className="size-4" />
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="font-semibold leading-tight">Find Matches</h1>
            <p className="text-xs text-muted-foreground truncate">{camp}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="size-9 rounded-lg border grid place-items-center hover:bg-accent"
                aria-label="Share KitMatch"
              >
                <Share2 className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl">
              <DropdownMenuItem onClick={() => shareApp(GENERIC_SHARE_TEXT, "KitMatch", camp)}>
                <Send className="size-4 mr-2" /> Share Link
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => shareToWhatsApp(GENERIC_SHARE_TEXT, camp)}>
                <MessageCircle className="size-4 mr-2" /> Share to WhatsApp
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5 py-5 space-y-4">
        <NotificationPermissionBanner />

        <div className="rounded-2xl border bg-card p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Which kit item?</Label>
              <Select
                value={itemFilter || "all"}
                onValueChange={(val) => updateFilters({ item: val, size: "all" })}
              >
                <SelectTrigger className="h-11 rounded-xl bg-muted/30">
                  <SelectValue placeholder="Choose item" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  {ITEMS.map((i) => (
                    <SelectItem key={i} value={i}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Size you need?</Label>
              <Select
                value={sizeFilter || "all"}
                onValueChange={(val) => updateFilters({ size: val })}
                disabled={!itemFilter || itemFilter === "all"}
              >
                <SelectTrigger className="h-11 rounded-xl bg-muted/30">
                  <SelectValue placeholder="Any size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Size</SelectItem>
                  {sizeOptions.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t pt-4">
            <Label htmlFor="perfect" className="text-sm font-medium">
              Show perfect matches only
            </Label>
            <Switch
              id="perfect"
              checked={!!perfectOnly}
              onCheckedChange={(val) => updateFilters({ perfect: val })}
            />
          </div>

          {(itemFilter !== "all" || sizeFilter !== "all" || perfectOnly) && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs text-muted-foreground h-8"
              onClick={() => updateFilters({ item: "all", size: "all", perfect: false })}
            >
              Clear all filters
            </Button>
          )}
        </div>

        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-medium text-muted-foreground">
            {isLoading ? "Searching..." : `${totalCount ?? 0} listings found`}
          </h2>
        </div>

        {isLoading ? (
          <div className="py-16 grid place-items-center text-muted-foreground">
            <Loader2 className="size-6 animate-spin" />
          </div>
        ) : perfect.length + others.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {perfect.map((l) => (
              <ListingCard
                key={l.id}
                listing={l}
                perfect
                isOwner={!!getOwnerToken(l.id)}
                onSwapped={(status) => markSwapped.mutate({ id: l.id, status })}
                swapping={markSwapped.isPending}
              />
            ))}
            {others.map((l) => (
              <ListingCard
                key={l.id}
                listing={l}
                isOwner={!!getOwnerToken(l.id)}
                onSwapped={(status) => markSwapped.mutate({ id: l.id, status })}
                swapping={markSwapped.isPending}
              />
            ))}

            {hasNextPage && (
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl mt-4"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Load More Listings"
                )}
              </Button>
            )}
          </div>
        )}

        <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4 flex gap-3 items-center">
          <ShieldCheck className="size-5 text-primary shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Safety:</strong> Only meet other corps members <strong>inside the camp</strong>. Use with caution.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t flex items-center justify-center gap-5 text-xs text-muted-foreground">
          <button
            onClick={() => shareApp(GENERIC_SHARE_TEXT, "KitMatch", camp)}
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            <Share2 className="size-3.5" /> Share KitMatch
          </button>
          <a
            href={FEEDBACK_MAILTO}
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            <Mail className="size-3.5" /> Feedback
          </a>
        </div>
      </div>

      {showScrollTop && (
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 size-12 rounded-full shadow-lg z-20"
          size="icon"
        >
          <ArrowUp className="size-5" />
        </Button>
      )}
    </main>
  );
}

function ListingCard({
  listing,
  perfect,
  isOwner,
  onSwapped,
  swapping,
}: {
  listing: SwapRow;
  perfect?: boolean;
  isOwner?: boolean;
  onSwapped: (status?: string) => void;
  swapping: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);

  const waUrl = `https://wa.me/${listing.whatsapp}?text=${encodeURIComponent(
    `Hi ${listing.name}, I saw your KitMatch post for ${listing.item} (you have size ${listing.have_size}, need ${listing.need_size}). Let's swap.`,
  )}`;

  const handleShareAsImage = async () => {
    if (!cardRef.current) return;
    setIsSharing(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        backgroundColor: "white",
        style: {
          transform: "scale(1)",
        },
      });

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `kitmatch-${listing.item.replace(/\s+/g, "-").toLowerCase()}.png`, { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "KitMatch Swap",
          text: `Check out this kit swap for ${listing.item} at ${listing.camp}!`,
        });
      } else {
        const link = document.createElement("a");
        link.download = `kitmatch-${listing.item.toLowerCase()}.png`;
        link.href = dataUrl;
        link.click();
        toast.success("Image saved to your device");
      }
    } catch (err) {
      console.error("Failed to share image", err);
      toast.error("Couldn't generate image. Try again.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <article
      ref={cardRef}
      className={`rounded-2xl border bg-card p-4 shadow-sm relative overflow-hidden ${
        perfect ? "ring-2 ring-primary/40" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold leading-tight">{listing.name}</h3>
          </div>
          <p className="text-xs text-muted-foreground">Platoon {listing.platoon}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {perfect && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-2.5 py-1 text-xs font-medium">
              <Sparkles className="size-3" /> Perfect Match
            </span>
          )}
          <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
            {listing.camp.split(" (")[0]}
          </span>
        </div>
      </div>
      <div className="mt-3 text-sm">
        <div className="font-medium text-lg">{listing.item}</div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Tag label="Has" value={`Size ${listing.have_size}`} tone="success" />
          <Tag label="Needs" value={`Size ${listing.need_size}`} />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className={`grid gap-2 ${isOwner ? "grid-cols-[1fr_auto]" : "grid-cols-[1fr_auto]"}`}>
          <Button asChild className="h-11 rounded-xl">
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" /> Chat
            </a>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 rounded-xl">
                <Share2 className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl">
              <DropdownMenuItem onClick={handleShareAsImage} disabled={isSharing}>
                {isSharing ? <Loader2 className="size-4 mr-2 animate-spin" /> : <ImageIcon className="size-4 mr-2" />}
                Share as Image
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => shareToWhatsApp(`Hi, check out this ${listing.item} swap on KitMatch!`, listing.camp)}>
                <MessageCircle className="size-4 mr-2" /> Share to WhatsApp
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isOwner && (
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="secondary"
              className="h-10 rounded-xl border gap-2"
              onClick={() => onSwapped("swapped")}
              disabled={swapping}
            >
              <CheckCheck className="size-4" /> Swapped
            </Button>
            <Button
              variant="ghost"
              className="h-10 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
              onClick={() => onSwapped("removed")}
              disabled={swapping}
            >
              <Trash2 className="size-4" /> Remove
            </Button>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t flex items-center justify-between opacity-40 grayscale pointer-events-none">
        <span className="text-[10px] font-bold tracking-tighter uppercase">KitMatch</span>
        <span className="text-[8px]">kitmatch.app</span>
      </div>
    </article>
  );
}

function Tag({ label, value, tone }: { label: string; value: string; tone?: "success" }) {
  return (
    <div
      className={`rounded-xl px-3 py-2 text-sm ${
        tone === "success" ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"
      }`}
    >
      <div className="text-[10px] uppercase tracking-wide opacity-70">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border bg-card p-8 text-center">
      <div className="size-12 rounded-full bg-secondary grid place-items-center mx-auto mb-3">
        <Inbox className="size-5 text-muted-foreground" />
      </div>
      <h3 className="font-semibold">No listings yet</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Be the first to post a swap in your camp.
      </p>
      <Button asChild className="mt-4 h-11 rounded-xl">
        <Link to="/post">Post a Swap</Link>
      </Button>
    </div>
  );
}
