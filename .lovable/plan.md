# KitMatch: Share & Support

## 1. Share the App

### Post-success screen (camp-aware)
After a corps member posts a swap, add a **"Share with your camp"** button below the existing "Find Matches" and "Post Another Swap" buttons.

**Message:**
```
I just posted a kit swap on KitMatch for {camp}. Join us and swap your NYSC kit too!
```

### In-app share button
Add a small **Share** icon button in the sticky header (next to the back arrow on `/find` and `/post` pages, and in the landing page header on `/`). Uses a generic message:
```
Swap your NYSC kit on KitMatch — find corps members in your camp who have the size you need.
```

**Implementation:** Use `navigator.share()` on mobile, fallback to `navigator.clipboard.writeText()` + toast confirmation on desktop.

## 2. Support Contact

Add a minimal **"Need help?"** link at the bottom of the landing page (`/`) that opens:
```
mailto:icharlesapara@gmail.com?subject=KitMatch%20Support
```

Also add a compact support link in the footer area of the `/find` and `/post` pages (e.g., a small "Support" text link at the very bottom, outside the main card area).

---

**Technical notes:**
- No backend changes needed.
- Reuses existing toast (sonner) for copy-to-clipboard feedback.
- Adds lucide `Share2` icon.
- Share logic lives in a small `src/lib/share.ts` helper.