export const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export async function fetchPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
  const res = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error("Failed to fetch pokemon list");
  return res.json();
}

export async function fetchPokemonByName(name: string) {
  let actualName = name.toLowerCase();
  
  // PokeAPI splits some species into forms for their default pokemon entry
  const nameMapping: Record<string, string> = {
    'oinkologne': 'oinkologne-male',
    'deoxys': 'deoxys-normal',
    'wormadam': 'wormadam-plant',
    'giratina': 'giratina-altered',
    'shaymin': 'shaymin-land',
    'basculin': 'basculin-red-striped',
    'darmanitan': 'darmanitan-standard',
    'tornadus': 'tornadus-incarnate',
    'thundurus': 'thundurus-incarnate',
    'landorus': 'landorus-incarnate',
    'keldeo': 'keldeo-ordinary',
    'meloetta': 'meloetta-aria',
    'meowstic': 'meowstic-male',
    'aegislash': 'aegislash-shield',
    'pumpkaboo': 'pumpkaboo-average',
    'gourgeist': 'gourgeist-average',
    'oricorio': 'oricorio-baile',
    'lycanroc': 'lycanroc-midday',
    'wishiwashi': 'wishiwashi-solo',
    'minior': 'minior-red-meteor',
    'mimikyu': 'mimikyu-disguised',
    'toxtricity': 'toxtricity-amped',
    'eiscue': 'eiscue-ice',
    'indeedee': 'indeedee-male',
    'morpeko': 'morpeko-full-belly',
    'urshifu': 'urshifu-single-strike',
    'basculegion': 'basculegion-male',
    'enamorus': 'enamorus-incarnate',
    'zygarde': 'zygarde-50'
  };

  if (nameMapping[actualName]) {
    actualName = nameMapping[actualName];
  }

  const res = await fetch(`${POKEAPI_BASE_URL}/pokemon/${actualName}`);
  if (!res.ok) throw new Error(`Failed to fetch pokemon details for ${actualName}`);
  return res.json();
}

export async function fetchPokemonSpecies(name: string) {
  const res = await fetch(`${POKEAPI_BASE_URL}/pokemon-species/${name.toLowerCase()}`);
  if (!res.ok) throw new Error("Failed to fetch pokemon species");
  return res.json();
}

export async function fetchEvolutionChain(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch evolution chain");
  return res.json();
}

export async function fetchRegions() {
  const res = await fetch(`${POKEAPI_BASE_URL}/region`);
  if (!res.ok) throw new Error("Failed to fetch regions");
  return res.json();
}

export async function fetchRegionByName(name: string) {
  const res = await fetch(`${POKEAPI_BASE_URL}/region/${name.toLowerCase()}`);
  if (!res.ok) throw new Error("Failed to fetch region details");
  return res.json();
}

export async function fetchPokedexByUrl(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch pokedex");
  return res.json();
}

export async function fetchTypes() {
  const res = await fetch(`${POKEAPI_BASE_URL}/type`);
  if (!res.ok) throw new Error("Failed to fetch types");
  return res.json();
}

export async function fetchTypeByName(name: string) {
  const res = await fetch(`${POKEAPI_BASE_URL}/type/${name.toLowerCase()}`);
  if (!res.ok) throw new Error("Failed to fetch type details");
  return res.json();
}
