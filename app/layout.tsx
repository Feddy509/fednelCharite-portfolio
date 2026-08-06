import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ResumeModalProvider } from "@/components/ResumeModal";
import { personalInfo } from "@/data/portfolioData";
import { LanguageProvider } from "@/app/context/LanguageContext";

// 1. Polis pou Paragraf ak kò tèks (Ultra lizib)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// 2. Polis pou Tit yo (H1, H2, H3 - Tech & Engineering Style)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// 3. Polis pou Kòd, Badges ak Monospace
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = personalInfo?.social?.website || "https://fednelcharite.com";

export const metadata: Metadata = {
  title: `${personalInfo.name} - Full-Stack Software Engineer & Aspiring DevSecOps`,
  description: personalInfo.heroVision,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: `${personalInfo.name} - Full-Stack Software Engineer & Aspiring DevSecOps`,
    description: personalInfo.heroVision,
    url: siteUrl,
    siteName: personalInfo.name,
    locale: "fr_FR",
    alternateLocales: ["en_US"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-ink font-sans text-paper antialiased selection:bg-accent-600/30 selection:text-paper">
        <LanguageProvider>
          <ResumeModalProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 pt-2 sm:pt-4">{children}</main>
              <Footer />
            </div>
          </ResumeModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}