"use client";

import { useState, type FormEvent } from "react";
import { Forward } from "lucide-react";
import { Field } from "@/components/molecules/field";
import { Button } from "@/components/ui/button";
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
          unstyled
          wrapperClassName="contents"
          className="w-full border-b border-white/30 bg-transparent py-3 pr-8 text-sm text-white/80 placeholder-white/30 transition-colors duration-300 ease-in-out outline-none focus:border-white/80"
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
          unstyled
          wrapperClassName="w-full"
          className="w-full rounded-full border border-border px-6 py-3 text-sm text-foreground placeholder-foreground/40 transition-colors duration-300 ease-in-out outline-none focus:border-black"
        />

        <Button
          type="submit"
          label={newsletterForm.submitLabel}
          className="bg-primary px-6 py-3 text-base text-white"
        />
      </div>
      <p className="text-xs text-muted-foreground">{newsletterForm.consent}</p>
    </form>
  );
}
