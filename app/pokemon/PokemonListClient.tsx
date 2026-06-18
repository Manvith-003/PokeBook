"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchPokemonList, fetchTypeByName } from "@/lib/api";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { TYPE_COLORS } from "@/components/ui/TypeBadge";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Search } from "lucide-react";

export default function PokemonListClient({ 
  initialData, 
  hideFilters = false 
}: { 
  initialData: any;
  hideFilters?: boolean;
}) {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialType = searchParams.get("filterType") || "All Types";
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedType, setSelectedType] = useState(initialType);
  const [sortBy, setSortBy] = useState("Lowest ID");
  
  const TYPES = Object.keys(TYPE_COLORS).map(
    (t) => t.charAt(0).toUpperCase() + t.slice(1)
  );

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

  const { data: typeData, isLoading: isTypeLoading } = useQuery({
    queryKey: ["pokemonType", selectedType],
    queryFn: () => fetchTypeByName(selectedType.toLowerCase()),
    enabled: selectedType !== "All Types",
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(loadMoreRef, { once: false, margin: "200px" });

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage && !searchTerm && selectedType === "All Types") {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage, searchTerm, selectedType]);

  // Determine the base list based on type filter
  let allPokemon = [];
  if (selectedType === "All Types") {
    allPokemon = data?.pages.flatMap((page) => page.results) || [];
  } else {
    allPokemon = typeData?.pokemon.map((p: any) => p.pokemon) || [];
  }

  // Filter by search term
  let filteredPokemon = allPokemon.filter((p: any) => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply Sorting
  const getId = (url: string) => parseInt(url.split("/").filter(Boolean).pop() || "0", 10);
  
  filteredPokemon.sort((a: { name: string; url: string }, b: { name: string; url: string }) => {
    if (sortBy === "Lowest ID") {
      return getId(a.url) - getId(b.url);
    } else if (sortBy === "A to Z") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "Z to A") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Filters & Search Bar */}
      {!hideFilters && (
        <div className="flex flex-col md:flex-row gap-3 max-w-4xl mx-auto w-full mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search Pokémon by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-red-500 outline-none shadow-sm text-base md:text-lg"
            />
          </div>
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="h-14 px-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium text-slate-700 dark:text-slate-300 md:min-w-[140px]"
          >
            <option value="All Types">All Types</option>
            {TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-14 px-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium text-slate-700 dark:text-slate-300 md:min-w-[140px]"
          >
            <option value="Lowest ID">Lowest ID</option>
            <option value="A to Z">A to Z</option>
            <option value="Z to A">Z to A</option>
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>

      {/* Infinite Scroll Trigger */}
      {!searchTerm && selectedType === "All Types" && hasNextPage && (
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
      
      {/* Loading state for Type filtering */}
      {isTypeLoading && (
         <div className="w-full h-40 flex items-center justify-center mt-8">
           <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
         </div>
      )}
    </div>
  );
}
