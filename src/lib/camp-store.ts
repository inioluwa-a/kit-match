import { useEffect, useState } from "react";

const KEY = "kitmatch:camp";

export function getCamp(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(KEY);
}

export function setCamp(camp: string) {
  window.localStorage.setItem(KEY, camp);
  window.dispatchEvent(new Event("kitmatch:camp-changed"));
}

export function clearCamp() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("kitmatch:camp-changed"));
}

export function useCamp() {
  const [camp, set] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    set(getCamp());
    setReady(true);
    const sync = () => set(getCamp());
    window.addEventListener("kitmatch:camp-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("kitmatch:camp-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return { camp, ready, setCamp, clearCamp };
}
