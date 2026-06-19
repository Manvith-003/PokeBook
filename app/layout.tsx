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
          <footer className="border-t bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 py-8 mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <div>
                &copy; {new Date().getFullYear()} PokéBook. All rights reserved.
              </div>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <a href="/about" className="hover:text-primary transition-colors">About Us</a>
                <a href="/contact" className="hover:text-primary transition-colors">Contact Us</a>
                <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a>
                <a href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</a>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
