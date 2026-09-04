import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FieldControl = "input" | "textarea" | "select";

type FieldProps = {
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
  /** Skip the shared base control classes and use only `className`. */
  unstyled?: boolean;
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  /** Sibling node rendered after the control (e.g. an absolutely-positioned submit button). */
  trailing?: ReactNode;
};

const baseControl =
  "w-full border-b border-border bg-transparent py-3 text-base transition-all outline-none focus:border-primary";
const placeholderTint = "placeholder:text-muted-foreground/40";

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
  unstyled = false,
  className,
  wrapperClassName = "space-y-2",
  labelClassName = "text-sm font-medium",
  trailing,
}: FieldProps) {
  const controlClassName = unstyled
    ? className
    : cn(
        baseControl,
        as !== "select" && placeholderTint,
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
        <label htmlFor={id} className={labelClassName}>
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
