import type { ReactNode } from "react";
import { Eyebrow } from "../ui/eyebrow";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  heading: ReactNode | [string, string];
  headingClassName?: string;
  /** Set false to omit the scroll-triggered unmask animation attribute (matches a couple of source instances that skip it). */
  animated?: boolean;
};

export function SectionHeading({
  eyebrow,
  heading,
  headingClassName = "text-4xl font-medium md:text-5xl",
  animated = true,
}: SectionHeadingProps) {
  return (
    <>
      {eyebrow ? (
        <Eyebrow className="mb-2" data-move-up-on-scroll="">
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={headingClassName}
        {...(animated ? { "data-unmask-text-on-scroll": "" } : {})}
      >
        {Array.isArray(heading) ? (
          <>
            {heading[0]}{" "}
            <span className="text-muted-foreground">{heading[1]}</span>
          </>
        ) : (
          heading
        )}
      </h2>
    </>
  );
}
