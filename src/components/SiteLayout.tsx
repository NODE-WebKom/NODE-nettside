"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import DesktopScale, { DesktopCanvas } from "@/components/DesktopScale";
import MobileLayout from "@/components/Mobile/MobileLayout";
import { WallpaperProvider } from "@/components/Wallpaper/WallpaperContext";
import WallpaperBackground from "@/components/Wallpaper/WallpaperBackground";
import { DesktopStackProvider } from "@/components/WindowManager/DesktopStackContext";
import { WindowManagerProvider } from "@/components/WindowManager/WindowManagerContext";
import { PostItManagerProvider } from "@/components/WindowManager/PostItManagerContext";
import WindowRenderer from "@/components/WindowManager/WindowRenderer";
import PostItRenderer from "@/components/WindowManager/PostItRenderer";

const MOBILE_BREAKPOINT = 560;

function useMobileView() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT}px)`
    );

    const updateView = () => setIsMobile(mediaQuery.matches);

    updateView();
    mediaQuery.addEventListener("change", updateView);

    return () => mediaQuery.removeEventListener("change", updateView);
  }, []);

  return isMobile;
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  const isMobile = useMobileView();
  const pathname = usePathname();

  if (isMobile === null) {
    return null;
  }

  const showMobile = isMobile || pathname === "/mobile";

  return (
    <WallpaperProvider>
      <WallpaperBackground />

      {showMobile ? (
        // Mobilappene (f.eks Arrangementer) bruker samme PostIt/stack-system
        // som PC-siden, så vi trenger de samme providerne her også.
        <DesktopStackProvider>
          <PostItManagerProvider>
            <MobileLayout />
            <PostItRenderer />
          </PostItManagerProvider>
        </DesktopStackProvider>
      ) : (
        <DesktopScale>
          <DesktopStackProvider>
            <WindowManagerProvider>
              <PostItManagerProvider>
                <DesktopCanvas>
                  <main className="flex flex-1 flex-col items-start justify-end p-0 pb-20">
                    {children}
                  </main>

                  <WindowRenderer />
                  <PostItRenderer />
                </DesktopCanvas>

                <Navbar />
              </PostItManagerProvider>
            </WindowManagerProvider>
          </DesktopStackProvider>
        </DesktopScale>
      )}
    </WallpaperProvider>
  );
}
