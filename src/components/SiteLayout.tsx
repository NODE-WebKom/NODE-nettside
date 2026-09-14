"use client";

import { ReactNode } from "react";
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
import { useIsMobile } from "@/lib/useIsMobile";

export default function SiteLayout({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
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
