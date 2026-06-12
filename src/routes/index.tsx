import { createFileRoute } from "@tanstack/react-router";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Boxes, MapPin, Search, PlusCircle, Check, Share2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CAMPS } from "@/lib/kit-data";
import { useCamp, setCamp as persistCamp } from "@/lib/camp-store";
import { shareApp, GENERIC_SHARE_TEXT, FEEDBACK_MAILTO } from "@/lib/share";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KitMatch — Swap NYSC kit sizes in your camp" },
      {
        name: "description",
        content:
          "Free notice board for NYSC corps members to exchange incorrectly sized kits during orientation camp.",
      },
      { property: "og:title", content: "KitMatch — Swap NYSC kit sizes" },
      {
        property: "og:description",
        content: "Find corps members in your camp to swap NYSC kit sizes. Free to use.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { camp, ready } = useCamp();
  const navigate = useNavigate();
  const [pending, setPending] = useState<string>("");

  if (!ready) return null;

  if (!camp) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="size-14 rounded-2xl bg-primary text-primary-foreground grid place-items-center mb-4">
              <Boxes className="size-7" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">KitMatch</h1>
            <p className="mt-2 text-muted-foreground">
              Find corps members in your camp to swap NYSC kit sizes. Free to use.
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <label className="flex items-center gap-2 text-sm font-medium mb-3">
              <MapPin className="size-4 text-primary" /> Select your NYSC camp
            </label>
            <Select value={pending} onValueChange={setPending}>
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue placeholder="Choose your camp" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {CAMPS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              disabled={!pending}
              onClick={() => persistCamp(pending)}
              className="mt-4 w-full h-12 rounded-xl text-base"
            >
              Continue
            </Button>
            <p className="mt-3 text-xs text-muted-foreground text-center">
              You'll only see listings from your camp. No accounts needed.
            </p>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
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
        <div className="max-w-md mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary text-primary-foreground grid place-items-center">
              <Boxes className="size-4" />
            </div>
            <span className="font-semibold">KitMatch</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => shareApp(GENERIC_SHARE_TEXT)}
              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
              aria-label="Share KitMatch"
            >
              <Share2 className="size-3" /> Share
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("kitmatch:camp");
                window.dispatchEvent(new Event("kitmatch:camp-changed"));
              }}
              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              <MapPin className="size-3" /> Change camp
            </button>
          </div>
        </div>
      </header>
      <div className="max-w-md mx-auto px-5 py-8">
        <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-7 shadow-lg">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium mb-4">
            <Check className="size-3" /> {camp}
          </div>
          <h1 className="text-3xl font-bold tracking-tight">KitMatch</h1>
          <p className="mt-2 text-primary-foreground/90 text-sm leading-relaxed">
            Find corps members in your camp to swap NYSC kit sizes. Free to use.
          </p>
        </div>

        <div className="mt-6 grid gap-3">
          <Button
            asChild
            className="h-14 rounded-2xl text-base shadow-sm"
            onClick={() => navigate({ to: "/post" })}
          >
            <Link to="/post">
              <PlusCircle className="size-5" /> Post a Swap
            </Link>
          </Button>
          <Button asChild variant="secondary" className="h-14 rounded-2xl text-base border">
            <Link to="/find">
              <Search className="size-5" /> Find Matches
            </Link>
          </Button>
        </div>

        <ol className="mt-8 space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-3">
            <span className="size-6 shrink-0 rounded-full bg-secondary text-secondary-foreground grid place-items-center text-xs font-semibold">
              1
            </span>
            Post what you have and what size you need.
          </li>
          <li className="flex gap-3">
            <span className="size-6 shrink-0 rounded-full bg-secondary text-secondary-foreground grid place-items-center text-xs font-semibold">
              2
            </span>
            Browse listings from corps members in your camp.
          </li>
          <li className="flex gap-3">
            <span className="size-6 shrink-0 rounded-full bg-secondary text-secondary-foreground grid place-items-center text-xs font-semibold">
              3
            </span>
            Chat on WhatsApp and meet up to swap.
          </li>
        </ol>

        <div className="mt-10 pt-6 border-t flex items-center justify-center gap-5 text-xs text-muted-foreground">
          <button
            onClick={() => shareApp(GENERIC_SHARE_TEXT)}
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
    </main>
  );
}
