import { notFound } from "next/navigation";
import { fetchPokemonByName, fetchPokemonSpecies, fetchEvolutionChain, fetchTypeByName } from "@/lib/api";
import PokemonClientView from "@/components/pokemon/PokemonClientView";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  
  try {
    const pokemon = await fetchPokemonByName(name);
    const species = await fetchPokemonSpecies(name);
    
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