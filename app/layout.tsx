import { Instrument_Sans } from "next/font/google";
import "./globals.css";
// marketplace-strip-start
import { GoogleTagManager } from "@next/third-parties/google";
// marketplace-strip-end

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} gsap-intro-pending`}
    >
      <body>{children}</body>
      {/* marketplace-strip-start */}
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
      {/* marketplace-strip-end */}
    </html>
  );
}
