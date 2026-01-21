import type { Metadata } from "next";
import { Montserrat, Maven_Pro } from "next/font/google";
import "./globals.css";
import NavFooterToggle from "./components/NavFooterToggle";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${mavenPro.variable} font-sans antialiased bg-background min-h-screen flex flex-col`}
        suppressHydrationWarning
      >

        <NavFooterToggle>{children}</NavFooterToggle>
      </body>
    </html>
  );
}
