import type { Metadata } from "next";
import { Tektur } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        
        <main className="flex-1 flex flex-col items-start justify-end pb-20 p-0">
          {children}
        </main>

        <Navbar/>
      </body>
    </html>
  );
}
