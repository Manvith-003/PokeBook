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
  const res = await fetch(`${POKEAPI_BASE_URL}/pokemon/${name.toLowerCase()}`);
  if (!res.ok) throw new Error("Failed to fetch pokemon details");
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
