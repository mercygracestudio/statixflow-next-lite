import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { HoverSlideIcon, HoverSlideText } from "./animated-link-label";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        secondary: "bg-white text-black",
        /** Border tracks the label colour, so one text class retints both. */
        outline: "border border-current bg-transparent text-primary",
        /** Outline for dark surfaces, where nothing usable is inherited. */
        outlineInverse: "border border-white/20 bg-transparent text-white",
        link: "bg-transparent text-primary",
        /** Link for dark surfaces, where nothing usable is inherited. */
        linkInverse: "bg-transparent text-white",
      },
      size: {
        sm: "px-4 py-3 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-base",
      },
    },
    compoundVariants: [
      {
        variant: ["link", "linkInverse"],
        size: ["sm", "md", "lg"],
        class: "p-0",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>;
export type ButtonSize = NonNullable<
  VariantProps<typeof buttonVariants>["size"]
>;

type ButtonOwnProps = VariantProps<typeof buttonVariants> & {
  label: string;
  /** Pass `null` to omit the icon entirely, or a custom icon element. Defaults to a chevron. */
  icon?: ReactNode | null;
  /** Which side of the label the icon sits on. `leading` also flips the hover slide direction. */
  iconPosition?: "leading" | "trailing";
};

type ButtonAsAnchor = ButtonOwnProps &
  ComponentPropsWithoutRef<"a"> & { href: string };
type ButtonAsButton = ButtonOwnProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

export function Button({
  label,
  icon,
  iconPosition = "trailing",
  className,
  variant,
  size,
  href,
  ...props
}: ButtonAsAnchor | ButtonAsButton) {
  const classes = cn(buttonVariants({ variant, size }), className);

  const iconNode = icon !== null && (
    <HoverSlideIcon icon={icon ?? undefined} position={iconPosition} />
  );

  const content = (
    <>
      {iconPosition === "leading" && iconNode}
      <HoverSlideText>{label}</HoverSlideText>
      {iconPosition === "trailing" && iconNode}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(props as ComponentPropsWithoutRef<"a">)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(props as ComponentPropsWithoutRef<"button">)}
    >
      {content}
    </button>
  );
}
