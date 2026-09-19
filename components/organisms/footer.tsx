import Image from "next/image";
import { BrandMark } from "@/components/atoms/brand-mark";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { NewsletterForm } from "./forms/newsletter-form";
import { siteWideContent } from "@/content/site-wide";

const { brand, social, contact, footer } = siteWideContent;

function Copyright() {
  return (
    <p className="text-xs text-muted-foreground">
      {brand.copyrightPrefix}{" "}
      <a href={brand.crafterHref}>{brand.crafterName}</a>.
    </p>
  );
}

export function Footer() {
  return (
    <footer className="relative -mt-px bg-black text-white after:absolute after:-bottom-px after:left-0 after:h-0.5 after:w-full after:bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 md:py-20 lg:grid-cols-4">
          {footer.columns.map((column) => (
            <div key={column.heading}>
              <Eyebrow as="h2" className="mb-6">
                {column.heading}
              </Eyebrow>
              <ul className="space-y-4 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
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
            <Eyebrow as="h2" className="mb-6">
              {footer.needHelpHeading}
            </Eyebrow>
            <div className="space-y-6">
              <div>
                <Eyebrow as="p" className="mb-2">
                  {footer.callUsLabel}
                </Eyebrow>
                <p className="text-lg font-semibold">{contact.phone}</p>
              </div>
              <div>
                <Eyebrow as="p" className="mb-2">
                  {footer.supportLabel}
                </Eyebrow>
                <p className="text-lg font-semibold">{contact.supportEmail}</p>
              </div>
            </div>
          </div>

          <div>
            <Eyebrow as="h2" className="mb-4">
              {footer.newsletterHeading}
            </Eyebrow>
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
}
