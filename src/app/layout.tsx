import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/views/components/ui/scroll-to-top";
import { NeonCursor } from "@/views/components/ui/neon-cursor";
import { Navbar } from "@/views/components/ui/navbar";
import { PageLoader } from "@/views/components/ui/page-loader";
import { IntroProvider } from "@/context/IntroContext";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leon Portfolio",
  description: "Modern, high-performance portfolio showcasing full stack developer expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <ThemeProvider>
          <IntroProvider>
            <PageLoader />
            <Navbar />
            <NeonCursor />
            {children}
            <ScrollToTop />
          </IntroProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
