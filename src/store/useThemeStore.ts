import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ColorItem {
  name: 'primary' | 'secondary' | 'accent';
  hex: string;
}

interface ThemeState {
  colors: ColorItem[];
  setColors: (colors: ColorItem[]) => void;
  resetColors: () => void;
  similarityThreshold: number;
  setSimilarityThreshold: (threshold: number) => void;

  mode: 'light' | 'dark';
  toggleTheme: () => void;
  setMode: (mode: 'light' | 'dark') => void;
}

const DEFAULT_COLORS: ColorItem[] = [
  { name: 'primary', hex: '#2F323F' },
  { name: 'secondary', hex: '#64647C' },
  { name: 'accent', hex: '#FFFFFF' },
];

const isValidHex = (hex: string): boolean =>
  /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      colors: DEFAULT_COLORS,
      setColors: (colors) => {
        // Validate all colors have valid hex format
        const validColors = colors.every((color) => isValidHex(color.hex));
        if (!validColors) {
          console.warn('Invalid hex color format in one or more colors');
          return;
        }
        set({ colors });
      },
      resetColors: () => set({ colors: DEFAULT_COLORS }),
      similarityThreshold: 90,
      setSimilarityThreshold: (threshold) => {
        const safeThreshold = Math.max(0, Math.min(442, Math.round(threshold)));
        set({ similarityThreshold: safeThreshold });
      },

      mode: 'dark',
      setMode: (mode) => set({ mode }),
      toggleTheme: () =>
        set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'theme-store',
    }
  )
);
