"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonByName } from "@/lib/api";
import Image from "next/image";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { Search } from "lucide-react";

export default function CompareClient() {
  const [pokemon1Name, setPokemon1Name] = useState("charizard");
  const [pokemon2Name, setPokemon2Name] = useState("blastoise");

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const { data: p1, isLoading: p1Loading } = useQuery({
    queryKey: ["pokemon", pokemon1Name],
    queryFn: () => fetchPokemonByName(pokemon1Name),
  });

  const { data: p2, isLoading: p2Loading } = useQuery({
    queryKey: ["pokemon", pokemon2Name],
    queryFn: () => fetchPokemonByName(pokemon2Name),
  });

  const handleSearch1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (input1.trim()) setPokemon1Name(input1.trim().toLowerCase());
  };

  const handleSearch2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (input2.trim()) setPokemon2Name(input2.trim().toLowerCase());
  };

  const renderPokemonCol = (
    pokemon: any, 
    isLoading: boolean, 
    inputVal: string, 
    setInputVal: (v: string) => void, 
    handleSearch: (e: React.FormEvent) => void
  ) => (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <form onSubmit={handleSearch} className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-red-500 outline-none"
        />
      </form>

      {isLoading || !pokemon ? (
        <div className="w-full h-[500px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />
      ) : (
        <div className="bg-[var(--card)] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
          <div className="relative w-48 h-48 mb-4">
            <Image 
              src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default} 
              alt={pokemon.name} 
              fill 
              className="object-contain" 
            />
          </div>
          <h2 className="text-3xl font-bold capitalize mb-4">{pokemon.name}</h2>
          
          <div className="flex gap-2 mb-6">
            {pokemon.types.map((t: any) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>

          <div className="w-full space-y-4">
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-slate-500">Height</span>
              <span className="font-medium">{pokemon.height / 10} m</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-slate-500">Weight</span>
              <span className="font-medium">{pokemon.weight / 10} kg</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-slate-500">Base Exp</span>
              <span className="font-medium">{pokemon.base_experience}</span>
            </div>

            <div className="pt-4 space-y-3">
              <h3 className="font-bold text-lg text-center mb-2">Base Stats</h3>
              {pokemon.stats.map((stat: any) => (
                <div key={stat.stat.name} className="flex flex-col gap-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 capitalize">{stat.stat.name.replace("special-", "sp. ")}</span>
                    <span className="font-mono font-medium">{stat.base_stat}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500 rounded-full" 
                      style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-8 md:gap-16">
      {renderPokemonCol(p1, p1Loading, input1, setInput1, handleSearch1)}
      
      <div className="hidden md:flex flex-col items-center justify-center self-stretch opacity-20">
        <div className="w-px h-full bg-slate-900 dark:bg-white" />
        <div className="w-12 h-12 rounded-full border border-slate-900 dark:border-white flex items-center justify-center bg-[var(--background)] z-10 font-bold text-xl my-4">
          VS
        </div>
        <div className="w-px h-full bg-slate-900 dark:bg-white" />
      </div>

      {renderPokemonCol(p2, p2Loading, input2, setInput2, handleSearch2)}
    </div>
  );
}
