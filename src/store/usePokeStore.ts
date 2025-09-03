import { LANGUAGES } from '@/constants'
import { create } from 'zustand'

interface PokemonState {
  isShiny: boolean
  toggleShiny: () => void
  setShiny: (value: boolean) => void
  language: LANGUAGES
  setLanguage: (lang: LANGUAGES) => void
  number: number,
  setNumber: (number: number) => void
}

export const usePokeStore = create<PokemonState>((set) => ({
  isShiny: false,
  toggleShiny: () => set((state) => ({ isShiny: !state.isShiny })),
  setShiny: (value) => set({ isShiny: value }),  
  setLanguage: (lang) => set({ language: lang }),
  language: LANGUAGES.EN,
  number: 0,
  setNumber: (number) => set({ number }),
}))
