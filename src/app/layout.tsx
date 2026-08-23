import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/data/store";
import { generateSiteMetadata } from "@/lib/seo/metadata";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { CustomCursor } from "@/components/common/CustomCursor";
import { BackgroundGradients } from "@/components/common/BackgroundGradients";
import { CommandPalette } from "@/components/common/CommandPalette";
import { AIPortfolioConcierge } from "@/components/common/AIPortfolioConcierge";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { ReadingProgress } from "@/components/common/ReadingProgress";
import { JsonLd } from "@/components/seo/JsonLd";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const displayFont = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return generateSiteMetadata(undefined, settings);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${displayFont.variable} ${serifFont.variable} ${monoFont.variable} dark`}
    >
      <body className="bg-[#08080a] text-[#f4f4f7] min-h-screen flex flex-col antialiased selection:bg-[#dfb15b] selection:text-black">
        {/* Structured Data: Person, WebSite & ProfessionalService */}
        <JsonLd type="person" settings={settings} />
        <JsonLd type="website" settings={settings} />
        <JsonLd type="professionalService" settings={settings} />

        {/* Reading Progress Bar */}
        <ReadingProgress />

        {/* Ambient Lighting & Luxury FX */}
        <BackgroundGradients />
        <CustomCursor />

        {/* Navigation Header */}
        <Header
          authorName={settings.authorName}
          availabilityStatus={settings.availabilityStatus}
        />

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Interactive Floating Features */}
        <CommandPalette />
        <AIPortfolioConcierge />
        <ScrollToTop />

        {/* Floating WhatsApp Button */}
        <FloatingWhatsApp
          number={settings.whatsappNumber || ""}
          message={settings.whatsappDefaultMessage || "Hi, I would like to discuss a website project."}
          enabled={settings.whatsappEnabled !== false}
        />

        {/* Global Footer */}
        <Footer settings={settings} />
      </body>
    </html>
  );
}
