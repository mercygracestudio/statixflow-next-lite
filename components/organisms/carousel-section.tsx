import { ArrowLeft, ArrowRight } from "lucide-react";
import type { QuoteSlide as QuoteSlideData } from "@/content/types";
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
      <div className="relative space-y-8 py-10 after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:bg-border md:space-y-10 md:py-20">
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
              <span className="relative overflow-hidden">
                <span className="relative block h-full translate-y-0 transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                  <ArrowLeft strokeWidth={1} className="size-4" />
                </span>

                <span className="absolute top-0 left-0 block h-full translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                  <ArrowLeft strokeWidth={1} className="size-4" />
                </span>
              </span>
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
              <span className="relative overflow-hidden">
                <span className="relative block h-full translate-y-0 transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                  <ArrowRight strokeWidth={1} className="size-4" />
                </span>

                <span className="absolute top-0 left-0 block h-full translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                  <ArrowRight strokeWidth={1} className="size-4" />
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
