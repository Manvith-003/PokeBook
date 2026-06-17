import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[]; // Store Pokemon names
  addFavorite: (name: string) => void;
  removeFavorite: (name: string) => void;
  isFavorite: (name: string) => boolean;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (name: string) =>
        set((state) => ({
          favorites: state.favorites.includes(name)
            ? state.favorites
            : [...state.favorites, name],
        })),
      removeFavorite: (name: string) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav !== name),
        })),
      isFavorite: (name: string) => get().favorites.includes(name),
    }),
    {
      name: "pokemon-favorites",
    }
  )
);
