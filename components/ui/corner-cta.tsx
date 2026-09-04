import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

type Props = {
  href: string;
  label: string;
  /** Which bottom corner the CTA is pinned to. */
  position?: "left" | "right";
  className?: string;
};

export function CornerCta({ href, label, position = "right", className }: Props) {
  return (
    <Button
      href={href}
      label={label}
      size="sm"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-4 z-40 shadow-lg transition-colors duration-300 ease-in-out",
        position === "left" ? "left-4" : "right-4",
        className,
      )}
    />
  );
}
