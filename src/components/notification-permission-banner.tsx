import { useState, useEffect } from "react";
import { Bell, BellOff, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const DISMISSED_KEY = "kitmatch:notifications-dismissed";

export function NotificationPermissionBanner() {
  const [permission, setPermission] = useState<NotificationPermission | "loading">("loading");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(localStorage.getItem(DISMISSED_KEY) === "true");

    if (!("Notification" in window)) {
      setPermission("denied"); // Effectively hide it via null return below
      return;
    }
    setPermission(Notification.permission);
  }, []);

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      toast.error("Your browser does not support notifications.");
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === "granted") {
        toast.success("Notifications enabled! We'll alert you when a match is found.");
      } else if (result === "denied") {
        toast.error("Notifications were denied. You can enable them in your browser settings.");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem(DISMISSED_KEY, "true");
  };

  if (
    typeof window === "undefined" ||
    permission === "loading" ||
    permission === "granted" ||
    dismissed ||
    !("Notification" in window)
  ) return null;

  return (
    <div className="rounded-2xl border bg-primary/5 border-primary/20 p-4 flex items-center gap-4 relative group">
      <button
        onClick={dismiss}
        className="absolute top-2 right-2 text-muted-foreground/50 hover:text-foreground transition-colors p-1"
        aria-label="Dismiss"
      >
        <X className="size-3.5" />
      </button>

      <div className="size-10 rounded-full bg-primary/10 text-primary grid place-items-center shrink-0">
        <Bell className="size-5" />
      </div>
      <div className="flex-1 min-w-0 pr-4">
        <h3 className="text-sm font-semibold leading-tight text-primary">
          Match Alerts
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Get notified when a perfect match is posted.
        </p>
      </div>
      <Button onClick={requestPermission} size="sm" className="rounded-xl h-9 px-4 shrink-0">
        Enable
      </Button>
    </div>
  );
}
