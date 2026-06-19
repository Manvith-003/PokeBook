"use client";

import { useState, useRef, useEffect } from "react";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { useInView } from "framer-motion";

interface RegionPokemonListProps {
  pokemonList: { name: string }[];
}

export function RegionPokemonList({ pokemonList }: RegionPokemonListProps) {
  const [displayCount, setDisplayCount] = useState(24);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(loadMoreRef, { once: false, margin: "200px" });

  useEffect(() => {
    if (isInView && displayCount < pokemonList.length) {
      setDisplayCount((prev) => Math.min(prev + 24, pokemonList.length));
    }
  }, [isInView, displayCount, pokemonList.length]);

  const displayedPokemon = pokemonList.slice(0, displayCount);
  const hasMore = displayCount < pokemonList.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {displayedPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>

      {hasMore && (
        <div ref={loadMoreRef} className="w-full h-20 flex items-center justify-center mt-8">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
