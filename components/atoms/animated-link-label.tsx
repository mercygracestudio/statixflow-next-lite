import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/**
 * The hover mechanism shared by every animated label on the site: the content
 * is rendered twice and slid vertically inside a clipped box, so it appears to
 * be replaced by a copy of itself. Expects a `group` ancestor to drive it.
 */
export function HoverSlideText({ children }: { children: ReactNode }) {
  return (
    <span className="relative overflow-hidden">
      <span className="relative block h-full translate-y-0 transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute top-0 left-0 block h-full translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
        {children}
      </span>
    </span>
  );
}

/**
 * The icon half of the same hover: it slides horizontally, away from the label
 * when trailing and towards it when leading.
 */
export function HoverSlideIcon({
  icon,
  position = "trailing",
}: {
  icon?: ReactNode;
  position?: "leading" | "trailing";
}) {
  return (
    <span
      className={cn(
        "translate-x-0 transition-transform duration-300 ease-in-out",
        position === "leading"
          ? "group-hover:-translate-x-2"
          : "group-hover:translate-x-2",
      )}
    >
      {icon ?? <ChevronRight strokeWidth={1} className="size-4" />}
    </span>
  );
}

const linkLabelVariants = cva(
  "inline-flex items-center justify-center gap-2 text-base font-medium",
  {
    variants: {
      tone: {
        /** Inherits the surrounding text colour. */
        default: "",
        inverse: "text-white",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  },
);

export type LinkLabelTone = NonNullable<
  VariantProps<typeof linkLabelVariants>["tone"]
>;

export function AnimatedLinkLabel({
  label,
  icon,
  iconPosition = "trailing",
  tone,
}: VariantProps<typeof linkLabelVariants> & {
  label: string;
  /** Pass `null` to omit the icon. Defaults to a chevron. */
  icon?: ReactNode | null;
  iconPosition?: "leading" | "trailing";
}) {
  const iconNode = icon !== null && (
    <HoverSlideIcon icon={icon ?? undefined} position={iconPosition} />
  );

  return (
    <span className={linkLabelVariants({ tone })}>
      {iconPosition === "leading" && iconNode}
      <HoverSlideText>{label}</HoverSlideText>
      {iconPosition === "trailing" && iconNode}
    </span>
  );
}
