import type { Metadata } from "next";
import { HeroSection7 } from "@/components/organisms/hero-section-7";
import { Button } from "@/components/ui/button";
import { HistoryBackButton } from "@/components/ui/history-back-button";
import { SiteShell } from "@/components/templates/site-shell";
import { notFoundContent } from "@/content/not-found";

export const metadata: Metadata = {
  title: notFoundContent.meta.title,
  description: notFoundContent.meta.description,
};

export default function Page() {
  return (
    <SiteShell footerVariant="full">
      <HeroSection7 {...notFoundContent.hero}>
        <HistoryBackButton
          variant="outline"
          label={notFoundContent.actions.backLabel}
          className="border-gray-700 text-white"
        />
        <Button
          href={notFoundContent.actions.ctaHref}
          label={notFoundContent.actions.ctaLabel}
          className="bg-white px-6 py-3 text-base text-black"
        />
      </HeroSection7>
    </SiteShell>
  );
}
