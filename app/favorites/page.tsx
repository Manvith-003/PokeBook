import FavoritesClient from "./FavoritesClient";

export default function FavoritesPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-[var(--foreground)] text-red-500">
          Your Favorites
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          All the Pokémon you've saved for later.
        </p>
      </div>

      <FavoritesClient />
    </div>
  );
}
