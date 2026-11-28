"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import AppOverlays from "@/components/app-overlays";

// The app shell: header, page content, footer.
export default function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <AppOverlays />
    </>
  );
}
