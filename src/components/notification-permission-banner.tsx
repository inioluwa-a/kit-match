import { useState, useEffect } from "react";
import { Bell, BellOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function NotificationPermissionBanner() {
  const [permission, setPermission] = useState<NotificationPermission | "loading">("loading");

  useEffect(() => {
    if (!("Notification" in window)) {
      setPermission("denied");
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

  if (permission === "loading" || permission === "granted") return null;

  return (
    <div className="rounded-2xl border bg-primary/5 border-primary/20 p-4 flex items-center gap-4">
      <div className="size-10 rounded-full bg-primary/10 text-primary grid place-items-center shrink-0">
        <Bell className="size-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold leading-tight text-primary">Get notified of matches</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          We'll alert you the moment a perfect match is posted while this tab is open.
        </p>
      </div>
      <Button
        onClick={requestPermission}
        size="sm"
        className="rounded-xl h-9 px-4 shrink-0"
      >
        Enable
      </Button>
    </div>
  );
}
