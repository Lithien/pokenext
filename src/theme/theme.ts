import { createTheme } from '@mui/material'

export const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  fighting: "#C03028",
  water: "#6890F0",
  flying: "#A890F0",
  grass: "#5fbd58",
  poison: "#A040A0",
  electric: "#F8D030",
  ground: "#E0C068",
  psychic: "#F85888",
  rock: "#B8A038",
  ice: "#98D8D8",
  bug: "#A8B820",
  dragon: "#7038F8",
  ghost: "#705898",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
  unknow: "#EE99AC",
} as const

export type PokemonType = keyof typeof typeColors

export const isPokemonType = (type: string): type is PokemonType => type in typeColors

export const getColorByType = (type: string): string => isPokemonType(type) ? typeColors[type] : '#09BC8A'

export const getDesignTokens = (mode: 'light' | 'dark', colors: { primary: string; secondary: string; accent: string }) => ({
  palette: {
    mode,
    background: { default: mode === 'light' ? '#f5f5f5' : '#030711' },
  },
  pokedex: {
    getColorByType,
    accent: colors.accent || '#C49F3B',
  },
})

export const createAppTheme = (
  mode: 'light' | 'dark',
  colors: { primary: string; secondary: string; accent: string }
) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primary
      },
      secondary: {
        main: colors.secondary
      },
      accent: {
        main: colors.accent
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#030711',
      },
    },
    pokedex: {
      getColorByType,
      accent: colors.accent || '#C49F3B',
    },
  })