import type { ComponentPropsWithoutRef } from "react";

export function Eyebrow({
  className = "",
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={`text-xs font-medium tracking-widest text-muted-foreground uppercase ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
