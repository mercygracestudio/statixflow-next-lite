import { ArrowLeft, ArrowRight } from "lucide-react";
import type { QuoteSlide as QuoteSlideData } from "@/content/types";
import { HoverSlideText } from "../atoms/animated-link-label";
import { SectionHeading } from "../molecules/section-heading";
import { QuoteSection1 } from "./quote-section-1";

type CarouselSectionProps = {
  eyebrow: string;
  headingParts: [string, string];
  slides: QuoteSlideData[];
};

export function CarouselSection({
  eyebrow,
  headingParts,
  slides,
}: CarouselSectionProps) {
  return (
    <section className="container mx-auto px-4">
      <div className="relative space-y-8 pt-10 after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:bg-border md:space-y-10 md:pt-20">
        <div className="mx-auto max-w-2xl text-center text-balance">
          <SectionHeading eyebrow={eyebrow} heading={headingParts} />
        </div>

        <div data-slider="">
          <div className="swiper">
            <div className="swiper-wrapper">
              {slides.map((slide) => (
                <QuoteSection1 key={slide.name} slide={slide} />
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-border"
              aria-label="Previous Slide"
              data-slider-btn="prev"
            >
              <HoverSlideText>
                <ArrowLeft strokeWidth={1} className="size-4" />
              </HoverSlideText>
            </button>

            <div
              className="flex w-auto! items-center gap-4"
              data-slider-pagination=""
            ></div>

            <button
              className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-border"
              data-slider-btn="next"
              aria-label="Next Slide"
            >
              <HoverSlideText>
                <ArrowRight strokeWidth={1} className="size-4" />
              </HoverSlideText>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
