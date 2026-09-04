import Image from "next/image";
import type { QuoteSlide as QuoteSlideData } from "@/content/types";
import { Stat } from "../ui/stat";

export function QuoteSection1({
  slide,
}: {
  slide: QuoteSlideData;
}) {
  return (
    <div className="swiper-slide h-auto!">
      <div className="grid h-full grid-rows-[180px_1fr] gap-0 overflow-hidden rounded-b-2xl md:grid-cols-[1fr_240px] md:grid-rows-none md:rounded-l-2xl md:rounded-br-none">
        <div className="order-2 space-y-8 bg-muted p-10 md:order-1 lg:p-20">
          <Stat
            value={slide.stat.value}
            suffix={slide.stat.suffix}
            label={slide.stat.label}
            suffixClassName="text-3xl md:text-4xl"
          />

          <p className="text-xl leading-relaxed font-medium md:text-2xl">
            {slide.quote}
          </p>
        </div>

        <div className="relative order-1 md:order-2">
          <div className="grid h-full w-full grid-cols-[180px_1fr] md:flex md:flex-col">
            <figure className="relative h-45 w-45 shrink-0 md:h-60 md:w-60">
              <Image
                src={slide.avatarSrc}
                alt={slide.name ?? ""}
                width="640"
                height="640"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </figure>

            <div className="bg-black p-4 text-white md:grow">
              <h3 className="mb-2 text-2xl font-medium">{slide.name}</h3>
              <p className="text-sm text-white/70">{slide.title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
