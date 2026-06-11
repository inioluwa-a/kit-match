import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      })
      .select("id, owner_token")
      .single();
    setSubmitting(false);
    if (error) {
      toast.error("Couldn't post your swap. Try again.");
      return;
    }
    // Persist owner token locally so this poster (and only this poster)
    // can later mark their own listing as swapped.
    if (data?.id && data?.owner_token) {
      try {
        const raw = localStorage.getItem("kitmatch:owner_tokens");
        const map = raw ? (JSON.parse(raw) as Record<string, string>) : {};
        map[data.id] = data.owner_token as string;
        localStorage.setItem("kitmatch:owner_tokens", JSON.stringify(map));
      } catch {
        // ignore storage errors
      }
    }
    setDone(true);
  }

  if (!ready || !camp) return null;

  if (done) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-5">
        <div className="w-full max-w-md text-center">
          <div className="size-16 rounded-full bg-primary/10 text-primary grid place-items-center mx-auto mb-4">
            <CheckCircle2 className="size-8" />
          </div>
          <h1 className="text-2xl font-bold">Your swap request has been posted</h1>
          <p className="mt-2 text-muted-foreground">Corps members in {camp} can now find you.</p>
          <div className="mt-6 grid gap-3">
            <Button asChild className="h-12 rounded-xl">
              <Link to="/find">Find Matches</Link>
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
              }}
            >
              Post Another Swap
            </Button>
          </div>
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
        <p className="text-xs text-muted-foreground text-center">
          Listings expire automatically after 14 days.
        </p>
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