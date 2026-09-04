"use client";

import { useEffect, useState } from "react";

// Samme grense som SiteLayout.tsx bruker for å avgjøre om det er
// mobilvisningen (MobileLayout) eller PC-visningen (vinduer) som vises.
// Ligger her sentralt slik at innhold som brukes i BÅDE PC-vinduer og
// mobil-appvisning (CommitteeContent, KontaktOssContent osv.) kan stable
// seg selv riktig - basert på den ekte mobil/PC-grensen i JS, ikke en
// separat CSS-brytningsgrense som lett kommer ut av sync.
//
// Returnerer null helt til vi vet det sikkert (rett før første måling
// i nettleseren) - da unngår SiteLayout et kort glimt av feil visning.
export const MOBILE_BREAKPOINT = 560;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

    const update = () => setIsMobile(mediaQuery.matches);
    update();

    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isMobile;
}
