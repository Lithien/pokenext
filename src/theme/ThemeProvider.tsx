'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { useMemo, PropsWithChildren } from 'react';

import { createAppTheme } from './theme';

import { useThemeStore } from '@/store/useThemeStore';

export default function ThemeRegistry({ children }: PropsWithChildren) {
  const { colors, mode } = useThemeStore();
  const theme = useMemo(() => createAppTheme(mode, colors), [mode, colors]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
