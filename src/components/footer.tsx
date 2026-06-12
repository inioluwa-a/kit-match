import { Mail, Share2, Star, Github } from "lucide-react";
import { shareApp, GENERIC_SHARE_TEXT, FEEDBACK_MAILTO } from "@/lib/share";

export function Footer() {
  return (
    <footer className="mt-10 pt-6 border-t space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
        <button
          type="button"
          onClick={() => shareApp(GENERIC_SHARE_TEXT)}
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Share2 className="size-3.5" /> Share KitMatch
        </button>
        <a
          href={FEEDBACK_MAILTO}
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Mail className="size-3.5" /> Feedback
        </a>
        <a
          href="https://github.com/inioluwa-a/kitmatch"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Star className="size-3.5" /> Star on GitHub
        </a>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pb-4">
        <span>Made with ❤️ by</span>
        <a
          href="https://github.com/inioluwa-a"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:underline inline-flex items-center gap-1"
        >
          <Github className="size-3" /> aparaic
        </a>
      </div>
    </footer>
  );
}
