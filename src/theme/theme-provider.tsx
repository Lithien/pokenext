'use client'

import { createAppTheme } from './theme'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useMemo, useState, useEffect, PropsWithChildren } from 'react'

export default function ThemeRegistry({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setMode(prefersDark ? 'dark' : 'light')
  }, [])

  const theme = useMemo(() => createAppTheme(mode), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
