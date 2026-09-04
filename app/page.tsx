import type { Metadata } from "next";
import { AccordionSection } from "@/components/organisms/accordion-section";
import { CarouselSection } from "@/components/organisms/carousel-section";
import { CtaBanner } from "@/components/organisms/cta-banner";
import { HeroSection2 } from "@/components/organisms/hero-section-2";
import { SiteShell } from "@/components/templates/site-shell";
import { StepsSection } from "@/components/organisms/steps-section";
import { homeContent } from "@/content/home";

export const metadata: Metadata = {
  title: homeContent.meta.title,
  description: homeContent.meta.description,
};

export default function Page() {
  return (
    <SiteShell footerVariant="full">
      <HeroSection2 {...homeContent.hero} />

      <StepsSection {...homeContent.mandate} />

      <CarouselSection {...homeContent.testimonials} />

      <AccordionSection {...homeContent.faq} />

      <CtaBanner
        heading={homeContent.finalCta.heading}
        body={homeContent.finalCta.body}
        cta={{
          href: homeContent.finalCta.ctaHref,
          label: homeContent.finalCta.ctaLabel,
        }}
      />
    </SiteShell>
  );
}
