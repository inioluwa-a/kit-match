import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Share2,
  Mail,
  Sparkles,
  MessageCircle,
  Trash2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCamp } from "@/lib/camp-store";
import { ITEMS, PLATOONS, SIZES_BY_ITEM, type Item } from "@/lib/kit-data";
import { supabase } from "@/integrations/supabase/client";
import { shareApp, buildCampShareText, FEEDBACK_MAILTO } from "@/lib/share";

type SwapRow = {
  id: string;
  name: string;
  platoon: string;
  whatsapp: string;
  item: string;
  have_size: string;
  need_size: string;
};

export const Route = createFileRoute("/post")({
  head: () => ({
    meta: [
      { title: "Post a Swap — KitMatch" },
      { name: "description", content: "Post your NYSC kit swap request in under a minute." },
    ],
  }),
  component: PostPage,
});

function normalizeNigerianPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (/^0\d{10}$/.test(digits)) return "234" + digits.slice(1);
  if (/^234\d{10}$/.test(digits)) return digits;
  if (/^\d{10}$/.test(digits)) return "234" + digits;
  return null;
}

function PostPage() {
  const { camp, ready } = useCamp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [platoon, setPlatoon] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [item, setItem] = useState<Item | "">("");
  const [haveSize, setHaveSize] = useState("");
  const [needSize, setNeedSize] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [matches, setMatches] = useState<SwapRow[]>([]);
  const [newListingId, setNewListingId] = useState<string | null>(null);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    if (ready && !camp) navigate({ to: "/" });
  }, [ready, camp, navigate]);

  const sizes = useMemo(() => (item ? SIZES_BY_ITEM[item as Item] : []), [item]);

  // Reset sizes when item changes
  useEffect(() => {
    setHaveSize("");
    setNeedSize("");
  }, [item]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!camp) return;
    if (!name.trim() || name.length > 50) return toast.error("Enter your name (max 50 chars).");
    if (!platoon) return toast.error("Select your platoon.");
    const phone = normalizeNigerianPhone(whatsapp);
    if (!phone) return toast.error("Enter a valid Nigerian WhatsApp number.");
    if (!item) return toast.error("Select an item.");
    if (!haveSize || !needSize) return toast.error("Select both sizes.");
    if (haveSize === needSize) return toast.error("Have and need sizes must differ.");

    setSubmitting(true);
    // Generate owner token client-side: stored locally so only this poster
    // can later mark their listing as swapped. The DB never returns it.
    const ownerToken = crypto.randomUUID();
    const { data, error } = await supabase
      .from("swap_requests")
      .insert({
        camp,
        name: name.trim(),
        platoon,
        whatsapp: phone,
        item,
        have_size: haveSize,
        need_size: needSize,
        status: "available",
        owner_token: ownerToken,
      })
      .select("id")
      .single();

    if (!error) {
      // Find immediate matches
      const { data: matchData } = await supabase
        .from("swap_requests")
        .select("id, name, platoon, whatsapp, item, have_size, need_size")
        .eq("camp", camp)
        .eq("item", item)
        .eq("have_size", needSize)
        .eq("need_size", haveSize)
        .eq("status", "available")
        .neq("id", data?.id)
        .limit(3);

      if (matchData) setMatches(matchData);
    }

    setSubmitting(false);
    if (error) {
      toast.error("Couldn't post your swap. Try again.");
      return;
    }
    if (data?.id) {
      setNewListingId(data.id);
      try {
        const raw = localStorage.getItem("kitmatch:owner_tokens");
        const map = raw ? (JSON.parse(raw) as Record<string, string>) : {};
        map[data.id] = ownerToken;
        localStorage.setItem("kitmatch:owner_tokens", JSON.stringify(map));
      } catch {
        // ignore storage errors
      }
    }
    setDone(true);
  }

  async function handleRemove() {
    if (!newListingId) return;
    setRemoving(true);
    try {
      const raw = localStorage.getItem("kitmatch:owner_tokens");
      if (!raw) throw new Error("No token found");
      const map = JSON.parse(raw) as Record<string, string>;
      const token = map[newListingId];
      if (!token) throw new Error("No token found for this listing");

      const { data, error } = await supabase.rpc("mark_swap_swapped", {
        p_id: newListingId,
        p_token: token,
      });

      if (error) throw error;
      if (!data) throw new Error("Could not remove listing");

      delete map[newListingId];
      localStorage.setItem("kitmatch:owner_tokens", JSON.stringify(map));

      toast.success("Listing removed");
      setDone(false);
      setNewListingId(null);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Couldn't remove listing";
      toast.error(message);
    } finally {
      setRemoving(false);
    }
  }

  if (!ready || !camp) return null;

  if (done) {
    return (
      <main className="min-h-screen bg-background py-12 px-5">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="size-16 rounded-full bg-primary/10 text-primary grid place-items-center mx-auto mb-4">
            <CheckCircle2 className="size-8" />
          </div>
          <h1 className="text-2xl font-bold">Your swap request has been posted</h1>
          <p className="mt-2 text-muted-foreground">Corps members in {camp} can now find you.</p>

          {matches.length > 0 && (
            <div className="mt-8 text-left space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="size-5 fill-primary/20" />
                <h2 className="font-bold text-lg">Instant Match Found!</h2>
              </div>
              <div className="grid gap-3">
                {matches.map((m) => (
                  <div key={m.id} className="p-4 rounded-2xl border bg-card shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{m.name}</div>
                        <div className="text-xs text-muted-foreground">Platoon {m.platoon}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Perfect Match
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm flex gap-3">
                      <div className="flex-1 p-2 rounded-xl bg-secondary/50">
                        <div className="text-[10px] uppercase opacity-70">Has</div>
                        <div className="font-semibold">Size {m.have_size}</div>
                      </div>
                      <div className="flex-1 p-2 rounded-xl bg-secondary/50">
                        <div className="text-[10px] uppercase opacity-70">Needs</div>
                        <div className="font-semibold">Size {m.need_size}</div>
                      </div>
                    </div>
                    <Button asChild className="w-full mt-3 h-10 rounded-xl gap-2">
                      <a
                        href={`https://wa.me/${m.whatsapp}?text=${encodeURIComponent(`Hi ${m.name}, I just saw your KitMatch post for ${m.item}! I have size ${m.have_size} and need size ${m.need_size}. Let's swap!`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="size-4" /> Chat on WhatsApp
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 grid gap-3">
            <Button asChild className="h-12 rounded-xl">
              <Link to="/find">View All Listings</Link>
            </Button>
            <Button
              variant="secondary"
              className="h-12 rounded-xl border"
              onClick={() => shareApp(buildCampShareText(camp))}
            >
              <Share2 className="size-4" /> Share with your camp
            </Button>
            <Button
              variant="secondary"
              className="h-12 rounded-xl border"
              onClick={() => {
                setDone(false);
                setName("");
                setPlatoon("");
                setWhatsapp("");
                setItem("");
                setHaveSize("");
                setNeedSize("");
                setMatches([]);
                setNewListingId(null);
              }}
            >
              Post Another Swap
            </Button>
            <Button
              variant="ghost"
              className="h-12 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
              onClick={handleRemove}
              disabled={removing}
            >
              <Trash2 className="size-4" /> Remove My Listing
            </Button>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            Need help?{" "}
            <a href={FEEDBACK_MAILTO} className="text-primary hover:underline font-medium">
              Send feedback
            </a>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-md mx-auto px-5 py-3 flex items-center gap-3">
          <Link to="/" className="size-9 rounded-lg border grid place-items-center hover:bg-accent">
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <h1 className="font-semibold leading-tight">Post Your Swap</h1>
            <p className="text-xs text-muted-foreground">{camp}</p>
          </div>
        </div>
      </header>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto px-5 py-6 grid gap-5">
        <Field label="Name">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. David"
            maxLength={50}
            className="h-12 rounded-xl"
          />
        </Field>

        <Field label="Platoon">
          <Select value={platoon} onValueChange={setPlatoon}>
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="Choose platoon" />
            </SelectTrigger>
            <SelectContent>
              {PLATOONS.map((p) => (
                <SelectItem key={p} value={p}>
                  Platoon {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="WhatsApp Number" hint="Nigerian numbers only">
          <Input
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="08012345678"
            inputMode="tel"
            maxLength={15}
            className="h-12 rounded-xl"
          />
        </Field>

        <Field label="Item">
          <Select value={item} onValueChange={(v) => setItem(v as Item)}>
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="Choose item" />
            </SelectTrigger>
            <SelectContent>
              {ITEMS.map((i) => (
                <SelectItem key={i} value={i}>
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Size I Have">
            <Select value={haveSize} onValueChange={setHaveSize} disabled={!item}>
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Size I Need">
            <Select value={needSize} onValueChange={setNeedSize} disabled={!item}>
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Button type="submit" disabled={submitting} className="h-14 rounded-2xl text-base mt-2">
          {submitting ? <Loader2 className="size-5 animate-spin" /> : "Post Swap Request"}
        </Button>

        <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4 flex gap-3 text-left">
          <ShieldCheck className="size-5 text-primary shrink-0" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-primary">Safety First</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Only meet other corps members <strong>physically inside the camp</strong>. KitMatch
              only facilitates connections; use with caution.
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Listings expire automatically after 14 days.
        </p>
        <div className="pt-4 flex items-center justify-center gap-5 text-xs text-muted-foreground">
          <a
            href={FEEDBACK_MAILTO}
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            <Mail className="size-3.5" /> Feedback
          </a>
        </div>
      </form>
    </main>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
