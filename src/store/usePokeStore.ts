import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { LANGUAGES } from '@/constants'

interface PokemonState {
  isShiny: boolean
  toggleShiny: () => void
  setShiny: (value: boolean) => void

  language: LANGUAGES
  setLanguage: (lang: LANGUAGES) => void

  number: number
  setNumber: (number: number) => void
}

export const usePokeStore = create<PokemonState>()(
  persist(
    (set) => ({
      isShiny: false,
      toggleShiny: () => set((state) => ({ isShiny: !state.isShiny })),
      setShiny: (value) => set({ isShiny: value }),

      language: 'en',
      setLanguage: (lang) => set({ language: lang }),

      number: 0,
      setNumber: (number) => set({ number }),
    }),
    {
      name: 'pokedex-store',
    }
  )
)
