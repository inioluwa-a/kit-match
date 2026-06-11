import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  MessageCircle,
  Sparkles,
  Inbox,
  CheckCheck,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
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
import { useCamp } from "@/lib/camp-store";
import { ITEMS, SIZES_BY_ITEM, type Item } from "@/lib/kit-data";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/find")({
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
  const { camp, ready } = useCamp();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [itemFilter, setItemFilter] = useState<string>("all");
  const [sizeFilter, setSizeFilter] = useState<string>("all");
  const [perfectOnly, setPerfectOnly] = useState(false);

  useEffect(() => {
    if (ready && !camp) navigate({ to: "/" });
  }, [ready, camp, navigate]);

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ["swap_requests", camp],
    enabled: !!camp,
    queryFn: async (): Promise<SwapRow[]> => {
      const { data, error } = await supabase
        .from("swap_requests")
        .select("*")
        .eq("camp", camp!)
        .eq("status", "available")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as SwapRow[];
    },
  });

  const markSwapped = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("swap_requests")
        .update({ status: "swapped" })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Marked as swapped");
      qc.invalidateQueries({ queryKey: ["swap_requests", camp] });
    },
    onError: () => toast.error("Couldn't update. Try again."),
  });

  const sizeOptions = useMemo(() => {
    if (itemFilter === "all") return [];
    return SIZES_BY_ITEM[itemFilter as Item] ?? [];
  }, [itemFilter]);

  useEffect(() => {
    setSizeFilter("all");
  }, [itemFilter]);

  const { perfect, others } = useMemo(() => {
    const filtered = listings.filter((l) => {
      if (itemFilter !== "all" && l.item !== itemFilter) return false;
      if (sizeFilter !== "all" && l.need_size !== sizeFilter) return false;
      return true;
    });
    const isPerfect = (l: SwapRow) =>
      listings.some(
        (o) =>
          o.id !== l.id &&
          o.item === l.item &&
          o.have_size === l.need_size &&
          o.need_size === l.have_size,
      );
    const perfect: SwapRow[] = [];
    const others: SwapRow[] = [];
    for (const l of filtered) (isPerfect(l) ? perfect : others).push(l);
    return { perfect, others: perfectOnly ? [] : others };
  }, [listings, itemFilter, sizeFilter, perfectOnly]);

  if (!ready || !camp) return null;

  return (
    <main className="min-h-screen bg-background pb-12">
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-md mx-auto px-5 py-3 flex items-center gap-3">
          <Link to="/" className="size-9 rounded-lg border grid place-items-center hover:bg-accent">
            <ArrowLeft className="size-4" />
          </Link>
          <div className="min-w-0">
            <h1 className="font-semibold leading-tight">Find Matches</h1>
            <p className="text-xs text-muted-foreground truncate">{camp}</p>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5 py-5 space-y-4">
        <div className="rounded-2xl border bg-card p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label className="text-xs">Item</Label>
              <Select value={itemFilter} onValueChange={setItemFilter}>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All items</SelectItem>
                  {ITEMS.map((i) => (
                    <SelectItem key={i} value={i}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs">Size needed</Label>
              <Select
                value={sizeFilter}
                onValueChange={setSizeFilter}
                disabled={itemFilter === "all"}
              >
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any size</SelectItem>
                  {sizeOptions.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <Label htmlFor="perfect" className="text-sm">
              Show perfect matches only
            </Label>
            <Switch id="perfect" checked={perfectOnly} onCheckedChange={setPerfectOnly} />
          </div>
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
                onSwapped={() => markSwapped.mutate(l.id)}
                swapping={markSwapped.isPending}
              />
            ))}
            {others.map((l) => (
              <ListingCard
                key={l.id}
                listing={l}
                onSwapped={() => markSwapped.mutate(l.id)}
                swapping={markSwapped.isPending}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function ListingCard({
  listing,
  perfect,
  onSwapped,
  swapping,
}: {
  listing: SwapRow;
  perfect?: boolean;
  onSwapped: () => void;
  swapping: boolean;
}) {
  const waUrl = `https://wa.me/${listing.whatsapp}?text=${encodeURIComponent(
    `Hi ${listing.name}, I saw your KitMatch post for ${listing.item} (you have size ${listing.have_size}, need ${listing.need_size}). Let's swap.`,
  )}`;
  return (
    <article
      className={`rounded-2xl border bg-card p-4 shadow-sm ${
        perfect ? "ring-2 ring-primary/40" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold leading-tight">{listing.name}</h3>
          <p className="text-xs text-muted-foreground">Platoon {listing.platoon}</p>
        </div>
        {perfect && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-2.5 py-1 text-xs font-medium">
            <Sparkles className="size-3" /> Perfect Match
          </span>
        )}
      </div>
      <div className="mt-3 text-sm">
        <div className="font-medium">{listing.item}</div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Tag label="Has" value={`Size ${listing.have_size}`} tone="success" />
          <Tag label="Needs" value={`Size ${listing.need_size}`} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
        <Button asChild className="h-11 rounded-xl">
          <a href={waUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" /> Chat on WhatsApp
          </a>
        </Button>
        <Button
          variant="secondary"
          className="h-11 rounded-xl border"
          onClick={onSwapped}
          disabled={swapping}
          title="Mark as swapped"
        >
          <CheckCheck className="size-4" />
        </Button>
      </div>
    </article>
  );
}

function Tag({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "success";
}) {
  return (
    <div
      className={`rounded-xl px-3 py-2 text-sm ${
        tone === "success"
          ? "bg-primary/10 text-primary"
          : "bg-secondary text-secondary-foreground"
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