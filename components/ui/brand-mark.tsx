import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BrandMarkProps = {
  /** The brand lockup contents (glyph + name). Supply from `content/site-wide`. */
  children: ReactNode;
  /** Lockup styling. Supply from `content/site-wide` (`siteWideContent.brand.lockup.className`). */
  className?: string;
  /** Render as a link when provided; otherwise a plain <div>. */
  href?: string;
};

/** Wraps a brand lockup as a link (when `href` is set) or a plain block. Styling comes from the caller. */
export function BrandMark({ children, className, href }: BrandMarkProps) {
  if (href) {
    return (
      <a href={href} className={cn(className)}>
        {children}
      </a>
    );
  }

  return <div className={cn(className)}>{children}</div>;
}
