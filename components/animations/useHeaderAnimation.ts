"use client";

import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export const headerDuration = 0.2;

export function useHeaderAnimation(headerRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;

      const animation = gsap
        .from(header, {
          yPercent: -100,
          paused: true,
          duration: headerDuration,
        })
        .progress(1);

      const trigger = ScrollTrigger.create({
        id: "headerAnimation",
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
          if (self.direction === -1) {
            animation.play();
            header.classList.add("is-visible");
          } else {
            animation.reverse();
            header.classList.remove("is-visible");
          }
        },
      });

      return () => {
        trigger.kill();
        animation.kill();
        header.classList.remove("is-visible");
        gsap.set(header, { clearProps: "transform" });
      };
    },
    { scope: headerRef },
  );
}
