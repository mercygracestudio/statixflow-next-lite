import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

type FieldControl = "input" | "textarea" | "select";

/**
 * The three control skins the site uses. They are alternative surfaces rather
 * than a base plus tweaks — a pill and an underline would fight.
 */
const controlVariants = cva("w-full py-3 outline-none", {
  variants: {
    variant: {
      underline:
        "border-b border-border bg-transparent text-base transition-all focus:border-primary",
      /** The footer newsletter: an underline on a dark surface, with room for a trailing submit. */
      underlineInverse:
        "border-b border-white/30 bg-transparent pr-8 text-sm text-white/80 transition-colors duration-300 ease-in-out placeholder-white/30 focus:border-white/80",
      /**
       * The newsletter card: a rounded control on the page background. It is
       * explicitly white — the page background is slate-50, so `transparent`
       * would tint it.
       */
      pill: "rounded-full border border-border bg-white px-6 text-sm text-foreground transition-colors duration-300 ease-in-out placeholder-foreground/40 focus:border-black",
    },
  },
  defaultVariants: {
    variant: "underline",
  },
});

export type FieldVariant = NonNullable<
  VariantProps<typeof controlVariants>["variant"]
>;

type FieldProps = VariantProps<typeof controlVariants> & {
  id: string;
  name: string;
  /** Always required for a11y. Rendered as a visible <label> unless `hideLabel`. */
  label: string;
  hideLabel?: boolean;
  as?: FieldControl;
  /** Input type when `as` is "input". */
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  /** Rows when `as` is "textarea". */
  rows?: number;
  /** Options when `as` is "select"; the option text doubles as its value. */
  options?: string[];
  value: string;
  onChange: (value: string) => void;
  /** Layout only — the control's own styling comes from `variant`. */
  className?: string;
  wrapperClassName?: string;
  /** Sibling node rendered after the control (e.g. an absolutely-positioned submit button). */
  trailing?: ReactNode;
};

export function Field({
  id,
  name,
  label,
  hideLabel = false,
  as = "input",
  type = "text",
  placeholder,
  autoComplete,
  required,
  rows = 5,
  options = [],
  value,
  onChange,
  variant,
  className,
  wrapperClassName = "space-y-2",
  trailing,
}: FieldProps) {
  const controlClassName = cn(
    controlVariants({ variant }),
    // A select has no placeholder to tint.
    (variant ?? "underline") === "underline" &&
      as !== "select" &&
      "placeholder:text-muted-foreground/40",
    as === "textarea" && "resize-none",
    className,
  );

  const shared = {
    id,
    name,
    required,
    className: controlClassName,
    value,
    ...(hideLabel ? { "aria-label": label } : {}),
  };

  return (
    <div className={wrapperClassName}>
      {hideLabel ? null : (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}
      {as === "textarea" ? (
        <textarea
          {...shared}
          rows={rows}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : as === "select" ? (
        <select {...shared} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          {...shared}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {trailing}
    </div>
  );
}
