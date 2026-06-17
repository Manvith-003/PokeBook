export async function getPokemonList() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");

    return response.json();
}