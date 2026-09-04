"use client";
import { ReactNode, useEffect, useRef, useState } from "react";

function FakeWindow({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`inline-block bg-win-bg-gray p-[3px]
        border-t-[3px] border-l-[3px] border-b-[3px] border-r-[3px]
        border-t-white border-l-white
        border-b-win-dark-shadow border-r-win-dark-shadow
        shadow-[inset_-1px_-1px_0_var(--color-win-bg-dark-gray)] ${className}`}
    >
      <div
        className="h-6 mb-2"
        style={{
          background:
            "linear-gradient(to right, var(--color-win-blue) 60%, var(--color-win-dark-blue) 100%)",
        }}
      />
      <div className="px-3 py-2 text-black flex items-center justify-center whitespace-nowrap">
        {children}
      </div>
    </div>
  );
}

// luft til skjermkanten på hver side når headeren skaleres ned
const SIDE_MARGIN = 12;

export default function MobileHeader() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  // Tittelen er designet med faste pikselstørrelser (font, overlapp osv).
  // I stedet for å regne den om til vw-enheter (som ville ødelagt
  // overlappen mellom de to vinduene), måler vi den naturlige bredden og
  // skalerer hele greia ned med transform - da beholdes designet 1:1, bare
  // mindre, på smale skjermer (f.eks. iPhone 13).
  useEffect(() => {
    function updateScale() {
      const el = contentRef.current;
      if (!el) return;

      const naturalWidth = el.scrollWidth;
      const available = window.innerWidth - SIDE_MARGIN * 2;

      setScale(Math.min(1, available / naturalWidth));
    }

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="fixed top-2 inset-x-0 z-[20010] flex justify-center pointer-events-none">
      <div
        ref={contentRef}
        className="flex flex-col items-start"
        style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
      >
        <FakeWindow>
          <span className="text-black text-5xl pr-8 font-extrabold tracking-tight">
            NODE
          </span>
        </FakeWindow>

        <FakeWindow className="ml-34 -mt-15">
          <span className="text-black text-md font-bold">
            Linjeforeningen for kunstig intelligens
          </span>
        </FakeWindow>
      </div>
    </div>
  );
}
