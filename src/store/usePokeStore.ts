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

  reset: () => void;
}

const DEFAULT_STATE = {
  isShiny: false,
  language: 'en' as LANGUAGES,
  number: 0,
  spriteType: 'pixel' as SpriteType,
  generation: '1',
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

      reset: () => set(DEFAULT_STATE),
    }),
    {
      name: 'pokedex-store',
    }
  )
);
