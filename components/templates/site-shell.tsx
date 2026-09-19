import type { ReactNode } from "react";
import { Footer } from "../organisms/footer";
import { Header } from "../organisms/header";
import { SiteAnimations } from "../animations/SiteAnimations";
import { SiteMotionProvider } from "../animations/SiteMotionProvider";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <SiteMotionProvider>
      <Header />
      <SiteAnimations>
        <div aria-hidden="true" className="h-21 sm:h-23.5" />
        <main data-main-container="">
          {children}
          <Footer />
        </main>
      </SiteAnimations>
    </SiteMotionProvider>
  );
}
