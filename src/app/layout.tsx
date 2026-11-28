import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { config } from "@/data/config";

import Script from "next/script";
import SiteFrame from "@/components/site-frame";
import { Providers } from "@/components/providers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { A11Y_INIT_SCRIPT } from "@/lib/a11y-script";

/* One typeface for the whole site: Inter for body text and headings. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(config.site),
  alternates: { canonical: "./" },
  title: config.title,
  description: config.description.long,
  keywords: config.keywords,
  authors: [{ name: config.author }],
  openGraph: {
    title: config.title,
    description: config.description.short,
    url: config.site,
    ...(config.ogImg && {
      images: [{ url: config.ogImg, width: 1200, height: 630, alt: "Portfolio preview" }],
    }),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short,
    ...(config.ogImg && { images: [config.ogImg] }),
  },
  // Google Search Console ownership check
  verification: { google: "8a3C2TdnxOOaIPaU26IYpM5fEiQdUYC7M7jRoqzi6Vs" },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[
        inter.variable,
        "font-sans",
      ].join(" ")}
      suppressHydrationWarning
    >
      <head>
        {/* apply saved accessibility options before first paint */}
        <Script id="a11y-prefs" strategy="beforeInteractive">
          {A11Y_INIT_SCRIPT}
        </Script>
      </head>
      <body>
        <Providers>
          <SiteFrame>
            {children}
          </SiteFrame>
        </Providers>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
