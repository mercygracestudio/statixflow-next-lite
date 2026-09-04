import Image from "next/image";
import { BrandMark } from "@/components/ui/brand-mark";
import { NewsletterForm } from "./forms/newsletter-form";
import { siteWideContent } from "@/content/site-wide";

const { brand, social, contact, footer } = siteWideContent;

export type FooterVariant = "full" | "minimal";

function Copyright() {
  return (
    <p className="text-xs text-muted-foreground">
      {brand.copyrightPrefix}{" "}
      <a href={brand.crafterHref}>{brand.crafterName}</a>.
    </p>
  );
}

export function Footer({ variant }: { variant: FooterVariant }) {
  switch (variant) {
    case "full":
    default:
      return (
        <footer className="relative -mt-px bg-black text-white after:absolute after:-bottom-px after:left-0 after:h-0.5 after:w-full after:bg-black">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 md:py-20 lg:grid-cols-4">
              {footer.columns.map((column) => (
                <div key={column.heading}>
                  <h2 className="mb-6 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                    {column.heading}
                  </h2>
                  <ul className="space-y-4 text-sm">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="transition-colors duration-300 ease-in-out hover:text-white/70"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <h2 className="mb-6 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                  {footer.needHelpHeading}
                </h2>
                <div className="space-y-6">
                  <div>
                    <p className="mb-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                      {footer.callUsLabel}
                    </p>
                    <p className="text-lg font-semibold">
                      {contact.phone}
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                      {footer.supportLabel}
                    </p>
                    <p className="text-lg font-semibold">
                      {contact.supportEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                  {footer.newsletterHeading}
                </h2>
                <NewsletterForm variant="footer" />
              </div>
            </div>

            <div className="relative flex flex-col items-center justify-between gap-4 pt-0 pb-10 before:absolute before:top-0 before:right-0 before:left-0 before:hidden before:h-px before:bg-white/20 sm:flex-row sm:pt-10 sm:before:block">
              <BrandMark className={brand.lockup.className}>
                {brand.lockup.node}
              </BrandMark>
              <Copyright />
              <div className="flex items-center gap-5">
                {social.links.map(({ icon, href, label }) => (
                  <a
                    key={icon}
                    href={href}
                    aria-label={`${social.followPrefix} ${label}`}
                    className="opacity-100 transition-opacity duration-300 ease-in-out hover:opacity-70"
                  >
                    <Image
                      src={`/imgs/social/light/${icon}.svg`}
                      alt=""
                      width="48"
                      height="48"
                      className="size-4"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      );
    case "minimal":
      return (
        <footer className="relative -mt-px bg-black text-white after:absolute after:-bottom-px after:left-0 after:h-0.5 after:w-full after:bg-black">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col items-center justify-between gap-4 py-10 lg:flex-row">
              <BrandMark className={brand.lockup.className}>
                {brand.lockup.node}
              </BrandMark>
              <Copyright />
              <div className="flex items-center gap-5">
                {footer.showcaseLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="transition-colors duration-300 ease-in-out hover:text-white/70"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      );
  }
}
