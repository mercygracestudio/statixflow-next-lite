import type { ElementType } from "react";
import type { ArticleApproachStep } from "@/content/types";
import { NumberedStep } from "./numbered-step";

type StepGridProps = {
  steps: ArticleApproachStep[];
  headingTag?: ElementType;
};

export function StepGrid({ steps, headingTag }: StepGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
        <NumberedStep key={step.number} {...step} headingTag={headingTag} />
      ))}
    </div>
  );
}
