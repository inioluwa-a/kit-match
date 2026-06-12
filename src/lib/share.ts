import { toast } from "sonner";

const FEEDBACK_EMAIL = "icharlesapara@gmail.com";

export const FEEDBACK_MAILTO = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent("KitMatch Support")}`;

export function getShareUrl(camp?: string | null): string {
  if (typeof window === "undefined") return "https://kitmatch.app";
  const url = new URL(window.location.origin);
  url.pathname = "/find";
  if (camp) url.searchParams.set("camp", camp);
  return url.toString();
}

export async function shareApp(text: string, title = "KitMatch", camp?: string | null) {
  const url = getShareUrl(camp);
  const shareData = { title, text, url };

  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share(shareData);
      return;
    } catch (err) {
      // User cancelled or share failed — fall through to clipboard
      if ((err as Error)?.name === "AbortError") return;
    }
  }

  try {
    await navigator.clipboard.writeText(`${text} ${url}`);
    toast.success("Link copied — paste it anywhere to share");
  } catch {
    toast.error("Couldn't share. Copy this link manually: " + url);
  }
}

export function buildCampShareText(camp: string) {
  return `I just posted a kit swap on KitMatch for ${camp}. Join us and swap your NYSC kit too!`;
}

export function shareToWhatsApp(text: string, camp?: string | null) {
  const url = getShareUrl(camp);
  const waUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
  window.open(waUrl, "_blank");
}

export const GENERIC_SHARE_TEXT =
  "Swap your NYSC kit on KitMatch — find corps members in your camp who have the size you need.";
