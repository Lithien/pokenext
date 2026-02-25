declare module '@mui/material/styles' {
  interface Theme {
    pokedex: {
      getColorByType: (type: string) => string
    }
  }

  interface ThemeOptions {
    pokedex?: {
      getColorByType?: (type: string) => string
    }
  }
}
