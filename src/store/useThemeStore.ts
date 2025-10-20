import { create } from 'zustand'

interface ThemeState {
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  setColors: (colors: ThemeState['colors']) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  colors: {
    primary: '#2F323F',
    secondary: '#64647C',
    accent: '#FFFFFF'
  },
  setColors: (colors) => set({ colors })
}))
