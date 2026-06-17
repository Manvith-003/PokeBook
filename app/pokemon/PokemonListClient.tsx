"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "@/lib/api";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search } from "lucide-react";
import { useState } from "react";

export default function PokemonListClient({ 
  initialData, 
  hideFilters = false 
}: { 
  initialData: any;
  hideFilters?: boolean;
}) {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: async ({ pageParam = 0 }) => {
      return fetchPokemonList(20, pageParam);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) return undefined;
      return allPages.length * 20;
    },
    initialData: {
      pages: [initialData],
      pageParams: [0],
    },
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(loadMoreRef, { once: false, margin: "200px" });

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage && !searchTerm) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage, searchTerm]);

  // Flatten the pages into a single array
  const allPokemon = data?.pages.flatMap((page) => page.results) || [];

  // Very basic client-side filtering (Note: only filters currently loaded pages)
  const filteredPokemon = allPokemon.filter((p) => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Filters & Search Bar */}
      {!hideFilters && (
        <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Filter loaded Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>
        {/* Placeholder for complex filters */}
        <select className="h-12 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none">
          <option>All Types</option>
          <option>Fire</option>
          <option>Water</option>
          <option>Grass</option>
        </select>
        <select className="h-12 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none">
          <option>Sort by ID</option>
          <option>Name A-Z</option>
          <option>Name Z-A</option>
        </select>
      </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>

      {/* Infinite Scroll Trigger */}
      {!searchTerm && hasNextPage && (
        <div ref={loadMoreRef} className="w-full h-20 flex items-center justify-center mt-8">
          {isFetchingNextPage ? (
            <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <button 
              onClick={() => fetchNextPage()}
              className="px-6 py-2 bg-slate-100 dark:bg-slate-800 rounded-full font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
}
