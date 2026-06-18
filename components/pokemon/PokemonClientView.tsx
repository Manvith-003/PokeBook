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
import { motion } from "framer-motion";

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
    <div className="flex flex-col gap-3 max-w-[90rem] mx-auto w-full pb-4">
      
      {/* Navigation */}
      <div className="flex w-full">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--card)] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors border border-slate-200 dark:border-slate-800 shadow-sm text-slate-700 dark:text-slate-300 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to PokéBook</span>
        </Link>
      </div>

      {/* Top Section - 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Col: Image & Identity (Span 4) */}
        <div 
          className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden flex flex-col items-center p-6"
        >
          {/* Top Section Color Background */}
          <div className="absolute top-0 left-0 right-0 h-[60%] rounded-b-[2rem] overflow-hidden">
            <div 
              className="absolute inset-0 opacity-15 dark:opacity-25"
              style={{ backgroundColor: `var(--type-${mainType})` }}
            />
            {/* Spinning Pokeball watermark */}
            <svg
              className="absolute -right-12 -bottom-12 w-56 h-56 opacity-[0.03] dark:opacity-5 text-slate-900 dark:text-white animate-[spin_20s_linear_infinite]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M50 0C22.4 0 0 22.4 0 50c0 27.6 22.4 50 50 50 27.6 0 50-22.4 50-50C100 22.4 77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50H35c0 8.3 6.7 15 15 15s15-6.7 15-15h25c0 22.1-17.9 40-40 40zM50 60c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10zm40-15H65c0-8.3-6.7-15-15-15s-15 6.7-15 15H10C10 27.9 27.9 10 50 10s40 17.9 40 40z" />
            </svg>
          </div>
          
          <div 
            className="absolute top-4 left-6 text-2xl font-black opacity-80 tracking-widest pointer-events-none z-20"
            style={{ color: `var(--type-${mainType})` }}
          >
            #{formattedId}
          </div>
          <button 
            onClick={toggleFavorite} 
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/50 hover:bg-white/80 dark:bg-black/20 dark:hover:bg-black/40 backdrop-blur-md transition-all shadow-sm border border-white/20 dark:border-black/20"
          >
            <Heart className={cn("w-5 h-5", favorite ? "fill-red-500 text-red-500" : "text-slate-400")} />
          </button>

          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-56 h-56 relative mt-6 mb-4 z-10 drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform duration-500"
          >
            <Image src={frontSprite} alt={pokemon.name} fill className="object-contain" />
          </motion.div>
          
          <h1 className="text-3xl lg:text-4xl font-black capitalize mb-3 relative z-10 text-center tracking-tight text-[var(--foreground)] mt-0">
            {pokemon.name.replace(/-/g, " ")}
          </h1>
          
          <div className="flex gap-2 mb-4 relative z-10">
            {pokemon.types.map((t: any) => (
              <TypeBadge key={t.type.name} type={t.type.name} className="shadow-sm" />
            ))}
          </div>

          <div className="flex w-[90%] mb-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl relative z-10 mt-auto shadow-inner">
            <button 
              onClick={() => setIsShiny(false)}
              className={cn("flex-1 py-2 rounded-lg text-xs font-bold transition-all", !isShiny ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700/50")}
            >
              Normal
            </button>
            <button 
              onClick={() => setIsShiny(true)}
              className={cn("flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5", isShiny ? "bg-yellow-500 text-white shadow-sm" : "text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700/50")}
            >
              Shiny <Sparkles className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Middle Col: Physical Info & Strengths/Weaknesses (Span 4) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-4">
          <div className="relative mb-0 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="absolute -top-2 left-3 text-4xl text-slate-300 dark:text-slate-700 font-serif leading-none pointer-events-none">"</span>
            <p 
              className="relative z-10 text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed text-center"
              style={{ fontFamily: "var(--font-lora), serif" }}
            >
              {flavorText}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Height</span>
              <span className="font-black text-lg text-slate-800 dark:text-slate-100">{pokemon.height / 10} m</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Weight</span>
              <span className="font-black text-lg text-slate-800 dark:text-slate-100">{pokemon.weight / 10} kg</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center col-span-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Abilities</span>
              <div className="flex gap-2 justify-center mt-1">
                {pokemon.abilities.map((a: any) => (
                  <span key={a.ability.name} className="font-bold text-xs bg-white dark:bg-slate-900 px-3 py-1 rounded-full shadow-sm border border-slate-100 dark:border-slate-800 capitalize flex items-center gap-1">
                    {a.ability.name.replace("-", " ")} {a.is_hidden && <span className="text-[9px] text-amber-500 font-black"><Sparkles className="w-3 h-3"/></span>}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end gap-3 mt-2">
            {weaknessesList.length > 0 && (
              <div>
                <h3 className="text-xs font-bold mb-1.5 text-red-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Weaknesses
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {weaknessesList.map(([type, mult]) => (
                    <TypeBadge key={type} type={type} suffix={`x${mult}`} className="px-2 py-0.5 text-[9px] shadow-none" />
                  ))}
                </div>
              </div>
            )}
            
            {resistancesList.length > 0 && (
              <div>
                <h3 className="text-xs font-bold mb-1.5 text-green-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Resistances
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {resistancesList.map(([type, mult]) => (
                    <TypeBadge key={type} type={type} suffix={`x${mult === 0.5 ? "1/2" : "1/4"}`} className="px-2 py-0.5 text-[9px] shadow-none" />
                  ))}
                </div>
              </div>
            )}

            {immunitiesList.length > 0 && (
              <div>
                <h3 className="text-xs font-bold mb-1.5 text-slate-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500" /> Immunities
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {immunitiesList.map(([type]) => (
                    <TypeBadge key={type} type={type} suffix="x0" className="px-2 py-0.5 text-[9px] shadow-none" />
                  ))}
                </div>
              </div>
            )}

            {strengths.size > 0 && (
              <div>
                <h3 className="text-xs font-bold mb-1.5 text-blue-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Strengths
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from(strengths).map(type => (
                    <TypeBadge key={type} type={type} suffix="x2" className="px-2 py-0.5 text-[9px] shadow-none" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Base Stats (Span 4) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col">
          <h2 className="text-lg font-black mb-4 flex items-center gap-2 text-slate-800 dark:text-slate-100 uppercase tracking-widest">
            <BarChart3 className="w-4 h-4 text-indigo-500" /> Base Stats
          </h2>
          <div className="flex flex-col flex-1 justify-center gap-3">
            {pokemon.stats.map((stat: any) => (
              <StatBar key={stat.stat.name} label={stat.stat.name.replace("special-", "sp. ")} value={stat.base_stat} />
            ))}
            <div className="mt-3 pt-3 border-t-2 border-dashed border-slate-200 dark:border-slate-800 flex justify-between items-center font-black">
              <span className="text-slate-500 uppercase tracking-widest text-xs">Total Stats</span>
              <span className="text-2xl text-slate-800 dark:text-slate-100">{pokemon.stats.reduce((acc: number, curr: any) => acc + curr.base_stat, 0)}</span>
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
