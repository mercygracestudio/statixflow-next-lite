import Image from "next/image";
import type { CtaLink, ImageAsset } from "@/content/types";
import { Button } from "../ui/button";
import { SectionHeading } from "../molecules/section-heading";
import { ParallaxCoverImage } from "../ui/parallax-cover-image";

type CtaBannerCircles = {
  variant?: "circles";
  heading: string;
  body: string;
  cta: CtaLink;
};

type CtaBannerImageVariant = {
  variant: "image";
  eyebrow: string;
  heading: string;
  body: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  image: ImageAsset;
  imageClassName?: string;
  panelClassName?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
  topOverlayClassName?: string;
  sectionClassName?: string;
  decorative?: boolean;
};

export function CtaBanner(props: CtaBannerCircles | CtaBannerImageVariant) {
  if (props.variant === "image") {
    const {
      eyebrow,
      heading,
      body,
      primaryCta,
      secondaryCta,
      image,
      imageClassName = "absolute bottom-0 left-0 h-[170%] w-full object-cover object-center",
      panelClassName = "bg-primary p-10 text-white md:p-20",
      primaryClassName = "bg-white px-6 py-3 text-base text-black",
      secondaryClassName = "border border-white/20 px-6 py-3 text-base text-white",
      topOverlayClassName = "",
      sectionClassName = "",
      decorative = false,
    } = props;
    return (
      <section className={`relative ${sectionClassName}`.trim()}>
        <div
          className={`absolute top-0 left-0 z-1 h-1/2 w-full ${topOverlayClassName}`.trim()}
        ></div>

        <div className="container mx-auto px-4">
          <div className="relative z-2 grid grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-2">
            <div className={`relative flex flex-col justify-center ${panelClassName}`.trim()}>
              {decorative ? (
                <figure className="absolute top-0 left-0 z-1 w-250 -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src="/imgs/generic/concentric-circles.svg"
                    className="h-auto w-full opacity-30"
                    alt=""
                    width="800"
                    height="800"
                    loading="lazy"
                  />
                </figure>
              ) : null}

              <div className="relative z-2">
                <SectionHeading
                  eyebrow={eyebrow}
                  heading={heading}
                  headingClassName="mb-8 text-4xl font-medium md:text-5xl"
                />
                <p
                  className="mb-10 max-w-sm text-lg leading-relaxed text-muted-foreground"
                  data-move-up-on-scroll=""
                >
                  {body}
                </p>
                <div
                  className="flex flex-col gap-4 xl:flex-row"
                  data-move-up-on-scroll=""
                >
                  <Button
                    href={primaryCta.href}
                    label={primaryCta.label}
                    className={primaryClassName}
                  />
                  <Button
                    href={secondaryCta.href}
                    label={secondaryCta.label}
                    className={secondaryClassName}
                  />
                </div>
              </div>
            </div>

            <ParallaxCoverImage
              image={image}
              figureClassName="relative hidden lg:block"
              className={imageClassName}
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-1 h-1/2 w-full bg-black"></div>
      </section>
    );
  }

  const { heading, body, cta } = props;
  return (
    <section className="relative">
      <div className="absolute top-0 left-0 z-1 h-1/2 w-full"></div>

      <div className="container mx-auto px-4">
        <div className="relative z-2 overflow-hidden rounded-2xl bg-accent p-10 md:p-20">
          <figure className="absolute top-0 left-0 z-1 w-250 -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/imgs/generic/concentric-circles.svg"
              className="h-auto w-full opacity-30"
              alt=""
              width="800"
              height="800"
              loading="lazy"
            />
          </figure>

          <div className="relative z-2 mx-auto max-w-2xl text-center text-balance">
            <h2
              className="mb-8 text-4xl font-medium text-foreground md:text-5xl"
              data-unmask-text-on-scroll=""
            >
              {heading}
            </h2>
            <p
              className="mx-auto mb-12 max-w-lg text-lg leading-relaxed text-muted-foreground"
              data-move-up-on-scroll=""
            >
              {body}
            </p>
            <Button
              href={cta.href}
              label={cta.label}
              className="bg-primary px-6 py-3 text-base text-white"
              data-move-up-on-scroll=""
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-1 h-1/2 w-full bg-black"></div>
    </section>
  );
}
