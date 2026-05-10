import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/views/components/ui/scroll-to-top";
import { NeonCursor } from "@/views/components/ui/neon-cursor";
import { Navbar } from "@/views/components/ui/navbar";
import { PageLoader } from "@/views/components/ui/page-loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leon Portfolio",
  description: "Modern, high-performance portfolio showcasing full stack developer expertise.",
};

import { IntroProvider } from "@/context/IntroContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <IntroProvider>
          <PageLoader />
          <Navbar />
          <NeonCursor />
          {children}
          <ScrollToTop />
        </IntroProvider>
      </body>
    </html>
  );
}
