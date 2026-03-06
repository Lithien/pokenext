import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
    customShadows: {
      text: string;
      card: string;
    }
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
    customShadows?: {
      text?: string;
      card?: string;
    }
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