import CompareClient from "./CompareClient";

export default function ComparePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-[var(--foreground)]">Compare Pokémon</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Select two Pokémon to compare their stats, types, and abilities side-by-side.
        </p>
      </div>

      <CompareClient />
    </div>
  );
}
