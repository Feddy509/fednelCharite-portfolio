import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
// @ts-ignore
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ResumeModalProvider } from "@/components/ResumeModal";
import { personalInfo } from "@/data/portfolioData";
import { LanguageProvider } from "@/app/context/LanguageContext";
import { Analytics } from "@vercel/analytics/react"; // Enpòtasyon Analytics

// 1. Config polis yo
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const siteUrl = personalInfo?.social?.website || "https://fednelcharite.site";

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
    type: "website",
    images: [{ url: '/og-image.png', width: 1200, height: 630 }], // Asire w ou gen imaj sa nan folder /public
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.name} - Full-Stack Software Engineer`,
    description: personalInfo.heroVision,
    images: ['/og-image.png'],
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
      className={`${inter.variable} ${plusJakarta.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* JSON-LD Structured Data pou IA yo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": personalInfo.name,
              "jobTitle": "Full-Stack Software Engineer & DevSecOps",
              "url": siteUrl,
              "sameAs": [
                personalInfo.social?.linkedin || "",
                personalInfo.social?.github || ""
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Solutions Technologies Hub"
              }
            }),
          }}
        />
      </head>
      <body className="bg-ink font-sans text-paper antialiased selection:bg-accent-600/30 selection:text-paper">
        <LanguageProvider>
          <ResumeModalProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 pt-2 sm:pt-4">{children}</main>
              <Footer />
              <Analytics /> {/* Entegrasyon Vercel Analytics */}
            </div>
          </ResumeModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}