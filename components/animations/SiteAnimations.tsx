"use client";

import { useGSAP } from "@gsap/react";
import {
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { gsap, ScrollSmoother, ScrollTrigger, SplitText } from "@/lib/gsap";
import { useSiteMotion } from "./SiteMotionProvider";
import { headerDuration } from "./useHeaderAnimation";
import { useRichMediaInteractions } from "./useRichMediaInteractions";

const MEDIA_QUERIES = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
} as const;

type PinnedScreen = keyof typeof MEDIA_QUERIES;

function parseDataNumber(value: string | undefined, fallback: number) {
  const parsed = Number.parseFloat(value ?? "");
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function SiteAnimations({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [fontsReady, setFontsReady] = useState(false);
  const { headerRef, smootherRef, scrollTo } = useSiteMotion();

  useRichMediaInteractions(wrapperRef);

  useEffect(() => {
    let active = true;
    document.fonts.ready.then(() => active && setFontsReady(true));
    return () => {
      active = false;
    };
  }, []);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const content = wrapper?.querySelector<HTMLElement>("#smooth-content");
      if (!wrapper || !content) return;

      const smoothAmount = parseDataNumber(
        wrapper.dataset.smoothScrollAmount,
        2,
      );
      const smoother = ScrollSmoother.create({
        wrapper,
        content,
        smooth: smoothAmount,
        effects: true,
        normalizeScroll: true,
      });
      smootherRef.current = smoother;

      const handleAnchorClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const anchor = target.closest<HTMLAnchorElement>(
          'a[href^="#"]:not([href="#"])',
        );
        if (!anchor || !wrapper.contains(anchor)) return;
        event.preventDefault();
        scrollTo(
          anchor.hash,
          parseDataNumber(anchor.dataset.smoothScrollDuration, 0.5),
        );
      };

      wrapper.addEventListener("click", handleAnchorClick);

      return () => {
        wrapper.removeEventListener("click", handleAnchorClick);
        smoother.kill();
        if (smootherRef.current === smoother) smootherRef.current = null;
      };
    },
    { scope: wrapperRef, dependencies: [scrollTo] },
  );

  useGSAP(
    () => {
      const scope = wrapperRef.current;
      if (!scope || !fontsReady) return;

      document.documentElement.classList.remove("gsap-intro-pending");

      const splitInstances: SplitText[] = [];
      const generatedAttributes: Array<[HTMLElement, string]> = [];
      const localTriggers: ScrollTrigger[] = [];
      const localMatchMedia: gsap.MatchMedia[] = [];

      const markGenerated = (element: HTMLElement, key: string) => {
        element.dataset[key] = "true";
        generatedAttributes.push([element, key]);
      };

      scope
        .querySelectorAll<HTMLElement>("[data-page-intro-animation]")
        .forEach((root) => {
          const unmaskYPercent = parseDataNumber(
            root.dataset.pageIntroAnimationUnmaskYPercent,
            120,
          );
          const unmaskStagger = parseDataNumber(
            root.dataset.pageIntroAnimationUnmaskStagger,
            0.3,
          );
          const unmaskDuration = parseDataNumber(
            root.dataset.pageIntroAnimationUnmaskDuration,
            1.2,
          );
          const moveUpYPercent = parseDataNumber(
            root.dataset.pageIntroAnimationMoveUpYPercent,
            120,
          );
          const moveUpDuration = parseDataNumber(
            root.dataset.pageIntroAnimationMoveUpDuration,
            1.5,
          );
          const moveUpStagger = parseDataNumber(
            root.dataset.pageIntroAnimationMoveUpStagger,
            0.3,
          );

          root
            .querySelectorAll<HTMLElement>(
              "[data-page-intro-animation-unmask-text]",
            )
            .forEach((element) => {
              const split = SplitText.create(element, {
                type: "words,lines",
                mask: "lines",
                linesClass: "unmask-text-line",
                autoSplit: true,
                onSplit: (instance) =>
                  gsap.from(instance.lines, {
                    yPercent: unmaskYPercent,
                    stagger: unmaskStagger,
                    duration: unmaskDuration,
                    ease: "power2.out",
                  }),
              });
              splitInstances.push(split);
            });

          gsap
            .timeline()
            .from(
              root.querySelectorAll<HTMLElement>(
                "[data-page-intro-animation-move-up]",
              ),
              {
                yPercent: moveUpYPercent,
                opacity: 0,
                duration: moveUpDuration,
                stagger: moveUpStagger,
              },
            );
        });

      scope
        .querySelectorAll<HTMLElement>("[data-highlight-text-on-scroll]")
        .forEach((root) => {
          markGenerated(root, "highlightTextOnScrollGenerated");
          const opacity = parseDataNumber(
            root.dataset.highlightTextOnScrollOpacity,
            0.25,
          );
          const stagger = parseDataNumber(
            root.dataset.highlightTextOnScrollStagger,
            0.2,
          );
          const duration = parseDataNumber(
            root.dataset.highlightTextOnScrollDuration,
            0.5,
          );
          const start = root.dataset.highlightTextOnScrollStart ?? "top 100%";
          const end = root.dataset.highlightTextOnScrollEnd ?? "bottom 50%";
          const split = SplitText.create(root, {
            type: "words,lines",
            linesClass: "highlight-text-on-scroll-line",
            wordsClass: "highlight-text-on-scroll-word",
            autoSplit: true,
            onSplit: (instance) =>
              gsap.from(instance.words, {
                opacity,
                stagger,
                duration,
                scrollTrigger: {
                  trigger: root,
                  scrub: true,
                  start: `clamp(${start})`,
                  end: `clamp(${end})`,
                },
              }),
          });
          splitInstances.push(split);
        });

      scope
        .querySelectorAll<HTMLElement>("[data-unmask-text-on-scroll]")
        .forEach((root) => {
          markGenerated(root, "unmaskTextOnScrollGenerated");
          const yPercent = parseDataNumber(
            root.dataset.unmaskTextOnScrollYPercent,
            120,
          );
          const stagger = parseDataNumber(
            root.dataset.unmaskTextOnScrollStagger,
            0.3,
          );
          const duration = parseDataNumber(
            root.dataset.unmaskTextOnScrollDuration,
            1.5,
          );
          const start = root.dataset.unmaskTextOnScrollStart ?? "top 100%";
          const end = root.dataset.unmaskTextOnScrollEnd ?? "bottom 50%";
          const split = SplitText.create(root, {
            type: "words,lines",
            mask: "lines",
            linesClass: "unmask-text-on-scroll-line",
            autoSplit: true,
            onSplit: (instance) =>
              gsap.from(instance.lines, {
                opacity: 0,
                yPercent,
                stagger,
                duration,
                scrollTrigger: {
                  trigger: root,
                  scrub: true,
                  start: `clamp(${start})`,
                  end: `clamp(${end})`,
                },
              }),
          });
          splitInstances.push(split);
        });

      scope
        .querySelectorAll<HTMLElement>("[data-move-up-on-scroll]")
        .forEach((root) => {
          markGenerated(root, "moveUpOnScrollGenerated");
          const yPercent = parseDataNumber(
            root.dataset.moveUpOnScrollYPercent,
            120,
          );
          const stagger = parseDataNumber(
            root.dataset.moveUpOnScrollStagger,
            0.3,
          );
          const start = root.dataset.moveUpOnScrollStart ?? "top bottom";
          const end = root.dataset.moveUpOnScrollEnd ?? "bottom top";

          gsap.from(root, {
            yPercent,
            opacity: 0,
            stagger,
            scrollTrigger: {
              trigger: root,
              scrub: true,
              invalidateOnRefresh: true,
              start: `clamp(${start})`,
              end: `clamp(${end})`,
            },
          });
        });

      scope
        .querySelectorAll<HTMLElement>("[data-parallax-image-on-scroll]")
        .forEach((root) => {
          const image = root.querySelector<HTMLImageElement>("img");
          if (!image) return;
          gsap.to(image, {
            y: () => image.offsetHeight - root.offsetHeight,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              scrub: true,
              pin: false,
              invalidateOnRefresh: true,
            },
          });
        });

      document
        .querySelectorAll<HTMLElement>("[data-highlight-on-scroll]")
        .forEach((root) => {
          const links = Array.from(
            root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
          );
          const pairs = links.flatMap((link) => {
            const id = link.hash.replace(/^#/, "");
            const heading = id
              ? document.querySelector<HTMLElement>(`#${CSS.escape(id)}`)
              : null;
            return heading ? [{ link, heading }] : [];
          });
          const setActive = (activeLink: HTMLAnchorElement | null) => {
            links.forEach(
              (link) => delete link.dataset.highlightOnScrollActiveLink,
            );
            if (activeLink) activeLink.dataset.highlightOnScrollActiveLink = "";
          };

          pairs.forEach(({ link, heading }, index) => {
            localTriggers.push(
              ScrollTrigger.create({
                trigger: heading,
                start: root.dataset.highlightOnScrollStart ?? "top 40%",
                onEnter: () => setActive(link),
                onLeaveBack: () =>
                  setActive(index > 0 ? pairs[index - 1].link : null),
              }),
            );
          });
        });

      scope
        .querySelectorAll<HTMLElement>("[data-pinned-side]")
        .forEach((root) => {
          const rootChild = root.firstElementChild as HTMLElement | null;
          const rootParent = root.closest<HTMLElement>(
            "[data-pinned-side-container]",
          );
          if (!rootChild || !rootParent) return;

          const createAnimation = () => {
            const header = headerRef.current;
            const headerHeight = header?.offsetHeight ?? 0;
            const rootTopPadding =
              Number.parseFloat(window.getComputedStyle(root).paddingTop) || 0;
            const childAnimation = gsap.to(rootChild, {
              y: headerHeight - rootTopPadding,
              paused: true,
              duration: headerDuration,
            });
            const trigger = ScrollTrigger.create({
              trigger: root,
              start: "top top",
              end: () => `+=${rootParent.offsetHeight - root.offsetHeight}`,
              pin: true,
              pinSpacing: false,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const headerIsVisible =
                  header?.classList.contains("is-visible") ?? false;
                if (headerIsVisible && self.isActive) {
                  childAnimation.play();
                } else {
                  childAnimation.reverse();
                }
              },
            });
            localTriggers.push(trigger);
          };

          const screen = root.dataset.pinnedSideScreen as
            PinnedScreen | undefined;
          const query = screen ? MEDIA_QUERIES[screen] : undefined;
          if (query) {
            const matchMedia = gsap.matchMedia();
            matchMedia.add(query, createAnimation);
            localMatchMedia.push(matchMedia);
          } else {
            createAnimation();
          }
        });

      return () => {
        localTriggers.forEach((trigger) => trigger.kill());
        localMatchMedia.forEach((matchMedia) => matchMedia.revert());
        splitInstances.forEach((split) => split.revert());
        generatedAttributes.forEach(([element, key]) => {
          delete element.dataset[key];
        });
      };
    },
    {
      scope: wrapperRef,
      dependencies: [fontsReady, headerRef],
      revertOnUpdate: true,
    },
  );

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}

export function useSmoothAnchorClick() {
  const { scrollTo } = useSiteMotion();
  return (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const target = event.currentTarget.hash;
    if (!target) return;
    event.preventDefault();
    scrollTo(
      target,
      parseDataNumber(event.currentTarget.dataset.smoothScrollDuration, 0.5),
    );
  };
}
