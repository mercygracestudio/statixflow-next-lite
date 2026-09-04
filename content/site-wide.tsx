import type { ReactNode } from "react";
import type { CtaLink, SocialLink } from "./types";

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
  nav: {
    primary: [
      {
        href: "https://statixflow-next.mercygrace.studio/home",
        label: "Home",
      },
      {
        href: "https://statixflow-next.mercygrace.studio/about",
        label: "About",
      },
      {
        href: "https://statixflow-next.mercygrace.studio/case-studies",
        label: "Case Studies",
      },
      { href: "https://statixflow-next.mercygrace.studio/blog", label: "Blog" },
      {
        href: "https://statixflow-next.mercygrace.studio/pricing",
        label: "Pricing",
      },
    ] satisfies CtaLink[],
    showcase: [
      { href: "#demos", label: "Demos" },
      { href: "#features", label: "Features" },
      { href: "#faqs", label: "FAQs" },
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
  buyNow: {
    label: "Get pro version",
    href: "https://mercygracestudio.gumroad.com/l/statixflow-next",
  } satisfies CtaLink,
  header: {
    brandHref: "/",
    purchaseHref: "https://mercygracestudio.gumroad.com/l/statixflow-next",
    purchaseLabel: "https://mercygracestudio.gumroad.com/l/statixflow-next",
    messageHref: "https://mercygracestudio.gumroad.com/l/statixflow-next",
    messageLabel: "Get pro version",
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
          {
            href: "https://mercygracestudio.gumroad.com/l/statixflow-next",
            label: "Contact Us",
          },
          {
            href: "https://mercygracestudio.gumroad.com/l/statixflow-next",
            label: "FAQ",
          },
          {
            href: "https://mercygracestudio.gumroad.com/l/statixflow-next",
            label: "Report A Bug",
          },
          {
            href: "https://mercygracestudio.gumroad.com/l/statixflow-next",
            label: "Careers",
          },
          {
            href: "https://mercygracestudio.gumroad.com/l/statixflow-next",
            label: "About Us",
          },
        ],
      },
      {
        heading: "Products",
        links: [
          {
            href: "https://mercygracestudio.gumroad.com/l/statixflow-next",
            label: "Company",
          },
          {
            href: "https://mercygracestudio.gumroad.com/l/statixflow-next",
            label: "Contact",
          },
          {
            href: "https://mercygracestudio.gumroad.com/l/statixflow-next",
            label: "Privacy Policy",
          },
          { href: "#", label: "Careers" },
        ],
      },
    ] satisfies FooterLinkColumn[],
    showcaseLinks: [
      { href: "https://statixflow-docs.mercygrace.studio/", label: "Docs" },
      { href: "https://mercygrace.studio/support", label: "Help Center" },
    ] satisfies CtaLink[],
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
