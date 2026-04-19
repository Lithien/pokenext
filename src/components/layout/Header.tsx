'use client';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Tooltip,
  getLuminance,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import GenerationSelector from './GenerationSelector';
import { LanguageSelector } from './LanguageSelector';
import { MobileMenu } from './MobileMenu';
import SpriteSelector from './SpriteSelector';

import { useThemeStore } from '@/store/useThemeStore';

export const PokedexHeader = () => {
  const router = useRouter();
  const mode = useThemeStore((s) => s.mode);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  const goHome = useCallback(() => router.push('/'), [router]);

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
          mode === 'dark' ? '#0a0a14a5' : 'rgba(255, 255, 255, 0.65)',
        borderBottom:
          mode === 'dark'
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: { xs: 0.5, sm: 1, md: 2 },
          px: { xs: 0.5, sm: 1 },
        }}
      >
        {/* Logo y título */}
        <Box
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 0.5, sm: 1 },
          }}
        >
          <IconButton
            color="inherit"
            onClick={goHome}
            aria-label="home"
            size="small"
            sx={(theme) => ({
              color: theme.palette.text.primary,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                transform: 'scale(1.1)',
              },
            })}
          >
            <HomeIcon fontSize="medium" />
          </IconButton>

          <Typography
            variant="h6"
            sx={(theme) => ({
              display: { xs: 'none', sm: 'block' },
              fontWeight: 'bold',
              cursor: 'pointer',
              color: theme.palette.text.primary,
              textShadow: theme.palette.customShadows.text,
              fontSize: { sm: '1.1rem', md: '1.25rem' },
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            })}
            onClick={goHome}
          >
            Pokédex
          </Typography>
        </Box>

        {/* Selectores (Desktop/Tablet) */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: { md: 1.5, lg: 2 },
            alignItems: 'end',
          }}
        >
          <LanguageSelector />
          <GenerationSelector />
          <SpriteSelector />
          <Tooltip
            title={`Cambiar a tema ${mode === 'dark' ? 'claro' : 'oscuro'}`}
          >
            <IconButton
              onClick={toggleTheme}
              color="inherit"
              size="small"
              sx={{
                display: { xs: 'none', sm: 'flex' },
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'rotate(20deg) scale(1.1)',
                },
              }}
              aria-label="toggle theme"
            >
              {mode === 'dark' ? (
                <Brightness7Icon fontSize="medium" />
              ) : (
                <Brightness4Icon fontSize="medium" />
              )}
            </IconButton>
          </Tooltip>
        </Box>

        {/* Selectores responsivos en tablet */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex', md: 'none' },
            gap: 1,
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            flex: 1,
          }}
        >
          <LanguageSelector />
          <GenerationSelector />
        </Box>

        {/* Mobile Menu + Theme toggle */}
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Tooltip
            title={`Cambiar a tema ${mode === 'dark' ? 'claro' : 'oscuro'}`}
          >
            <IconButton
              onClick={toggleTheme}
              size="small"
              sx={{
                color: (theme) => getLuminance(theme.palette.text.primary),
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'rotate(20deg) scale(1.1)',
                },
              }}
              aria-label="toggle theme"
            >
              {mode === 'dark' ? (
                <Brightness7Icon fontSize="small" />
              ) : (
                <Brightness4Icon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
          <MobileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
