'use client'

import HomeIcon from '@mui/icons-material/Home'
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import GenerationSelector from './GenerationSelector'
import { LanguageSelector } from './LanguageSelector'
import SpriteSelector from './SpriteSelector'

import { IMG_BASE_URL } from '@/constants'
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
        zIndex: 999,
        backdropFilter: 'blur(12px)',
        transition: 'background-color 0.3s ease',
        backgroundColor:
          mode === 'dark'
            ? '#0a0a14a5'
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
            aria-label='home'
            sx={theme => ({
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            })}
          >
            <HomeIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={theme => ({
              display: { xs: 'none', sm: 'block' },
              fontWeight: 'bold',
              cursor: 'pointer',
              color: theme.palette.text.primary,
              textShadow: theme.palette.customShadows.text,
            })}
            onClick={goHome}
          >
            Pokédex
          </Typography>
        </Box>
        <LanguageSelector />
        <GenerationSelector />
        <SpriteSelector />
        <Image
          onClick={toggleTheme}
          src={`${IMG_BASE_URL}${mode === 'dark' ? '338' : '337'}.png`}
          alt='Theme toggle'
          width={60}
          height={60}
          style={{
            cursor: 'pointer',
          }}
        />
      </Toolbar>
    </AppBar>
  )
}