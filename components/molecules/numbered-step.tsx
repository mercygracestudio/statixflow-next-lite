import type { ElementType } from "react";
import { Eyebrow } from "../atoms/eyebrow";

export function NumberedStep({
  number,
  stageLabel,
  title,
  body,
  headingTag: HeadingTag = "h2",
}: {
  number: string;
  stageLabel?: string;
  title: string;
  body: string;
  headingTag?: ElementType;
}) {
  return (
    <div className="border-t pt-6">
      <span
        className={
          stageLabel
            ? "mb-2 block text-xs font-bold"
            : "mb-4 block text-xs font-bold"
        }
      >
        {number}
      </span>
      {stageLabel ? (
        <Eyebrow as="span" size="xs" className="mb-4 block">
          {stageLabel}
        </Eyebrow>
      ) : null}
      <HeadingTag className="mb-2 text-2xl font-medium">{title}</HeadingTag>
      <p className="text-lg leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
