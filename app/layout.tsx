import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["italic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    default: "PokéBook",
    template: "%s | PokéBook"
  },
  description: "A modern, responsive Pokémon database built with Next.js",
  keywords: ["Pokemon", "Pokedex", "Next.js", "React", "Tailwind CSS", "Pokemon Database", "Pokemon Stats", "Pikachu", "Charizard"],
  authors: [{ name: "PokéBook Developer" }],
  openGraph: {
    title: "PokéBook",
    description: "A modern, responsive Pokémon database built with Next.js",
    url: '/',
    siteName: 'PokéBook',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PokéBook',
    description: 'A modern, responsive Pokémon database built with Next.js',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Providers>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
