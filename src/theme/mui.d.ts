// mui.d.ts
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    pokedex: {
      getColorByType: (type: string) => string;
    };
  }

  interface CssVarsTheme {
    pokedex: {
      getColorByType: (type: string) => string;
    };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}
