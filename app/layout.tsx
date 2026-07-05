import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import EasterEgg from "@/components/EasterEgg";
import { LanguageProvider } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://harshulnanda.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} | ML & Data Engineer`,
  description: profile.tagline,
  keywords: [
    "Harshul Nanda",
    "Machine Learning Engineer",
    "Data Engineer",
    "Reinforcement Learning",
    "KIT",
    "Portfolio",
    "Python",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} | ML & Data Engineer`,
    description: profile.tagline,
    url: siteUrl,
    siteName: profile.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ML & Data Engineer`,
    description: profile.tagline,
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#05060c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <LanguageProvider>
          <SmoothScroll>
            <Cursor />
            <ScrollProgress />
            <Navbar />
            <main>{children}</main>
            <EasterEgg />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
