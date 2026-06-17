import { notFound } from "next/navigation";
import { fetchRegionByName, fetchPokedexByUrl } from "@/lib/api";
import { PokemonCard } from "@/components/pokemon/PokemonCard";

export default async function RegionPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  
  try {
    const region = await fetchRegionByName(name);
    
    // Fetch the main pokedex for this region
    // Some regions have multiple pokedexes, we'll pick the first one for simplicity
    const mainPokedexUrl = region.pokedexes[0]?.url;
    
    let pokedexEntries = [];
    if (mainPokedexUrl) {
      const pokedexData = await fetchPokedexByUrl(mainPokedexUrl);
      pokedexEntries = pokedexData.pokemon_entries;
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black capitalize mb-4 text-[var(--foreground)] text-red-500">
            {region.name} Region
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Explore the {pokedexEntries.length} Pokémon native to the {region.name} region.
          </p>
        </div>

        {pokedexEntries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {pokedexEntries.map((entry: any) => {
              // The pokedex entry has pokemon_species. We'll use the species name as it usually matches the default pokemon name.
              const pokemonName = entry.pokemon_species.name;
              return <PokemonCard key={pokemonName} name={pokemonName} />;
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            No Pokédex data available for this region.
          </div>
        )}
      </div>
    );
  } catch (error) {
    notFound();
  }
}
