import type { Metadata } from "next";
import { Syne, Literata } from "next/font/google";
import { SITE } from "@/data/ventures";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.overview,
  icons: {
    icon: "/logos/nvg.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${literata.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
