// src/theme.d.ts
import { Theme as MuiTheme } from '@mui/material/styles'

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
