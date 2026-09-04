import type { LucideIcon } from "lucide-react";

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

export interface GalleryLink {
  href: string;
  label: string;
  image: ImageAsset;
}

export interface MarqueeColumn {
  images: ImageAsset[];
  repeats: number;
  duration?: string;
}

export interface CtaLink {
  href: string;
  label: string;
}

export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FormFieldSchema {
  name: string;
  label: string;
  /** Which control to render. Defaults to "input". */
  control?: "input" | "textarea" | "select";
  /** Input type when `control` is "input" (or omitted). */
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  /** Rows when `control` is "textarea". */
  rows?: number;
  /** Options when `control` is "select"; the option text doubles as its value. */
  options?: string[];
  defaultValue?: string;
  /** Span both columns of the form grid. */
  fullWidth?: boolean;
}

export interface HeroContent {
  eyebrow: string;
  heading: string;
  body: string;
}

export interface StatCard {
  value: string;
  suffix: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  avatarSrc: string;
  name: string;
  title: string;
}

export interface QuoteSlide {
  stat: StatCard;
  quote: string;
  avatarSrc: string;
  name: string;
  title: string;
}

export interface AccordionItem {
  title: string;
  content: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatarSrc: string;
}

export type PricingTierId = "free" | "starter" | "professional" | "enterprise";

export interface PricingTier {
  id: PricingTierId;
  name: string;
  priceMonthly: string;
  priceAnnual: string;
  isCustomPrice: boolean;
  priceCaption?: string;
  highlighted?: boolean;
  ctaLabel: string;
}

export interface PricingFeatureRow {
  label: string;
  tooltip: string;
  values: Partial<Record<PricingTierId, string | boolean>>;
}

export interface ArticleTeaser {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
}

export interface TocItem {
  id: string;
  label: string;
}

export interface ArticlePerson {
  name: string;
  role: string;
  avatarSrc: string;
}

export interface ArticleStat {
  value: string;
  suffix?: string;
  label: string;
}

export interface ArticleApproachStep {
  number: string;
  stageLabel?: string;
  title: string;
  body: string;
}

export interface ArticleResultItem {
  value: string;
  suffix?: string;
  label: string;
  body: string;
}

export interface ArticleDeliverable {
  icon: LucideIcon;
  title: string;
  body: string;
}

export interface ArticleGalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}
