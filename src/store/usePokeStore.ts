import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { LANGUAGES, SpriteType } from '@/constants';

interface PokemonState {
  isShiny: boolean;
  toggleShiny: () => void;
  setShiny: (value: boolean) => void;

  language: LANGUAGES;
  setLanguage: (lang: LANGUAGES) => void;

  number: number;
  setNumber: (number: number) => void;

  spriteType: SpriteType;
  setSpriteType: (t: SpriteType) => void;

  generation: string;
  setGeneration: (gen: string) => void;

  searchTerm: string;
  setSearchTerm: (term: string) => void;

  showFavorites: boolean;
  setShowFavorites: (value: boolean) => void;
  favoriteIds: number[];
  toggleFavorite: (pokemonId: number) => void;

  teamIds: number[];
  addToTeam: (pokemonId: number) => void;
  removeFromTeam: (pokemonId: number) => void;
  reorderTeam: (activeId: number, overId: number) => void;

  reset: () => void;
}

const DEFAULT_STATE = {
  isShiny: false,
  language: 'en' as LANGUAGES,
  number: 0,
  spriteType: 'pixel' as SpriteType,
  generation: '1',
  searchTerm: '',
  showFavorites: false,
  favoriteIds: [] as number[],
  teamIds: [] as number[],
};

export const usePokeStore = create<PokemonState>()(
  persist(
    (set) => ({
      ...DEFAULT_STATE,
      toggleShiny: () => set((state) => ({ isShiny: !state.isShiny })),
      setShiny: (value) => set({ isShiny: value }),

      setLanguage: (lang) => set({ language: lang }),

      setNumber: (number) => {
        if (number < 0) {
          console.warn('Pokemon number cannot be negative');
          return;
        }
        set({ number });
      },

      setSpriteType: (t) => set({ spriteType: t }),

      setGeneration: (gen) => set({ generation: gen }),

      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setShowFavorites: (showFavorites) => set({ showFavorites }),
      toggleFavorite: (pokemonId) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(pokemonId)
            ? state.favoriteIds.filter((id) => id !== pokemonId)
            : [...state.favoriteIds, pokemonId],
        })),
      addToTeam: (pokemonId) =>
        set((state) => {
          if (state.teamIds.includes(pokemonId) || state.teamIds.length >= 6) {
            return state;
          }
          return { teamIds: [...state.teamIds, pokemonId] };
        }),
      removeFromTeam: (pokemonId) =>
        set((state) => ({
          teamIds: state.teamIds.filter((id) => id !== pokemonId),
        })),
      reorderTeam: (activeId, overId) =>
        set((state) => {
          const fromIndex = state.teamIds.indexOf(activeId);
          const toIndex = state.teamIds.indexOf(overId);
          if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
            return state;
          }
          const teamIds = [...state.teamIds];
          const [movedId] = teamIds.splice(fromIndex, 1);
          teamIds.splice(toIndex, 0, movedId);
          return { teamIds };
        }),

      reset: () => set(DEFAULT_STATE),
    }),
    {
      name: 'pokedex-store',
    }
  )
);
