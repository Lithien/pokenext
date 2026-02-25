import { create } from 'zustand'

interface ThemeState {
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  setColors: (colors: ThemeState['colors']) => void
  mode: 'light' | 'dark'
  toggleTheme: () => void
  setMode: (mode: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  colors: {
    primary: '#2F323F',
    secondary: '#64647C',
    accent: '#FFFFFF'
  },
  setColors: (colors) => set({ colors }),
  mode: 'dark',
  toggleTheme: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
  setMode: (mode) => set({ mode })
}))
