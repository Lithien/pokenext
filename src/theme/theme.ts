import { extendTheme, getContrastRatio } from '@mui/material/styles';

import type { Theme, PaletteColor } from '@mui/material/styles';

const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  fighting: '#C03028',
  water: '#6890F0',
  flying: '#A890F0',
  grass: '#5fbd58',
  poison: '#A040A0',
  electric: '#F8D030',
  ground: '#E0C068',
  psychic: '#F85888',
  rock: '#B8A038',
  ice: '#98D8D8',
  bug: '#A8B820',
  dragon: '#7038F8',
  ghost: '#705898',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
  unknow: '#EE99AC',
} as const;

export type PokemonType = keyof typeof typeColors;

export const isPokemonType = (type: string): type is PokemonType =>
  type in typeColors;

export const getColorByType = (type: string): string =>
  isPokemonType(type) ? typeColors[type] : '#09BC8A';

export const getContrastTextByColor = (main: string): '#fff' | '#111' =>
  getContrastRatio(main, '#fff') >= 4.5 ? '#fff' : '#111';

export const getAugmentedTypeColor = (
  theme: Theme,
  type: string
): PaletteColor => {
  const main = getColorByType(type);
  const contrastText = getContrastTextByColor(main);

  return theme.palette.augmentColor({
    color: { main, contrastText },
    name: `type-${type}`,
  });
};

export const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    background: { default: mode === 'light' ? '#f5f5f5' : '#030711' },
  },
  pokedex: {
    getColorByType,
  },
});

export const createAppTheme = (
  mode: 'light' | 'dark',
  colors: { name: string; hex: string }[]
) =>
  extendTheme({
    defaultColorScheme: mode,
    colorSchemes: {
      light: {
        palette: {
          text: {
            primary: '#111',
            secondary: '#555',
          },
          primary: {
            main: colors[0].hex,
            contrastText: getContrastTextByColor(colors[0].hex),
          },
          secondary: {
            main: colors[1].hex,
            contrastText: getContrastTextByColor(colors[1].hex),
          },
          accent: {
            main: colors[2].hex,
            contrastText: getContrastTextByColor(colors[2].hex),
          },
          background: {
            default: '#f5f5f5',
          },
          action: {
            hover: 'rgba(0,0,0,0.08)',
          },
          customShadows: {
            text: '0 1px 3px rgba(0,0,0,0.1)',
            card: '0 4px 6px rgba(0,0,0,0.1)',
          },
        },
      },
      dark: {
        palette: {
          text: {
            primary: '#fff',
            secondary: '#ccc',
          },
          primary: {
            main: colors[0].hex,
            contrastText: getContrastTextByColor(colors[0].hex),
          },
          secondary: {
            main: colors[1].hex,
            contrastText: getContrastTextByColor(colors[1].hex),
          },
          accent: {
            main: colors[2].hex,
            contrastText: getContrastTextByColor(colors[2].hex),
          },
          background: {
            default: '#030711',
          },
          action: {
            hover: 'rgba(255,255,255,0.1)',
          },
          customShadows: {
            text: '0 1px 3px rgba(255,255,255,0.2)',
            card: '0 4px 6px rgba(255,255,255,0.2)',
          },
        },
      },
    },
  });
