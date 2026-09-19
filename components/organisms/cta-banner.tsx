import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import type { CtaLink, ImageAsset } from "@/content/types";
import { Button, type ButtonVariant } from "../atoms/button";
import { SectionHeading } from "../molecules/section-heading";
import {
  ParallaxCoverImage,
  type ImageTreatment,
} from "../atoms/parallax-cover-image";
import { cn } from "@/lib/cn";

/**
 * Background and text colour are paired deliberately — a caller overriding only
 * the background would otherwise inherit the wrong text colour.
 */
const panelVariants = cva(
  "relative flex flex-col justify-center p-10 md:p-20",
  {
    variants: {
      tone: {
        primary: "bg-primary text-white",
        accent: "bg-accent text-foreground",
      },
    },
    defaultVariants: {
      tone: "primary",
    },
  },
);

type PanelTone = NonNullable<VariantProps<typeof panelVariants>["tone"]>;

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
  imageTreatment?: ImageTreatment;
  panelTone?: PanelTone;
  primaryVariant?: ButtonVariant;
  secondaryVariant?: ButtonVariant;
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
      imageTreatment,
      panelTone,
      primaryVariant = "secondary",
      secondaryVariant = "outlineInverse",
      topOverlayClassName,
      sectionClassName,
      decorative = false,
    } = props;
    return (
      <section className={cn("relative", sectionClassName)}>
        <div
          className={cn(
            "absolute top-0 left-0 z-1 h-1/2 w-full",
            topOverlayClassName,
          )}
        ></div>

        <div className="container mx-auto px-4">
          <div className="relative z-2 grid grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-2">
            <div className={panelVariants({ tone: panelTone })}>
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
                <div className="mb-8">
                  <SectionHeading eyebrow={eyebrow} heading={heading} />
                </div>
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
                    variant={primaryVariant}
                  />
                  <Button
                    href={secondaryCta.href}
                    label={secondaryCta.label}
                    variant={secondaryVariant}
                  />
                </div>
              </div>
            </div>

            <ParallaxCoverImage
              image={image}
              frame="bare"
              treatment={imageTreatment}
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
              {...(cta.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              data-move-up-on-scroll=""
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-1 h-1/2 w-full bg-black"></div>
    </section>
  );
}
