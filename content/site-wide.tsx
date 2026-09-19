import type { ReactNode } from "react";
import type { CtaLink, SocialLink } from "./types";
import { siteConfig } from "@/site.config";

export interface FooterLinkColumn {
  heading: string;
  links: CtaLink[];
}

export interface BrandLockup {
  /**
   * The brand lockup shown in the header/footer — glyph + name.
   * Swap this for your own branding — inline <svg>, an <img>, or a
   * next/image <Image> plus the name. Keep the glyph roughly 16×16 and
   * inheriting `currentColor` so it adapts to the surrounding theme.
   */
  node: ReactNode;
  /** Wrapper classes for the lockup — layout + brand typography. */
  className: string;
}

export const siteWideContent = {
  brand: {
    lockup: {
      node: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
          </svg>
          <span>StatixFlow</span>
        </>
      ),
      className:
        "flex items-center gap-2 text-sm font-bold tracking-wider uppercase",
    } satisfies BrandLockup,
    copyrightPrefix: "© 2026 StatixFlow. Crafted by",
    crafterName: "Mercy Grace Studio",
    crafterHref: "https://mercygrace.studio/",
  },
  /**
   * This lite edition ships a single page, so the nav links into the live demo
   * of the paid edition rather than to routes that do not exist here.
   */
  nav: {
    primary: [
      { href: `${siteConfig.proSiteUrl}/home/`, label: "Home" },
      { href: `${siteConfig.proSiteUrl}/about/`, label: "About" },
      { href: `${siteConfig.proSiteUrl}/case-studies/`, label: "Case Studies" },
      { href: `${siteConfig.proSiteUrl}/blog/`, label: "Blog" },
      { href: `${siteConfig.proSiteUrl}/pricing/`, label: "Pricing" },
    ] satisfies CtaLink[],
  },
  social: {
    followPrefix: "Follow us on",
    links: [
      { icon: "x", label: "X (Twitter)", href: "#" },
      { icon: "linkedin", label: "LinkedIn", href: "#" },
      { icon: "bluesky", label: "Bluesky", href: "#" },
    ] satisfies SocialLink[],
  },
  contact: {
    email: "info@statixflow.com",
    phone: "+(1) 123 656 7890",
    supportEmail: "help@statixflow.com",
  },
  header: {
    brandHref: "/",
    ctaHref: siteConfig.purchaseUrl,
    ctaLabel: "Get pro version",
    menuLabel: "Menu",
    closeMenuLabel: "Close menu",
    mobileNavLabel: "Mobile navigation",
    socialHeading: "Social",
    menuHeading: "Menu",
    getInTouchHeading: "Get in touch",
  },
  footer: {
    needHelpHeading: "Need help?",
    callUsLabel: "Call Us Directly",
    supportLabel: "Need Support?",
    newsletterHeading: "Stay in the loop",
    columns: [
      {
        heading: "Company",
        links: [
          { href: `${siteConfig.proSiteUrl}/contact/`, label: "Contact Us" },
          { href: "#", label: "FAQ" },
          { href: "#", label: "Report A Bug" },
          { href: "#", label: "Careers" },
          { href: `${siteConfig.proSiteUrl}/about/`, label: "About Us" },
        ],
      },
      {
        heading: "Products",
        links: [
          { href: "#", label: "Company" },
          { href: `${siteConfig.proSiteUrl}/contact/`, label: "Contact" },
          {
            href: `${siteConfig.proSiteUrl}/privacy-policy/`,
            label: "Privacy Policy",
          },
          { href: "#", label: "Careers" },
        ],
      },
    ] satisfies FooterLinkColumn[],
  },
  newsletterForm: {
    emailPlaceholder: "Enter your email address",
    emailAriaLabel: "Email address",
    submitLabel: "Subscribe",
    submitAriaLabel: "Subscribe to newsletter",
    consent:
      "By subscribing, you agree to our privacy policy. Unsubscribe at any time.",
  },
};
