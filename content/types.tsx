export interface ImageAsset {
  src: string;
  width: number;
  height: number;
  alt?: string;
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

export interface StatCard {
  value: string;
  suffix: string;
  label: string;
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

export interface ArticleApproachStep {
  number: string;
  stageLabel?: string;
  title: string;
  body: string;
}
