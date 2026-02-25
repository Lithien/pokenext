'use client'

import HomeIcon from '@mui/icons-material/Home'
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material'
import { useRouter } from 'next/navigation'

import { LanguageSelector } from './LanguageSelector'

import { useThemeStore } from '@/store/useThemeStore'

export const PokedexHeader = () => {
  const router = useRouter()
  const { mode, toggleTheme } = useThemeStore()

  const goHome = () => router.push('/')

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 9999,
        backdropFilter: 'blur(12px)',
        transition: 'background-color 0.3s ease',
        backgroundColor:
          mode === 'dark'
            ? 'rgba(10, 10, 20, 0.65)'
            : 'rgba(255, 255, 255, 0.65)',
        borderBottom:
          mode === 'dark'
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

        {/* Botón Home */}
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            color="inherit"
            onClick={goHome}
            sx={{
              color: mode === 'dark' ? '#fff' : '#111',
              '&:hover': {
                backgroundColor:
                  mode === 'dark'
                    ? 'rgba(255,255,255,0.1)'
                    : 'rgba(0,0,0,0.1)',
              },
            }}
          >
            <HomeIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              cursor: 'pointer',
              color: mode === 'dark' ? '#fff' : '#111',
              textShadow:
                mode === 'dark'
                  ? '0 0 6px rgba(255,255,255,0.2)'
                  : '0 0 6px rgba(0,0,0,0.1)',
            }}
            onClick={goHome}
          >
            Pokédex
          </Typography>
        </Box>
        <LanguageSelector />

        {/* Botón Tema */}
        <IconButton
          color="inherit"
          onClick={toggleTheme}
          sx={{
            color: mode === 'dark' ? '#fff' : '#111',
            '&:hover': {
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(0,0,0,0.1)',
            },
          }}
        >
          {mode === 'dark' ? (
            <img className='h-15 pixel' src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/338.png' />
          ) : (
            <img className='h-15 pixel' src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/337.png' />
          )}
        </IconButton>

      </Toolbar>
    </AppBar>
  )
}