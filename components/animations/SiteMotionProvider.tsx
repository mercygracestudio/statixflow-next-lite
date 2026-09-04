"use client";

import {
  createContext,
  type MutableRefObject,
  type ReactNode,
  type RefObject,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "react";
import type ScrollSmoother from "gsap/ScrollSmoother";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type SiteMotionContextValue = {
  headerRef: RefObject<HTMLElement | null>;
  smootherRef: MutableRefObject<ScrollSmoother | null>;
  scrollTo: (target: string, duration?: number) => void;
};

const SiteMotionContext = createContext<SiteMotionContextValue | null>(null);

export function SiteMotionProvider({ children }: { children: ReactNode }) {
  const headerRef = useRef<HTMLElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  const scrollTo = useCallback((target: string, duration = 0.5) => {
    const smoother = smootherRef.current;
    if (!smoother) return;

    const targetId = target.replace(/^#/, "");
    const targetElement = targetId
      ? smoother
          .content()
          .querySelector<HTMLElement>(`#${CSS.escape(targetId)}`)
      : null;
    if (!targetElement) return;

    const headerTrigger = ScrollTrigger.getById("headerAnimation");
    headerTrigger?.disable(false);

    gsap.to(smoother, {
      scrollTop: Math.min(
        ScrollTrigger.maxScroll(window),
        smoother.offset(targetElement, "top top"),
      ),
      duration,
      overwrite: true,
      onComplete: () => headerTrigger?.enable(false),
    });
  }, []);

  const value = useMemo(
    () => ({ headerRef, smootherRef, scrollTo }),
    [scrollTo],
  );

  return (
    <SiteMotionContext.Provider value={value}>
      {children}
    </SiteMotionContext.Provider>
  );
}

export function useSiteMotion() {
  const context = useContext(SiteMotionContext);
  if (!context) {
    throw new Error("useSiteMotion must be used inside SiteMotionProvider.");
  }
  return context;
}
