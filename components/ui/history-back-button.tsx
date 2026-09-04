"use client";

import type { ComponentProps } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = Omit<
  Extract<ComponentProps<typeof Button>, { href?: undefined }>,
  "href" | "icon" | "iconPosition"
>;

export function HistoryBackButton({ onClick, ...props }: Props) {
  return (
    <Button
      {...props}
      iconPosition="leading"
      icon={<ChevronLeft strokeWidth={1} className="size-4" />}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) window.history.back();
      }}
    />
  );
}
