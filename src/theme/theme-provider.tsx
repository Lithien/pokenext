'use client'

import { useThemeStore } from '@/store/useThemeStore'
import { createAppTheme } from './theme'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useMemo, useState, useEffect, PropsWithChildren } from 'react'

export default function ThemeRegistry({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<'light' | 'dark'>('dark')
  const { colors } = useThemeStore()
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setMode(prefersDark ? 'dark' : 'light')
  }, [])

  const theme = useMemo(() => createAppTheme(mode, colors), [mode, colors])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
