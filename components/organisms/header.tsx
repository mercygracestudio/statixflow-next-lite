"use client";

import { type MouseEvent, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSiteMotion } from "../animations/SiteMotionProvider";
import { useSmoothAnchorClick } from "../animations/SiteAnimations";
import { useHeaderAnimation } from "../animations/useHeaderAnimation";
import { ChevronRight } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { siteWideContent } from "@/content/site-wide";

const { brand, nav, social, contact, header } = siteWideContent;

export function Header({ showcase = false }: { showcase?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = showcase ? nav.showcase : nav.primary;
  const { headerRef, smootherRef } = useSiteMotion();
  const handleSmoothAnchorClick = useSmoothAnchorClick();

  useHeaderAnimation(headerRef);

  useEffect(() => {
    const smoother = smootherRef.current;
    document.body.style.overflow = open ? "hidden" : "";
    smoother?.paused(open);
    const escape = (event: KeyboardEvent) =>
      event.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 1281px)");
    const closeOnDesktop = (event: MediaQueryListEvent) =>
      event.matches && setOpen(false);
    document.addEventListener("keydown", escape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = "";
      smoother?.paused(false);
      document.removeEventListener("keydown", escape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open, smootherRef]);

  const openAttribute = open ? { open: true } : {};
  const handleMobileLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setOpen(false);
    if (href.startsWith("#")) handleSmoothAnchorClick(event);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 right-0 left-0 z-50 py-4"
        data-animated-scroll-header=""
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-xl sm:py-2">
            <BrandMark
              href={showcase ? "#" : header.brandHref}
              className={brand.lockup.className}
            >
              {brand.lockup.node}
            </BrandMark>

            <nav
              className="hidden items-center gap-10 text-sm font-medium xl:flex"
              data-desktop-nav=""
              {...(showcase ? { "data-highlight-on-scroll": "" } : {})}
            >
              {links.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={showcase ? handleSmoothAnchorClick : undefined}
                  {...(!showcase && pathname === href
                    ? { "data-active-link": "" }
                    : {})}
                  className={`text-foreground transition-colors duration-300 ease-in-out hover:text-foreground/70 data-active-link:text-muted-foreground${showcase ? "data-highlight-on-scroll-active-link:text-muted-foreground" : ""}`}
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-6">
              <a
                href={
                  showcase
                    ? header.purchaseHref
                    : header.messageHref
                }
                className="group hidden items-center justify-center gap-2 rounded-full border border-primary bg-transparent px-4 py-3 text-sm font-medium text-black sm:inline-flex"
              >
                <span className="relative overflow-hidden">
                  <span className="relative block h-full translate-y-0 transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                    {showcase
                      ? header.purchaseLabel
                      : header.messageLabel}
                  </span>
                  <span className="absolute top-0 left-0 block h-full translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                    {showcase
                      ? header.purchaseLabel
                      : header.messageLabel}
                  </span>
                </span>
                <span className="translate-x-0 transition-transform duration-300 ease-in-out group-hover:translate-x-2">
                  <ChevronRight className="size-4" strokeWidth={1} />
                </span>
              </a>

              <button
                type="button"
                className="group flex cursor-pointer items-center gap-2 xl:hidden"
                data-mobile-nav-trigger=""
                aria-label="Toggle menu"
                aria-expanded={open}
                onClick={() => setOpen((current) => !current)}
                {...openAttribute}
              >
                <span className="text-xs font-medium tracking-widest text-foreground uppercase">
                  {header.menuLabel}
                </span>
                <span className="flex h-3 w-4 flex-col justify-between">
                  <span className="block h-px w-full origin-center bg-current transition-all duration-300 ease-in-out group-open:translate-y-[5.5px] group-open:rotate-45" />
                  <span className="block h-px w-full origin-center bg-current transition-all duration-300 ease-in-out group-open:opacity-0" />
                  <span className="block h-px w-full origin-center bg-current transition-all duration-300 ease-in-out group-open:translate-y-[-5.5px] group-open:-rotate-45" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <button
        type="button"
        aria-label={header.closeMenuLabel}
        className="pointer-events-none fixed inset-0 z-60 bg-black/40 opacity-0 transition-all duration-300 ease-in-out open:pointer-events-auto open:opacity-100"
        data-mobile-nav-overlay=""
        onClick={() => setOpen(false)}
        {...openAttribute}
      />

      <aside
        aria-label={header.mobileNavLabel}
        className="fixed top-0 left-0 z-70 flex h-screen w-3/4 -translate-x-full flex-col bg-black text-white transition-transform duration-300 ease-in-out open:translate-x-0"
        data-mobile-nav-sheet=""
        {...openAttribute}
      >
        <div className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto p-10 md:p-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr] md:gap-10">
            <div>
              <h2 className="mb-6 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                {header.socialHeading}
              </h2>
              <ul className="space-y-4 text-lg sm:space-y-6">
                {social.links.map(({ icon, label, href }) => (
                  <li key={icon}>
                    <a
                      href={href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 opacity-100 transition-opacity duration-300 ease-in-out hover:opacity-70"
                      aria-label={`${social.followPrefix} ${label}`}
                    >
                      <Image
                        src={`/imgs/social/light/${icon}.svg`}
                        alt={label}
                        width="48"
                        height="48"
                        className="size-4"
                        loading="lazy"
                      />
                      <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                {header.menuHeading}
              </h2>
              <ul className="space-y-4 text-lg font-medium sm:space-y-6 md:text-4xl">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={(event) => handleMobileLinkClick(event, href)}
                      {...(!showcase && pathname === href
                        ? { "data-active-link": "" }
                        : {})}
                      className="transition-opacity duration-300 ease-in-out hover:opacity-70 data-active-link:text-muted-foreground"
                    >
                      {label}
                    </a>
                  </li>
                ))}
                {!showcase && (
                  <li>
                    <a
                      href={header.messageHref}
                      onClick={() => setOpen(false)}
                      className="transition-opacity duration-300 ease-in-out hover:opacity-70 data-active-link:text-muted-foreground"
                    >
                      {header.messageLabel}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-auto pt-8 md:pt-10">
            <p className="mb-6 text-xs font-medium tracking-widest text-muted-foreground uppercase">
              {header.getInTouchHeading}
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="text-lg font-medium transition-opacity duration-300 ease-in-out hover:opacity-70"
            >
              {contact.email}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
