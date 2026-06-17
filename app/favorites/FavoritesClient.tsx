"use client";

import { useFavorites } from "@/store/useFavorites";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export default function FavoritesClient() {
  const { favorites } = useFavorites();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (favorites.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
        <div className="w-24 h-24 bg-red-50 dark:bg-red-950/30 rounded-full flex items-center justify-center mb-6">
          <Heart className="w-12 h-12 text-red-300 dark:text-red-900/50" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8">
          You haven't saved any Pokémon to your favorites. Explore the Pokédex and click the heart icon to save some!
        </p>
        <Link 
          href="/pokemon" 
          className="px-6 py-3 bg-red-500 hover:bg-red-600 transition-colors text-white rounded-full font-medium"
        >
          Explore Pokémon
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {favorites.map((name) => (
        <PokemonCard key={name} name={name} />
      ))}
    </div>
  );
}
