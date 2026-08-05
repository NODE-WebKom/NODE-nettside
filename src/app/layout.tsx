import type { Metadata } from "next";
import { Tektur } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { WindowManagerProvider } from "@/components/WindowManager/WindowManagerContext";
import { PostItManagerProvider } from "@/components/WindowManager/PostItManagerContext";
import WindowRenderer from "@/components/WindowManager/WindowRenderer";
import PostItRenderer from "@/components/WindowManager/PostItRenderer";
import { DesktopStackProvider } from "@/components/WindowManager/DesktopStackContext";

const tektur = Tektur({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-geist-tektur',
  display: 'swap'
});

export const metadata: Metadata = {
  title: "NODE | Linjeforeningen for Kunstig Intelligens",
  description: "NODE er linjeforeningen for Kunstig Intelligens (KI) ved Universitetet i Bergen, (UiB). NODE is the student organization for Artificial Intelligence at the University of Bergen, (UiB)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="no" className={tektur.variable}>
      <body className={`${tektur.variable} antialiased flex flex-col min-h-screen`}>
        
        <DesktopStackProvider>
            <WindowManagerProvider>
              <PostItManagerProvider>

                <main className="flex-1 flex flex-col items-start justify-end pb-20 p-0">
                  {children}
                </main>

                <WindowRenderer />
                <PostItRenderer />
                <Navbar/>

              </PostItManagerProvider>
          </WindowManagerProvider>
        </DesktopStackProvider>

        
      </body>
    </html>
  );
}
