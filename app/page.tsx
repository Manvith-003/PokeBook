import Link from "next/link";
import { Search } from "lucide-react";
import { fetchPokemonList, fetchRegions, fetchRegionByName, fetchPokedexByUrl } from "@/lib/api";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { RegionPokemonList } from "@/components/pokemon/RegionPokemonList";
import { cn } from "@/lib/utils";
import PokemonListClient from "@/app/pokemon/PokemonListClient";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>;
}) {
  const { region } = await searchParams;
  const regionsData = await fetchRegions();

  let displayedPokemon = [];
  let popularData = null;
  let title = "Popular Pokémon";
  
  if (region) {
    try {
      const regionData = await fetchRegionByName(region);
      const generationUrl = regionData.main_generation?.url;
      
      if (generationUrl) {
        const res = await fetch(generationUrl);
        if (res.ok) {
          const generationData = await res.json();
          let species = generationData.pokemon_species;
          
          // Sort them properly by ID since the generation endpoint doesn't guarantee order
          species.sort((a: any, b: any) => {
            const idA = parseInt(a.url.split('/').filter(Boolean).pop() || "0", 10);
            const idB = parseInt(b.url.split('/').filter(Boolean).pop() || "0", 10);
            return idA - idB;
          });
          
          displayedPokemon = species.map((s: any) => ({ name: s.name }));
        }
      } else {
        const mainPokedexUrl = regionData.pokedexes[0]?.url;
        if (mainPokedexUrl) {
          const pokedexData = await fetchPokedexByUrl(mainPokedexUrl);
          displayedPokemon = pokedexData.pokemon_entries.map((e: any) => ({
            name: e.pokemon_species.name
          }));
        }
      }
      title = `${region.charAt(0).toUpperCase() + region.slice(1)} Region Pokémon`;
    } catch (e) {
      // Fallback if region fails
      popularData = await fetchPokemonList(20, 0);
      displayedPokemon = popularData.results;
    }
  } else {
    popularData = await fetchPokemonList(20, 0);
    displayedPokemon = popularData.results;
  }

  return (
    <div className="flex flex-col gap-12 pb-16 pt-8">
      {/* Main Content Area */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-start">
        
        {/* Left Side - Regions Sidebar */}
        <aside className="w-full md:w-64 lg:w-80 flex-shrink-0 sticky top-24">
          <div className="bg-[var(--card)] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
              Filter by Region
              {region && (
                <Link href="/" className="text-xs text-red-500 hover:underline font-normal">
                  Clear
                </Link>
              )}
            </h3>
            
            <div className="flex flex-col gap-1.5">
              {regionsData.results.slice(0, 10).map((r: any) => {
                const isActive = region === r.name;
                return (
                  <Link 
                    key={r.name} 
                    href={isActive ? "/" : `/?region=${r.name}`}
                    className={cn(
                      "px-4 py-2 text-sm rounded-xl capitalize font-bold transition-colors border",
                      isActive 
                        ? "bg-red-500 text-white border-red-500" 
                        : "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-100 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-900"
                    )}
                  >
                    {r.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Side - Pokemon Grid */}
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">{title}</h2>
            {!region && (
              <Link href="/pokemon" className="text-red-500 hover:text-red-600 font-medium whitespace-nowrap ml-4">
                View All →
              </Link>
            )}
          </div>
          
          {region ? (
            displayedPokemon.length > 0 ? (
              <RegionPokemonList pokemonList={displayedPokemon} />
            ) : (
              <div className="w-full py-12 text-center text-slate-500 bg-[var(--card)] rounded-2xl border border-slate-200 dark:border-slate-800">
                No Pokémon found in this region.
              </div>
            )
          ) : (
            <PokemonListClient initialData={popularData} hideFilters={true} />
          )}
        </div>

      </div>
    </div>
  );
}