// Baseagrodata - App Layout | Deployment: 2026-01-25 08:11
import type { Metadata } from "next";
import { Montserrat, Maven_Pro } from "next/font/google";
import "./globals.css";
import NavFooterToggle from "./components/NavFooterToggle";

import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { FloatingChatButton } from "@/components/FloatingChatButton";

import { GoogleTranslate } from "@/components/GoogleTranslate";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  variable: "--font-maven-pro",
});

export const metadata: Metadata = {
  title: "Baseagrodata",
  description: "O seu repositório agrário",
  manifest: "/manifest.json",
  themeColor: "#059669",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="text/javascript"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          async
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'pt',
                  includedLanguages: 'en,pt',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `,
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${mavenPro.variable} font-sans antialiased bg-background min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <ThemeProvider
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <NavFooterToggle>
              <main className="flex-1 flex flex-col">
                {children}
              </main>
              <FloatingChatButton />
              <GoogleTranslate />
              <PWAInstallPrompt />
            </NavFooterToggle>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
