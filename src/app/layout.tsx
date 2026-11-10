import type { Metadata } from "next";
import { Geist_Mono, Outfit, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteNavFallback } from "@/components/site-nav-fallback";
import "./globals.css";
const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    default: "Rick and Morty · Episódios",
    template: "%s · Rick and Morty",
  },
  description:
    "Busque um episódio de Rick and Morty e veja os personagens que aparecem nele.",
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${outfit.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="app-shell flex min-h-full flex-col bg-background text-foreground">
        <Suspense fallback={<SiteNavFallback />}>
          <SiteNav />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
