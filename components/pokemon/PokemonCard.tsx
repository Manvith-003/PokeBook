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
      whileHover={{ y: -8, scale: 1.02 }}
      className="h-full"
    >
      <Link href={`/pokemon/${name}`} className="group relative block w-full h-full bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-700 transition-all overflow-hidden flex flex-col">
        
        {/* Colorful top section for the image */}
        <div className="relative w-full h-44 flex items-center justify-center p-4">
          {/* Background tint based on type */}
          <div 
            className="absolute inset-0 opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity"
            style={{ backgroundColor: `var(--type-${mainType})` }}
          />
          
          {/* Pokeball watermark */}
          <svg
            className="absolute -right-6 -bottom-6 w-36 h-36 opacity-[0.04] dark:opacity-10 text-slate-900 dark:text-white transform group-hover:rotate-12 transition-transform duration-500"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path d="M50 0C22.4 0 0 22.4 0 50c0 27.6 22.4 50 50 50 27.6 0 50-22.4 50-50C100 22.4 77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50H35c0 8.3 6.7 15 15 15s15-6.7 15-15h25c0 22.1-17.9 40-40 40zM50 60c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10zm40-15H65c0-8.3-6.7-15-15-15s-15 6.7-15 15H10C10 27.9 27.9 10 50 10s40 17.9 40 40z" />
          </svg>

          {/* ID Badge - Hide for forms with IDs > 10000 since they aren't true pokedex numbers */}
          {pokemon.id < 10000 && (
            <span 
              className="absolute top-4 left-4 text-sm font-black opacity-80"
              style={{ color: `var(--type-${mainType})` }}
            >
              #{formattedId}
            </span>
          )}
          
          {/* Favorite Button */}
          <button 
            onClick={toggleFavorite}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 backdrop-blur-sm transition-colors"
          >
            <Heart className={cn("w-5 h-5", favorite ? "fill-red-500 text-red-500" : "text-slate-500 dark:text-slate-400")} />
          </button>

          {/* Image */}
          <div className="relative z-10 w-32 h-32 group-hover:scale-125 transition-transform duration-500 drop-shadow-xl">
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        {/* Bottom section with Name and Types */}
        <div className="p-5 flex flex-col items-center justify-center flex-1 relative z-20">
          <h2 className="text-lg font-extrabold capitalize mb-3 text-[var(--foreground)] group-hover:text-red-500 transition-colors text-center line-clamp-2">
            {pokemon.name.replace(/-/g, " ")}
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
