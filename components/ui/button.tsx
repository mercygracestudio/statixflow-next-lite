import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        secondary: "bg-white text-black",
        outline: "border border-current bg-transparent",
        link: "bg-transparent",
      },
      size: {
        sm: "px-4 py-3 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-base",
      },
    },
    compoundVariants: [
      { variant: "link", size: ["sm", "md", "lg"], class: "p-0" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

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
    <span
      className={cn(
        "translate-x-0 transition-transform duration-300 ease-in-out",
        iconPosition === "leading"
          ? "group-hover:-translate-x-2"
          : "group-hover:translate-x-2",
      )}
    >
      {icon ?? <ChevronRight strokeWidth={1} className="size-4" />}
    </span>
  );

  const content = (
    <>
      {iconPosition === "leading" && iconNode}
      <span className="relative overflow-hidden">
        <span className="relative block h-full translate-y-0 transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
          {label}
        </span>
        <span className="absolute top-0 left-0 block h-full translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
          {label}
        </span>
      </span>
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
    <button className={classes} {...(props as ComponentPropsWithoutRef<"button">)}>
      {content}
    </button>
  );
}
