"use client";

import Link from "next/link";
import { Search, Heart, Layers, BookOpen } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/pokemon/${search.trim().toLowerCase()}`);
      setSearch("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-2 md:px-4 h-16 flex items-center justify-between gap-2 md:gap-4">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
            <div className="w-8 h-4 bg-red-500 rounded-t-full border-b-2 border-black" />
            <div className="w-8 h-4 bg-white rounded-b-full border-t-2 border-black absolute mt-4" />
            <div className="w-3 h-3 bg-white rounded-full border-2 border-black absolute" />
          </div>
          <span className="text-xl font-bold hidden sm:inline-block text-[var(--foreground)]">
            PokéBook
          </span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 md:pl-10 pr-3 md:pr-4 rounded-full bg-slate-100 dark:bg-slate-900 border-none focus:ring-2 focus:ring-primary outline-none transition-shadow text-sm"
          />
        </form>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <Link 
            href="/guides" 
            className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-[var(--foreground)]"
            title="Guides"
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-sm font-medium hidden lg:inline-block">Guides</span>
          </Link>
          <Link 
            href="/types" 
            className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-[var(--foreground)]"
            title="Types"
          >
            <Layers className="w-5 h-5" />
            <span className="text-sm font-medium hidden lg:inline-block">Types</span>
          </Link>
          <Link 
            href="/favorites" 
            className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-[var(--foreground)]"
            title="Favorites"
          >
            <Heart className="w-5 h-5" />
            <span className="text-sm font-medium hidden lg:inline-block">Favorites</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
