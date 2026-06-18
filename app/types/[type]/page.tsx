import { notFound } from "next/navigation";
import { fetchTypeByName } from "@/lib/api";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { TypeBadge, TYPE_COLORS } from "@/components/ui/TypeBadge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function TypeDetailsPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  
  try {
    const typeData = await fetchTypeByName(type);
    
    const damageRelations = typeData.damage_relations;
    const pokemonList = typeData.pokemon.map((p: any) => p.pokemon);
    const color = TYPE_COLORS[type.toLowerCase() as keyof typeof TYPE_COLORS] || "#71717a";

    return (
      <div className="min-h-screen bg-[var(--background)]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex w-full max-w-5xl mx-auto mb-8">
            <Link 
              href="/types" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors border border-slate-200 dark:border-slate-800 shadow-sm text-slate-700 dark:text-slate-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Types</span>
            </Link>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col items-center mb-16 relative">
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none z-0" 
                style={{ backgroundColor: color }} 
              />
              <div className="relative z-10 flex flex-col items-center text-center">
                <TypeBadge type={type} className="scale-150 mb-8 shadow-xl pointer-events-none" />
                <h1 className="text-5xl md:text-6xl font-black capitalize mb-4 text-slate-900 dark:text-white tracking-tight">
                  {type} Type
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium max-w-xl">
                  Detailed breakdown of {type} type strengths, weaknesses, and native Pokémon.
                </p>
              </div>
            </div>

            {/* Damage Relations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              
              {/* Offensive Profile */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-5 border-b border-slate-200 dark:border-slate-800">
                  <h2 className="text-xl font-black text-slate-800 dark:text-slate-200 flex items-center gap-3">
                    <span className="text-2xl">⚔️</span> Offensive Profile
                  </h2>
                </div>
                <div className="p-8 flex flex-col gap-8 flex-1">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-green-600 dark:text-green-400">
                      Super Effective (2x)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {damageRelations.double_damage_to.length > 0 ? (
                        damageRelations.double_damage_to.map((t: any) => (
                          <TypeBadge key={t.name} type={t.name} className="pointer-events-none" />
                        ))
                      ) : (
                        <span className="text-slate-400 italic text-sm">None</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-red-500 dark:text-red-400">
                      Not Very Effective (0.5x)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {damageRelations.half_damage_to.length > 0 ? (
                        damageRelations.half_damage_to.map((t: any) => (
                          <TypeBadge key={t.name} type={t.name} className="pointer-events-none" />
                        ))
                      ) : (
                        <span className="text-slate-400 italic text-sm">None</span>
                      )}
                    </div>
                  </div>

                  {damageRelations.no_damage_to.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-slate-500">
                        Ineffective (0x)
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {damageRelations.no_damage_to.map((t: any) => (
                          <TypeBadge key={t.name} type={t.name} className="pointer-events-none" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Defensive Profile */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-5 border-b border-slate-200 dark:border-slate-800">
                  <h2 className="text-xl font-black text-slate-800 dark:text-slate-200 flex items-center gap-3">
                    <span className="text-2xl">🛡️</span> Defensive Profile
                  </h2>
                </div>
                <div className="p-8 flex flex-col gap-8 flex-1">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-red-500 dark:text-red-400">
                      Weak Against (2x)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {damageRelations.double_damage_from.length > 0 ? (
                        damageRelations.double_damage_from.map((t: any) => (
                          <TypeBadge key={t.name} type={t.name} className="pointer-events-none" />
                        ))
                      ) : (
                        <span className="text-slate-400 italic text-sm">None</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-green-600 dark:text-green-400">
                      Resists (0.5x)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {damageRelations.half_damage_from.length > 0 ? (
                        damageRelations.half_damage_from.map((t: any) => (
                          <TypeBadge key={t.name} type={t.name} className="pointer-events-none" />
                        ))
                      ) : (
                        <span className="text-slate-400 italic text-sm">None</span>
                      )}
                    </div>
                  </div>

                  {damageRelations.no_damage_from.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-slate-500">
                        Immune To (0x)
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {damageRelations.no_damage_from.map((t: any) => (
                          <TypeBadge key={t.name} type={t.name} className="pointer-events-none" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Pokemon List */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] capitalize">
                  {type} Pokémon
                </h2>
                {pokemonList.length > 30 && (
                  <Link 
                    href={`/pokemon?filterType=${type.charAt(0).toUpperCase() + type.slice(1)}`} 
                    className="text-red-500 hover:text-red-600 font-medium whitespace-nowrap ml-4"
                  >
                    View All →
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {pokemonList.slice(0, 30).map((pokemon: any) => (
                  <PokemonCard key={pokemon.name} name={pokemon.name} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
