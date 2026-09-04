import type { ArticleApproachStep } from "@/content/types";
import { Eyebrow } from "../ui/eyebrow";
import { StepGrid } from "../molecules/step-grid";

type StepsSectionProps = {
  eyebrow: string;
  heading: string;
  body: string;
  steps: ArticleApproachStep[];
};

export function StepsSection({
  eyebrow,
  heading,
  body,
  steps,
}: StepsSectionProps) {
  return (
    <section className="container mx-auto px-4">
      <div className="space-y-8 py-10 md:space-y-10 md:py-20">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Eyebrow className="mb-2" data-move-up-on-scroll="">
              {eyebrow}
            </Eyebrow>
            <p
              className="text-2xl leading-snug font-medium md:text-4xl"
              data-highlight-text-on-scroll=""
              role="group"
            >
              {heading}
            </p>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {body}
            </p>
          </div>
        </div>

        <StepGrid steps={steps} />
      </div>
    </section>
  );
}
