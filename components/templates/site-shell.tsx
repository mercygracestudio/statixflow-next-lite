import type { ReactNode } from "react";
import { siteWideContent } from "@/content/site-wide";
import { Footer, type FooterVariant } from "../organisms/footer";
import { Header } from "../organisms/header";
import { SiteAnimations } from "../animations/SiteAnimations";
import { SiteMotionProvider } from "../animations/SiteMotionProvider";
import { CornerCta } from "../ui/corner-cta";

export function SiteShell({
  children,
  footerVariant,
}: {
  children: ReactNode;
  footerVariant: FooterVariant;
}) {
  return (
    <SiteMotionProvider>
      <Header showcase={footerVariant === "minimal"} />
      <CornerCta
        href={siteWideContent.buyNow.href}
        label={siteWideContent.buyNow.label}
      />
      <SiteAnimations>
        <div aria-hidden="true" className="h-21 sm:h-23.5" />
        <main data-main-container="">
          {children}
          <Footer variant={footerVariant} />
        </main>
      </SiteAnimations>
    </SiteMotionProvider>
  );
}
