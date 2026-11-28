"use client";

import DomainNotice from "@/components/domain-notice";

// Site-wide overlays. The template's decorative effects (particle background,
// elastic cursor, right-click reaction menu, console easter egg, live cursors)
// were removed for a calmer, more professional site.
export default function AppOverlays() {
  return <DomainNotice />;
}
