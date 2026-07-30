import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ResumeModalProvider } from "@/components/ResumeModal";
import { personalInfo } from "@/data/portfolioData";
import { LanguageProvider } from "@/app/context/LanguageContext";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${personalInfo.name} — Software Engineer & Full-Stack Developer`,
  description: personalInfo.heroVision,
  metadataBase: new URL(personalInfo.social.website),
  openGraph: {
    title: `${personalInfo.name} — Software Engineer & Full-Stack Developer`,
    description: personalInfo.heroVision,
    url: personalInfo.social.website,
    siteName: personalInfo.name,
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${jakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-ink font-sans text-paper antialiased selection:bg-accent-600/30 selection:text-paper">
        <LanguageProvider>
          <ResumeModalProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ResumeModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}