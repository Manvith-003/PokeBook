import { Suspense } from "react";
import PokemonListClient from "./PokemonListClient";
import { fetchPokemonList } from "@/lib/api";

export default async function PokemonPage() {
  const initialData = await fetchPokemonList(20, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-[var(--foreground)]">Pokémon Database</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Browse, filter, and discover all Pokémon.
        </p>
      </div>

      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
        <PokemonListClient initialData={initialData} />
      </Suspense>
    </div>
  );
}
