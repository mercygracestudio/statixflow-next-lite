import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface HeroSection7Props {
  badgeLabel: string;
  badgePingClassName?: string;
  badgeDotClassName?: string;
  heading: string;
  body: string;
  children?: ReactNode;
}

export function HeroSection7({
  badgeLabel,
  badgePingClassName = "bg-rose-400/80",
  badgeDotClassName = "bg-rose-500",
  heading,
  body,
  children,
}: HeroSection7Props) {
  return (
    <section
      className="container mx-auto mb-10 px-4 md:mb-20"
      data-page-intro-animation=""
    >
      <div className="relative overflow-hidden rounded-2xl bg-black p-10 md:p-20">
        <div className="bg-white-stripe-diagonal pointer-events-none absolute inset-0 z-1 opacity-40"></div>

        <div className="relative z-2 flex flex-col items-center gap-8 text-center md:gap-8">
          <div
            className="flex items-center gap-2 rounded-full border border-gray-700 bg-white/5 px-3 py-1"
            data-page-intro-animation-move-up=""
          >
            <span className="relative flex size-2">
              <span
                className={cn(
                  "absolute inline-flex size-full animate-ping rounded-full",
                  badgePingClassName,
                )}
              ></span>
              <span
                className={cn(
                  "relative mx-auto inline-flex size-[90%] rounded-full",
                  badgeDotClassName,
                )}
              ></span>
            </span>
            <span className="text-xs font-medium tracking-widest text-white/50 uppercase">
              {badgeLabel}
            </span>
          </div>

          <h1
            className="w-full bg-linear-to-b from-white via-white/80 to-white/5 bg-clip-text text-[7rem] leading-none font-bold tracking-tighter text-transparent drop-shadow-2xl select-none sm:text-[12rem] md:text-[14rem]"
            data-page-intro-animation-move-up=""
          >
            {heading}
          </h1>

          <p
            className="max-w-lg text-lg leading-relaxed text-white/80 md:text-2xl"
            data-page-intro-animation-move-up=""
          >
            {body}
          </p>

          <div
            className="flex flex-col gap-4 xl:flex-row"
            data-page-intro-animation-move-up=""
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
