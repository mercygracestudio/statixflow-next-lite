import type { AccordionItem, QuoteSlide } from "./types";

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface MandateStep {
  number: string;
  title: string;
  body: string;
}

export const homeContent = {
  meta: {
    title: "Home - StatixFlow",
    description:
      "StatixFlow is a premium platform designed to optimize performance, growth strategy, and automate your business processes. Start your free trial today.",
  },
  hero: {
    backgroundImage: {
      src: "/imgs/generic/noisy-gradient.avif",
      alt: "",
      width: 1800,
      height: 793,
    } satisfies ImageAsset,
    heading: "Ship More. Profit always",
    body: "Use customer data to build great and solid product experiences that convert.",
    primaryCtaLabel: "Start a free trial",
    secondaryCtaLabel: "Learn more",
    logos: [
      { src: "/imgs/companies/dark/frequencii.svg", alt: "Frequencii", width: 177, height: 48 },
      { src: "/imgs/companies/dark/alt+shift.svg", alt: "Alt + Shift", width: 153, height: 48 },
      { src: "/imgs/companies/dark/global-bank.svg", alt: "Global Bank", width: 193, height: 48 },
      { src: "/imgs/companies/dark/easy-tax.svg", alt: "Easy Tax", width: 158, height: 48 },
    ] as ImageAsset[],
  },
  mandate: {
    eyebrow: "Our Mandate",
    heading:
      "We're an experienced and efficient payroll services provider, with top-class customer satisfaction at the very centre of the business.",
    body: "Reform delivers cutting-edge technology that enables you to adopt and roll out AI across your organization without letting go of your systems or losing the human touch.",
    steps: [
      {
        number: "01",
        title: "Connect your systems",
        body: "Reform connects to all the third party and in-house systems and databases that you trust and use daily.",
      },
      {
        number: "02",
        title: "Digitize your SOPs",
        body: "Upload your existing procedures and automate tasks from data extraction to customs preparation.",
      },
      {
        number: "03",
        title: "Supercharge your team",
        body: "Human-in-the-loop dashboards enable your team to focus on what matters most and only handle exceptions when needed.",
      },
      {
        number: "04",
        title: "Visualize your data",
        body: "Configure custom dashboards to provide your team and customers with analytics and insights from all connected systems.",
      },
    ] as MandateStep[],
  },
  testimonials: {
    eyebrow: "Testimonials",
    headingParts: ["Here's what our customers", "have to say about us"] as [string, string],
    slides: [
      {
        stat: { value: "38", suffix: "mins", label: "saved per tax declaration" },
        quote:
          "Working at a U.S. brokerage that processes large amounts of data daily, I’ve found StatixFlow to be a game changer. Their API lets us reliably ingest and queue our data lineage, which has made our operations noticeably smoother and more efficient.",
        avatarSrc: "/imgs/avatars/avatar-1.webp",
        name: "Sydney Roberts",
        title: "CTO at Tax Solutions",
      },
      {
        stat: { value: "60", suffix: "%", label: "increase in team productivity" },
        quote:
          "The integration was seamless and the results were immediate. Our team productivity increased by 60% within the first month. The support team is incredibly responsive and helpful.",
        avatarSrc: "/imgs/avatars/avatar-2.webp",
        name: "Michael Doe",
        title: "CFO at TechFlow",
      },
      {
        stat: { value: "85", suffix: "%", label: "reduction in manual tasks" },
        quote:
          "We've been searching for a solution like this for years. The automation capabilities have transformed how we handle our daily operations and customer communications.",
        avatarSrc: "/imgs/avatars/avatar-3.webp",
        name: "Michelle Chen",
        title: "Director at LogiPro",
      },
      {
        stat: { value: "50", suffix: "%", label: "faster customs processing" },
        quote:
          "The ROI was evident from day one. Our customs processing time has been cut in half, and our clients are noticing the improvement in delivery times.",
        avatarSrc: "/imgs/avatars/avatar-4.webp",
        name: "David Kim",
        title: "VP at GlobalShip",
      },
      {
        stat: { value: "3", suffix: "x", label: "business growth in 6 months" },
        quote:
          "This platform has been a game-changer for our startup. The scalability and flexibility have allowed us to grow without worrying about operational bottlenecks.",
        avatarSrc: "/imgs/avatars/avatar-5.webp",
        name: "Emily Johnson",
        title: "Founder at FastFreight",
      },
    ] as QuoteSlide[],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Have any questions?",
    items: [
      {
        title: "What do I get after purchase?",
        content:
          "You’ll receive instant access to the digital product via email, including download links and any setup instructions. If it’s a SaaS product, you’ll get login credentials and onboarding guidance right away.",
      },
      {
        title: "Is this a one-time payment or subscription?",
        content:
          "This product is available as a one-time purchase. However, some advanced features or future updates may be offered under optional subscription plans.",
      },
      {
        title: "Can I use this product for commercial projects?",
        content:
          "Yes. You’re free to use the product for personal and commercial projects unless otherwise stated in the license terms. Redistribution or resale of the original files is not permitted.",
      },
      {
        title: "Do I need technical skills to use this?",
        content:
          "Basic familiarity with digital tools is helpful, but step-by-step documentation is included. For SaaS products, everything runs in your browser—no installation required.",
      },
      {
        title: "Do you offer refunds?",
        content:
          "Due to the nature of digital products, refunds are generally not available. However, if you experience technical issues or are unsatisfied, contact support and we’ll do our best to resolve it.",
      },
      {
        title: "Will I receive future updates?",
        content:
          "Yes. Minor updates and improvements are included at no extra cost. Major feature upgrades may be released separately depending on the product roadmap.",
      },
    ] satisfies AccordionItem[],
    sideCard: {
      heading: "Still looking for answers or need a good chat?",
      body: "If you don't see the answer to your question, send us a message and we will answer you as soon as possible, within a few hours.",
      ctaLabel: "Contact Us",
      ctaHref: "#",
    },
  },
  finalCta: {
    decorativeImage: {
      src: "/imgs/generic/concentric-circles.svg",
      alt: "",
      width: 800,
      height: 800,
    } satisfies ImageAsset,
    heading: "Get started today",
    body: "You don’t need to overhaul the tools you already rely on. See how StatixFlow can streamline your workflows and give your team back up to 25% of their productive time every month.",
    ctaLabel: "Start a free trial",
    ctaHref: "#",
  },
};
