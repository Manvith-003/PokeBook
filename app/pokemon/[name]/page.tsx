import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPokemonByName, fetchPokemonSpecies, fetchEvolutionChain, fetchTypeByName } from "@/lib/api";
import PokemonClientView from "@/components/pokemon/PokemonClientView";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ name: string }> 
}): Promise<Metadata> {
  const { name } = await params;
  try {
    const pokemon = await fetchPokemonByName(name);
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
    const mainType = pokemon.types[0]?.type?.name || 'unknown';
    
    const title = `${capitalizedName} (#${String(pokemon.id).padStart(4, '0')})`;
    const description = `Learn all about ${capitalizedName}, a ${mainType}-type Pokémon. View stats, evolutions, abilities, and more in PokéBook.`;
    const image = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;

    return {
      title: capitalizedName,
      description,
      keywords: [capitalizedName, "Pokemon", mainType, "Pokedex", "Stats"],
      openGraph: {
        title,
        description,
        images: image ? [{ url: image, width: 475, height: 475, alt: capitalizedName }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: image ? [image] : [],
      },
    };
  } catch (error) {
    return {
      title: "Pokémon Not Found",
      description: "The requested Pokémon could not be found.",
    };
  }
}

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  
  try {
    const pokemon = await fetchPokemonByName(name);
    const species = await fetchPokemonSpecies(pokemon.species.name);
    
    // Fetch evolution and types in parallel
    const [evolution, ...typeDetails] = await Promise.all([
      fetchEvolutionChain(species.evolution_chain.url),
      ...pokemon.types.map((t: any) => fetchTypeByName(t.type.name))
    ]);

    return (
      <div className="container mx-auto px-4 py-8">
        <PokemonClientView 
          pokemon={pokemon}
          species={species}
          evolution={evolution}
          typeDetails={typeDetails}
        />
      </div>
    );
  } catch (error) {
    notFound();
  }
}