// src/theme.ts

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

export const isPokemonType = (type: string): type is PokemonType =>
  type in typeColors

export const getColorByType = (type: string): string =>
  isPokemonType(type) ? typeColors[type] : '#09BC8A'

// Material UI Theme
import { createTheme } from '@mui/material/styles'

export const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        primary: { main: '#ef5350' },
        background: { default: '#f5f5f5' }
      }
      : {
        primary: { main: '#ef5350' },
        background: { default: '#121212' }
      })
  },
  pokedex: {
    getColorByType
  }
})

export const createAppTheme = (mode: 'light' | 'dark') =>
  createTheme(getDesignTokens(mode))
