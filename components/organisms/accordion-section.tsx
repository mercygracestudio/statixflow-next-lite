import type { AccordionItem } from "@/content/types";
import { cn } from "@/lib/cn";
import { Button } from "../ui/button";
import { SectionHeading } from "../molecules/section-heading";
import { AccordionList } from "../molecules/accordion-list";

type AccordionSectionProps = {
  id?: string;
  eyebrow?: string;
  heading: string;
  items: AccordionItem[];
  bordered?: boolean;
  variant?: "light" | "dark";
  /** Extra classes for the heading wrapper, e.g. to centre/narrow it. */
  headingWrapperClassName?: string;
  sideCard?: {
    heading: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
};

export function AccordionSection({
  id,
  eyebrow,
  heading,
  items,
  bordered = false,
  variant = "light",
  headingWrapperClassName,
  sideCard,
}: AccordionSectionProps) {
  // `variant` controls colour only. A dark section with a `sideCard` is not a
  // combination used today; it would render the grid + card on the black band.
  const dark = variant === "dark";

  const content = (
    <div className={cn("py-10 md:pt-20 md:pb-20", bordered && "border-t")}>
      <div className={cn("mb-8 md:mb-16", headingWrapperClassName)}>
        <SectionHeading eyebrow={eyebrow} heading={heading} />
      </div>

      <div
        className={
          sideCard
            ? "grid grid-cols-1 items-start lg:grid-cols-[1fr_320px] lg:gap-8"
            : "mx-auto max-w-3xl"
        }
      >
        <AccordionList items={items} variant={variant} />

        {sideCard ? (
          <div className="rounded-2xl bg-accent p-8">
            <h3 className="mb-3 text-xl font-semibold text-foreground">
              {sideCard.heading}
            </h3>
            <p className="mb-6 text-base leading-relaxed text-muted-foreground">
              {sideCard.body}
            </p>
            <Button
              href={sideCard.ctaHref}
              label={sideCard.ctaLabel}
              className="bg-primary px-6 py-3 text-base text-white"
            />
          </div>
        ) : null}
      </div>
    </div>
  );

  if (dark) {
    return (
      <section id={id} className="bg-black text-white">
        <div className="container mx-auto px-4">{content}</div>
      </section>
    );
  }

  return (
    <section id={id} className="container mx-auto px-4">
      {content}
    </section>
  );
}
