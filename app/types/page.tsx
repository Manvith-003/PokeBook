import { fetchTypes } from "@/lib/api";
import { TypeCard } from "@/components/ui/TypeCard";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Pokémon Types | PokéBook",
  description: "Browse all Pokémon types in the PokéBook database",
};

export default async function TypesPage() {
  const typesData = await fetchTypes();
  const validTypes = typesData.results.filter(
    (t: any) => t.name !== "unknown" && t.name !== "shadow"
  );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container mx-auto px-4 py-8">
        <div className="relative max-w-5xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-center">
          <div className="w-full md:absolute md:left-0 md:top-0 mb-6 md:mb-0 flex justify-start">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors border border-slate-200 dark:border-slate-800 shadow-sm text-slate-700 dark:text-slate-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center px-4 py-1 mb-6 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                19 Elemental Types
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white">
              Pokémon Types
            </h1>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {validTypes.map((type: any) => (
            <TypeCard 
              key={type.name} 
              type={type.name} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
