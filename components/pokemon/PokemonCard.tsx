"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPokemonByName } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { useFavorites } from "@/store/useFavorites";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PokemonCardProps {
  name: string;
}

export function PokemonCard({ name }: PokemonCardProps) {
  const { data: pokemon, isLoading } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemonByName(name),
  });
  
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(name);

  if (isLoading || !pokemon) {
    return (
      <div className="w-full h-64 bg-[var(--card)] rounded-xl animate-pulse shadow-sm"></div>
    );
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorite) removeFavorite(name);
    else addFavorite(name);
  };

  const formattedId = String(pokemon.id).padStart(4, "0");
  const mainType = pokemon.types[0].type.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/pokemon/${name}`} className="group relative block w-full bg-[var(--card)] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-24 opacity-30 dark:opacity-20 transition-colors"
          style={{ backgroundColor: `var(--type-${mainType})` }}
        />
        
        <button 
          onClick={toggleFavorite}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 transition-colors"
        >
          <Heart className={cn("w-5 h-5", favorite ? "fill-red-500 text-red-500" : "text-slate-500")} />
        </button>

        <div className="p-4 relative z-10 flex flex-col items-center">
          <span className="self-start text-xs font-bold text-slate-400">#{formattedId}</span>
          
          <div className="w-32 h-32 relative mb-4 group-hover:scale-110 transition-transform duration-300">
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          <h2 className="text-xl font-bold capitalize mb-3 text-[var(--card-foreground)]">
            {pokemon.name}
          </h2>
          
          <div className="flex gap-2">
            {pokemon.types.map((t: any) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
