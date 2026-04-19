'use client';

import { CssVarsProvider, CssBaseline } from '@mui/material';
import { useMemo, PropsWithChildren } from 'react';

import { createAppTheme } from './theme';

import { useThemeStore } from '@/store/useThemeStore';

export default function ThemeRegistry({ children }: PropsWithChildren) {
  const { colors, mode } = useThemeStore();
  const theme = useMemo(() => createAppTheme(mode, colors), [mode, colors]);

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
