import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
// @ts-ignore
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ResumeModalProvider } from "@/components/ResumeModal";
import { personalInfo } from "@/data/portfolioData";
import { LanguageProvider } from "@/app/context/LanguageContext";
import { Analytics } from "@vercel/analytics/react";
import ChatWidget from "@/components/ChatWidget";

/**
 * ==============================================================================
 * FR: Configuration et optimisation des polices de caractères Google Fonts
 * EN: Google Fonts configuration and optimization
 * ==============================================================================
 */
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const siteUrl = personalInfo?.social?.website || "https://fednelcharite.site";

/**
 * ==============================================================================
 * FR: Métadonnées globales (SEO, OpenGraph, Twitter Cards)
 * EN: Global metadata configuration (SEO, OpenGraph, Twitter Cards)
 * ==============================================================================
 */
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
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.name} - Full-Stack Software Engineer & Aspiring DevSecOps`,
    description: personalInfo.heroVision,
    images: ['/og-image.png'],
  },
};

/**
 * ==============================================================================
 * FR: Composant Disposition Racine (Root Layout)
 * EN: Root Layout Component
 * ==============================================================================
 */
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
        {/* FR: Données structurées JSON-LD pour l'indexation SEO et moteurs IA */}
        {/* EN: JSON-LD Structured Data for SEO and AI search indexing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": personalInfo.name,
              "jobTitle": "Full-Stack Software Engineer & Aspiring DevSecOps",
              "url": siteUrl,
              "sameAs": [
                "https://www.linkedin.com/in/fednel-charit%C3%A9-05271823b/",
                "https://github.com/Feddy509",
                "https://x.com/fednelcharite",
                "https://www.facebook.com/FednelCharite/"
              ],
              "worksFor": [
                {
                  "@type": "Organization",
                  "name": "Solutions Technologies Hub"
                },
                {
                  "@type": "Organization",
                  "name": "Zye Klere"
                }
              ],
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Université Unitech"
              },
              "knowsAbout": [
                "Software Engineering",
                "Full-Stack Development",
                "DevSecOps",
                "Cybersecurity",
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "Docker"
              ]
            }),
          }}
        />
      </head>
      <body className="bg-ink font-sans text-paper antialiased selection:bg-accent-600/30 selection:text-paper">
        {/* FR: Fournisseur de contexte pour l'internationalisation */}
        {/* EN: Language internationalization context provider */}
        <LanguageProvider>
          {/* FR: Fournisseur de contexte pour la modale de téléchagement de CV */}
          {/* EN: Resume download modal context provider */}
          <ResumeModalProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 pt-2 sm:pt-4">{children}</main>
              <Footer />
              {/* FR: Intégration de l'outil d'analyse Vercel Analytics */}
              {/* EN: Vercel Analytics tracking integration */}
              <Analytics />
              {/* FR: Intégration du Widget d'assistance IA (Feddy) */}
              {/* EN: AI Assistant Chatbot Widget Integration (Feddy) */}
              <ChatWidget />
            </div>
          </ResumeModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}