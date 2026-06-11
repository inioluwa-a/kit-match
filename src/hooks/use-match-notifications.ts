import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCamp } from "@/lib/camp-store";

export function useMatchNotifications() {
  const { camp } = useCamp();

  useEffect(() => {
    if (!camp) return;

    const channel = supabase
      .channel("public:swap_requests")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "swap_requests",
          filter: `camp=eq.${camp}`,
        },
        async (payload) => {
          const newListing = payload.new;
          if (newListing.status !== "available") return;

          // Check if this new listing matches ANY of the user's listings stored in localStorage
          const rawTokens = localStorage.getItem("kitmatch:owner_tokens");
          if (!rawTokens) return;

          const ownerTokens = JSON.parse(rawTokens) as Record<string, string>;
          const listingIds = Object.keys(ownerTokens);

          if (listingIds.length === 0) return;

          // Fetch the user's active listings to compare
          const { data: myListings } = await supabase
            .from("swap_requests")
            .select("item, have_size, need_size")
            .in("id", listingIds)
            .eq("status", "available");

          if (!myListings) return;

          const isMatch = myListings.some(
            (my) =>
              my.item === newListing.item &&
              my.have_size === newListing.need_size &&
              my.need_size === newListing.have_size
          );

          if (isMatch) {
            // Browser Notification
            if (Notification.permission === "granted") {
              new Notification("Match Found! 🚀", {
                body: `Someone just posted a ${newListing.item} (Size ${newListing.have_size}) in ${camp}!`,
                icon: "/favicon.ico",
              });
            }

            // In-app Toast
            toast.success("Match Found! 🚀", {
              description: `Someone just posted a ${newListing.item} that matches your request!`,
              duration: 10000,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [camp]);
}
