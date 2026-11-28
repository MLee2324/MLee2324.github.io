"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

// The app shell: header, page content, and a one-line footer.
export default function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
