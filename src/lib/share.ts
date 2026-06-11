import { toast } from "sonner";

const SUPPORT_EMAIL = "icharlesapara@gmail.com";

export const SUPPORT_MAILTO = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("KitMatch Support")}`;

export function getShareUrl(): string {
  if (typeof window === "undefined") return "https://kitmatch.app";
  return window.location.origin;
}

export async function shareApp(text: string, title = "KitMatch") {
  const url = getShareUrl();
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

export const GENERIC_SHARE_TEXT =
  "Swap your NYSC kit on KitMatch — find corps members in your camp who have the size you need.";