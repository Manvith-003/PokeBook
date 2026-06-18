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
    
    // Instead of using the regional pokedex (which contains pokemon from older regions like Pidgey in Johto),
    // we use the main_generation to strictly get the Pokemon introduced in this specific region.
    const generationUrl = region.main_generation?.url;
    
    let pokemonSpecies = [];
    if (generationUrl) {
      const res = await fetch(generationUrl);
      if (res.ok) {
        const generationData = await res.json();
        pokemonSpecies = generationData.pokemon_species;
        
        // PokeAPI's generation species list is not ordered by ID by default. We must sort it.
        pokemonSpecies.sort((a: any, b: any) => {
          const idA = parseInt(a.url.split('/').filter(Boolean).pop() || "0", 10);
          const idB = parseInt(b.url.split('/').filter(Boolean).pop() || "0", 10);
          return idA - idB;
        });
      }
    } else {
      // Fallback to pokedex if generation is missing
      const mainPokedexUrl = region.pokedexes[0]?.url;
      if (mainPokedexUrl) {
        const pokedexData = await fetchPokedexByUrl(mainPokedexUrl);
        pokemonSpecies = pokedexData.pokemon_entries.map((entry: any) => entry.pokemon_species);
      }
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black capitalize mb-4 text-[var(--foreground)] text-red-500">
            {region.name} Region
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Explore the {pokemonSpecies.length} Pokémon native to the {region.name} region.
          </p>
        </div>

        {pokemonSpecies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {pokemonSpecies.map((species: any) => (
              <PokemonCard key={species.name} name={species.name} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            No PokéBook data available for this region.
          </div>
        )}
      </div>
    );
  } catch (error) {
    notFound();
  }
}
