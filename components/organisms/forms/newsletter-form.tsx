"use client";

import { useState, type FormEvent } from "react";
import { Forward } from "lucide-react";
import { Field } from "@/components/molecules/field";
import { Button } from "@/components/atoms/button";
import { siteWideContent } from "@/content/site-wide";

const { newsletterForm } = siteWideContent;

export function NewsletterForm({ variant }: { variant: "card" | "footer" }) {
  const [email, setEmail] = useState("");
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  if (variant === "footer") {
    return (
      <form className="relative" action="#" onSubmit={handleSubmit}>
        <Field
          as="input"
          type="email"
          id="newsletter-footer-email"
          name="email"
          label={newsletterForm.emailAriaLabel}
          hideLabel
          autoComplete="email"
          placeholder={newsletterForm.emailPlaceholder}
          value={email}
          onChange={setEmail}
          variant="underlineInverse"
          wrapperClassName="contents"
          trailing={
            <button
              className="absolute top-1/2 right-0 -translate-y-1/2 text-white/50 transition-colors hover:text-white"
              type="submit"
              aria-label={newsletterForm.submitAriaLabel}
            >
              <Forward strokeWidth={1} className="size-4" />
            </button>
          }
        />
      </form>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Field
          as="input"
          type="email"
          id="newsletter-card-email"
          name="email"
          label={newsletterForm.emailAriaLabel}
          hideLabel
          autoComplete="email"
          placeholder={newsletterForm.emailPlaceholder}
          value={email}
          onChange={setEmail}
          variant="pill"
          wrapperClassName="w-full"
        />

        <Button type="submit" label={newsletterForm.submitLabel} />
      </div>
      <p className="text-xs text-muted-foreground">{newsletterForm.consent}</p>
    </form>
  );
}
