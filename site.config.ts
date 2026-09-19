/**
 * Scalar, deploy-varying site settings — the non-copy knobs for this site.
 * On-page text belongs in `content/`, not here.
 *
 * Add site-wide primitives here as you need them, e.g.:
 *   siteUrl:      "https://example.com"   — canonical origin for metadata / OG tags
 *   supportEmail: "hello@example.com"
 *   gtmId, gaId, plausibleDomain, …       — analytics identifiers (Google Tag
 *                                          Manager / Analytics, Plausible, …)
 *   flags:        { pricingV2: false }    — simple feature toggles
 *
 * For anything that varies between environments, read it from a
 * `process.env.NEXT_PUBLIC_*` variable with a hard-coded fallback, e.g.:
 *
 *   siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
 *
 * so the site still builds with no `.env` file present.
 */
export const siteConfig = {
  /** Gumroad listing for the paid edition — destination for every "Get pro version" CTA. */
  purchaseUrl: "https://mercygracestudio.gumroad.com/l/statixflow-next",
  /** Live demo of the paid edition — the top nav and footer link into its pages. */
  proSiteUrl: "https://statixflow-next.mercygrace.studio",
};
