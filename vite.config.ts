// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
   // Use the Netlify preset so Nitro compiles the SSR handler as a Netlify Function
  // and emits static assets to dist/ (the Netlify publish directory).
  nitro: { preset: "netlify" },
  },
  // Use the Netlify preset so Nitro compiles the SSR handler as a Netlify Function
  // and emits static assets to dist/ (the Netlify publish directory).
  nitro: { preset: "netlify" },
});
