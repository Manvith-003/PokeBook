"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { StatBar } from "@/components/ui/StatBar";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { Heart, ArrowLeft, Sparkles, BarChart3, Dna, Layers } from "lucide-react";
import { useFavorites } from "@/store/useFavorites";
import { cn } from "@/lib/utils";

export default function PokemonClientView({ 
  pokemon, 
  species, 
  evolution, 
  typeDetails 
}: { 
  pokemon: any; 
  species: any; 
  evolution: any; 
  typeDetails: any[];
}) {
  const [isShiny, setIsShiny] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(pokemon.name);

  const toggleFavorite = () => {
    if (favorite) removeFavorite(pokemon.name);
    else addFavorite(pokemon.name);
  };

  const frontSprite = isShiny 
    ? pokemon.sprites.other["official-artwork"].front_shiny || pokemon.sprites.front_shiny
    : pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;

  const formattedId = String(pokemon.id).padStart(4, "0");
  const mainType = pokemon.types[0].type.name;

  const typeMultipliers: Record<string, number> = {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
    fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1,
    rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 1, fairy: 1
  };

  const strengths = new Set<string>();

  typeDetails.forEach((typeInfo) => {
    // Defensive
    typeInfo.damage_relations.double_damage_from.forEach((t: any) => typeMultipliers[t.name] *= 2);
    typeInfo.damage_relations.half_damage_from.forEach((t: any) => typeMultipliers[t.name] *= 0.5);
    typeInfo.damage_relations.no_damage_from.forEach((t: any) => typeMultipliers[t.name] *= 0);

    // Offensive
    typeInfo.damage_relations.double_damage_to.forEach((t: any) => strengths.add(t.name));
  });

  const weaknessesList = Object.entries(typeMultipliers).filter(([, mult]) => mult > 1);
  const resistancesList = Object.entries(typeMultipliers).filter(([, mult]) => mult > 0 && mult < 1);
  const immunitiesList = Object.entries(typeMultipliers).filter(([, mult]) => mult === 0);

  const flavorText = species.flavor_text_entries.find((f: any) => f.language.name === "en")?.flavor_text.replace(/\f/g, " ");

  // Parse Evolution Chain
  const evolutionChain: string[] = [];
  const traverseEvolution = (node: any) => {
    if (node?.species?.name) {
      evolutionChain.push(node.species.name);
    }
    if (node?.evolves_to?.length > 0) {
      node.evolves_to.forEach((childNode: any) => {
        traverseEvolution(childNode);
      });
    }
  };
  traverseEvolution(evolution?.chain);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-8">
      
      {/* Navigation */}
      <div className="flex w-full">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--card)] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors border border-slate-200 dark:border-slate-800 shadow-sm text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Pokédex</span>
        </Link>
      </div>

      {/* Top Section - 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Image & Basics */}
        <div className="bg-[var(--card)] rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none"
            style={{ backgroundColor: `var(--type-${mainType})` }}
          />
          <div 
            className="absolute top-4 left-5 text-2xl font-black opacity-40 mix-blend-overlay"
            style={{ color: `var(--type-${mainType})` }}
          >
            #{formattedId}
          </div>
          <button 
            onClick={toggleFavorite} 
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 transition-colors"
          >
            <Heart className={cn("w-6 h-6", favorite ? "fill-red-500 text-red-500" : "text-slate-400")} />
          </button>

          <div className="w-56 h-56 relative mb-2 mt-4 z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-500">
            <Image src={frontSprite} alt={pokemon.name} fill className="object-contain" />
          </div>
          
          <h1 className="text-4xl font-black capitalize mb-3 text-[var(--foreground)] relative z-10 text-center">
            {pokemon.name.replace(/-/g, " ")}
          </h1>
          
          <div className="flex gap-2 mb-6 relative z-10">
            {pokemon.types.map((t: any) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>

          <div className="flex gap-3 relative z-10 w-full">
            <button 
              onClick={() => setIsShiny(false)}
              className={cn("flex-1 py-2 rounded-xl text-sm font-bold transition-colors", !isShiny ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md" : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800")}
            >
              Normal
            </button>
            <button 
              onClick={() => setIsShiny(true)}
              className={cn("flex-1 py-2 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-1.5", isShiny ? "bg-yellow-500 text-white shadow-md" : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800")}
            >
              Shiny <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Middle Col: Physical Info & Strengths/Weaknesses */}
        <div className="bg-[var(--card)] rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-5">
          <p className="text-base text-slate-600 dark:text-slate-300 italic border-l-4 border-slate-200 dark:border-slate-700 pl-4">
            "{flavorText}"
          </p>

          <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs text-slate-500 block mb-0.5">Height</span>
              <span className="font-bold text-sm">{pokemon.height / 10} m</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block mb-0.5">Weight</span>
              <span className="font-bold text-sm">{pokemon.weight / 10} kg</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block mb-0.5">Base Exp</span>
              <span className="font-bold text-sm">{pokemon.base_experience}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block mb-0.5">Abilities</span>
              <div className="flex flex-col">
                {pokemon.abilities.map((a: any) => (
                  <span key={a.ability.name} className="font-bold capitalize text-sm">
                    {a.ability.name.replace("-", " ")} {a.is_hidden && <span className="text-[10px] text-slate-400 font-normal">(Hidden)</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end gap-5">
            {weaknessesList.length > 0 && (
              <div>
                <h3 className="text-sm font-bold mb-2 text-red-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Weaknesses
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {weaknessesList.map(([type, mult]) => (
                    <TypeBadge key={type} type={type} suffix={`x${mult}`} className="px-2 py-0.5 text-[10px] shadow-none" />
                  ))}
                </div>
              </div>
            )}
            
            {resistancesList.length > 0 && (
              <div>
                <h3 className="text-sm font-bold mb-2 text-green-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" /> Resistances
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {resistancesList.map(([type, mult]) => (
                    <TypeBadge key={type} type={type} suffix={`x${mult === 0.5 ? "1/2" : "1/4"}`} className="px-2 py-0.5 text-[10px] shadow-none" />
                  ))}
                </div>
              </div>
            )}

            {immunitiesList.length > 0 && (
              <div>
                <h3 className="text-sm font-bold mb-2 text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-500" /> Immunities
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {immunitiesList.map(([type]) => (
                    <TypeBadge key={type} type={type} suffix="x0" className="px-2 py-0.5 text-[10px] shadow-none" />
                  ))}
                </div>
              </div>
            )}

            {strengths.size > 0 && (
              <div>
                <h3 className="text-sm font-bold mb-2 text-blue-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> Strengths
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from(strengths).map(type => (
                    <TypeBadge key={type} type={type} suffix="x2" className="px-2 py-0.5 text-[10px] shadow-none" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Base Stats */}
        <div className="bg-[var(--card)] rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-500" /> Base Stats
          </h2>
          <div className="flex flex-col justify-between h-[calc(100%-2.5rem)] gap-2">
            {pokemon.stats.map((stat: any) => (
              <StatBar key={stat.stat.name} label={stat.stat.name.replace("special-", "sp. ")} value={stat.base_stat} />
            ))}
            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center font-bold">
              <span className="text-slate-500">Total</span>
              <span className="text-xl">{pokemon.stats.reduce((acc: number, curr: any) => acc + curr.base_stat, 0)}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Evolution Chain */}
      {evolutionChain.length > 1 && (
        <div className="bg-[var(--card)] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Dna className="w-5 h-5 text-green-500" /> Evolution Chain</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {evolutionChain.map((evoName) => (
              <div key={evoName}>
                <PokemonCard name={evoName} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Forms & Variants */}
      {species.varieties && species.varieties.length > 1 && (
        <div className="bg-[var(--card)] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Layers className="w-5 h-5 text-amber-500" /> Forms & Variants</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {species.varieties.filter((v: any) => !v.is_default && v.pokemon.name !== pokemon.name).map((v: any) => (
              <div key={v.pokemon.name}>
                <PokemonCard name={v.pokemon.name} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
