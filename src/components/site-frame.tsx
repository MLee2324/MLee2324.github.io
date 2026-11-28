"use client";

import Header from "@/components/header/header";

// The app shell: header and page content.
export default function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
