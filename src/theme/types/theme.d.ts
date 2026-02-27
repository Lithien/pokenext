import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }

  interface Theme {
    pokedex: {
      getColorByType: (type: string) => string;
      accent: string;
    };
  }
  interface ThemeOptions {
    pokedex?: {
      getColorByType?: (type: string) => string;
      accent?: string;
    };
  }
}