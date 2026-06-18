import { Suspense } from "react";
import PokemonListClient from "./PokemonListClient";
import { fetchPokemonList } from "@/lib/api";

export default async function PokemonPage() {
  const initialData = await fetchPokemonList(20, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <div className="inline-flex items-center justify-center px-4 py-1 mb-6 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Complete Pokédex
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white">
          Pokémon Database
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Search, filter, and discover every Pokémon in the universe.
        </p>
      </div>

      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
        <PokemonListClient initialData={initialData} />
      </Suspense>
    </div>
  );
}
