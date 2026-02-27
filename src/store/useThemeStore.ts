import { create } from 'zustand'

interface ColorItem {
  name: 'primary' | 'secondary' | 'accent'
  hex: string
}

interface ThemeState {
  colors: ColorItem[]
  setColors: (colors: ColorItem[]) => void

  mode: 'light' | 'dark'
  toggleTheme: () => void
  setMode: (mode: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  colors: [
    { name: 'primary', hex: '#2F323F' },
    { name: 'secondary', hex: '#64647C' },
    { name: 'accent', hex: '#FFFFFF' }
  ],
  setColors: (colors) => set({ colors }),

  mode: 'dark',
  setMode: (mode) => set({ mode }),
  toggleTheme: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
}))