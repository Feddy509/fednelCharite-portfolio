import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
// @ts-ignore
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ResumeModalProvider } from "@/components/ResumeModal";
import { personalInfo } from "@/data/portfolioData";
import { LanguageProvider } from "@/app/context/LanguageContext";

// 1. Config polis Sora (Mete `--font-sora` pou Tailwind ak CSS ka detekte l)
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

// 2. Config polis JetBrains Mono (Mete `--font-jetbrains`)
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
    alternateLocale: ["en_US"],
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
      className={`${sora.variable} ${jetbrainsMono.variable}`}
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