"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Hydration-safe media query: the server snapshot (false) is used while
 * hydrating, then React re-renders with the real value. Framer's
 * useReducedMotion reads the media query on the first client render instead,
 * so markup that depends on it mismatched the server HTML.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
