"use client";

import { useState } from "react";
import Image from "next/image";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { StatBar } from "@/components/ui/StatBar";
import { Heart } from "lucide-react";
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

  // Process strengths and weaknesses from typeDetails
  const doubleDamageFrom = new Set<string>();
  const doubleDamageTo = new Set<string>();
  const halfDamageFrom = new Set<string>();

  typeDetails.forEach((typeInfo) => {
    typeInfo.damage_relations.double_damage_from.forEach((t: any) => doubleDamageFrom.add(t.name));
    typeInfo.damage_relations.double_damage_to.forEach((t: any) => doubleDamageTo.add(t.name));
    typeInfo.damage_relations.half_damage_from.forEach((t: any) => halfDamageFrom.add(t.name));
    typeInfo.damage_relations.no_damage_from.forEach((t: any) => halfDamageFrom.add(t.name));
  });

  // Remove overlapping weaknesses/resistances (simplified logic)
  halfDamageFrom.forEach(type => doubleDamageFrom.delete(type));

  const flavorText = species.flavor_text_entries.find((f: any) => f.language.name === "en")?.flavor_text.replace(/\f/g, " ");

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full pb-16">
      {/* Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-[var(--card)] border border-slate-200 dark:border-slate-800 shadow-sm p-8">
        <div 
          className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none transition-colors"
          style={{ backgroundColor: `var(--type-${mainType})` }}
        />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="relative w-64 h-64 mb-4">
              <Image src={frontSprite} alt={pokemon.name} fill className="object-contain drop-shadow-2xl" />
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsShiny(false)}
                className={cn("px-4 py-2 rounded-full font-medium transition-colors", !isShiny ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800")}
              >
                Normal
              </button>
              <button 
                onClick={() => setIsShiny(true)}
                className={cn("px-4 py-2 rounded-full font-medium transition-colors", isShiny ? "bg-yellow-500 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800")}
              >
                Shiny ✨
              </button>
            </div>
          </div>

          <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-xl font-bold text-slate-400">#{formattedId}</span>
              <button onClick={toggleFavorite} className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
                <Heart className={cn("w-8 h-8 transition-colors", favorite ? "fill-red-500 text-red-500" : "text-slate-300")} />
              </button>
            </div>
            
            <h1 className="text-5xl font-black capitalize mb-4 text-[var(--foreground)]">{pokemon.name}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
              {pokemon.types.map((t: any) => (
                <TypeBadge key={t.type.name} type={t.type.name} className="px-4 py-2 text-sm" />
              ))}
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 italic max-w-2xl">
              "{flavorText}"
            </p>

            <div className="grid grid-cols-2 gap-4 w-full md:w-auto bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-sm text-slate-500 block mb-1">Height</span>
                <span className="font-semibold text-lg">{pokemon.height / 10} m</span>
              </div>
              <div>
                <span className="text-sm text-slate-500 block mb-1">Weight</span>
                <span className="font-semibold text-lg">{pokemon.weight / 10} kg</span>
              </div>
              <div>
                <span className="text-sm text-slate-500 block mb-1">Abilities</span>
                <div className="flex flex-col">
                  {pokemon.abilities.map((a: any) => (
                    <span key={a.ability.name} className="font-semibold capitalize text-sm">
                      {a.ability.name.replace("-", " ")} {a.is_hidden && <span className="text-xs text-slate-400">(Hidden)</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm text-slate-500 block mb-1">Base Exp</span>
                <span className="font-semibold text-lg">{pokemon.base_experience}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Stats */}
        <div className="bg-[var(--card)] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Base Stats</h2>
          <div className="flex flex-col gap-4">
            {pokemon.stats.map((stat: any) => (
              <StatBar key={stat.stat.name} label={stat.stat.name.replace("special-", "sp. ")} value={stat.base_stat} />
            ))}
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="bg-[var(--card)] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4 text-red-500">Weaknesses (2x)</h2>
            <div className="flex flex-wrap gap-2">
              {Array.from(doubleDamageFrom).map(type => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4 text-green-500">Strengths (2x)</h2>
            <div className="flex flex-wrap gap-2">
              {Array.from(doubleDamageTo).map(type => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
