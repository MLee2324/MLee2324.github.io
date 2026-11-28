"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

// The app shell: skip link, header, page content, and a one-line footer.
export default function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* first Tab stop: lets keyboard and screen-reader users jump past the header */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1100] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
      >
        Skip to content
      </a>
      <Header />
      {children}
      <Footer />
    </>
  );
}
