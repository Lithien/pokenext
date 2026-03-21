'use client'

import CheckIcon from '@mui/icons-material/Check'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ImageIcon from '@mui/icons-material/Image'
import MenuIcon from '@mui/icons-material/Menu'
import PublicIcon from '@mui/icons-material/Public'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Box,
  Typography,
  getLuminance,
} from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

import { LANGUAGES, LANGUAGE_FLAGS, SPRITE_TYPES } from '@/constants'
import { usePokeStore } from '@/store/usePokeStore'

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  const generation = usePokeStore((s) => s.generation)
  const setGeneration = usePokeStore((s) => s.setGeneration)
  const language = usePokeStore((e) => e.language)
  const setLanguage = usePokeStore((e) => e.setLanguage)
  const spriteType = usePokeStore((e) => e.spriteType)
  const setSpriteType = usePokeStore((e) => e.setSpriteType)

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleSubmenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu)
  }

  const handleGenerationSelect = (gen: string) => {
    setGeneration(gen)
    setIsOpen(false)
  }

  const handleLanguageSelect = (lang: LANGUAGES) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  const handleSpriteSelect = (sprite: typeof SPRITE_TYPES[number]['id']) => {
    setSpriteType(sprite)
    setIsOpen(false)
  }

  return (
    <>
      <IconButton
        onClick={toggleMenu}
        sx={{ color: (theme) => getLuminance(theme.palette.primary.main), display: { xs: 'flex', sm: 'none' } }}
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 320,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(10, 10, 20, 0.95)'
                  : 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(8px)',
            }
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            pt: 2,
            pb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              px: 2,
              mb: 2,
              fontWeight: 600,
              fontSize: '1.1rem',
            }}
          >
            Opciones
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'rgba(0, 0, 0, 0.2)',
                borderRadius: '3px',
              },
            }}
          >
            <List sx={{ py: 0 }}>
              {/* Generación */}
              <ListItemButton
                onClick={() => toggleSubmenu('generation')}
                sx={(theme) => ({
                  backgroundColor:
                    expandedMenu === 'generation'
                      ? theme.palette.action.selected
                      : 'transparent',
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    backgroundColor:
                      expandedMenu === 'generation'
                        ? theme.palette.action.selected
                        : theme.palette.action.hover,
                  },
                })}
              >
                <ListItemIcon sx={{ color: (theme) => getLuminance(theme.palette.primary.main) }}>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Generación"
                  slotProps={{
                    primary: {
                      sx: { fontWeight: expandedMenu === 'generation' ? 600 : 500 },
                    }
                  }}
                />
                {expandedMenu === 'generation' ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={expandedMenu === 'generation'} timeout="auto">
                <List component="div" disablePadding>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => {
                    const isSelected = String(generation) === String(gen)
                    return (
                      <ListItemButton
                        key={gen}
                        sx={{
                          pl: 5,
                          pr: 2,
                          py: 1,
                          backgroundColor: isSelected ? 'action.selected' : 'transparent',
                          transition: 'background-color 0.2s ease',
                          '&:hover': {
                            backgroundColor: isSelected
                              ? 'action.selected'
                              : (theme) => theme.palette.action.hover,
                          },
                        }}
                        onClick={() => handleGenerationSelect(String(gen))}
                      >
                        {isSelected && (
                          <ListItemIcon sx={{ minWidth: 32, color: 'success.main' }}>
                            <CheckIcon fontSize="small" />
                          </ListItemIcon>
                        )}
                        <ListItemText
                          primary={`Gen ${gen}`}
                          slotProps={{
                            primary: {
                              sx: { fontWeight: isSelected ? 600 : 400, fontSize: '0.95rem' },
                            }
                          }}
                        />
                      </ListItemButton>
                    )
                  })}
                </List>
              </Collapse>

              <Divider sx={{ my: 1 }} />

              {/* Idioma */}
              <ListItemButton
                onClick={() => toggleSubmenu('language')}
                sx={(theme) => ({
                  backgroundColor:
                    expandedMenu === 'language'
                      ? theme.palette.action.selected
                      : 'transparent',
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    backgroundColor:
                      expandedMenu === 'language'
                        ? theme.palette.action.selected
                        : theme.palette.action.hover,
                  },
                })}
              >
                <ListItemIcon sx={{ color: (theme) => getLuminance(theme.palette.primary.main) }}>
                  <PublicIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Idioma"
                  slotProps={{
                    primary: {
                      sx: { fontWeight: expandedMenu === 'language' ? 600 : 500 },
                    }
                  }}
                />
                {expandedMenu === 'language' ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={expandedMenu === 'language'} timeout="auto">
                <List component="div" disablePadding>
                  {Object.values(LANGUAGES).map((lang) => {
                    const isSelected = language === lang
                    return (
                      <ListItemButton
                        key={lang}
                        sx={{
                          pl: 2,
                          pr: 2,
                          py: 1,
                          backgroundColor: isSelected ? 'action.selected' : 'transparent',
                          transition: 'background-color 0.2s ease',
                          '&:hover': {
                            backgroundColor: isSelected
                              ? 'action.selected'
                              : (theme) => theme.palette.action.hover,
                          },
                        }}
                        onClick={() => handleLanguageSelect(lang)}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Image
                            src={LANGUAGE_FLAGS[lang]}
                            alt={lang}
                            width={20}
                            height={20}
                            style={{ height: '18px' }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={lang.toUpperCase()}
                          primaryTypographyProps={{
                            sx: { fontWeight: isSelected ? 600 : 400, fontSize: '0.95rem' },
                          }}
                        />
                        {isSelected && (
                          <CheckIcon
                            fontSize="small"
                            sx={{ color: 'success.main', ml: 'auto' }}
                          />
                        )}
                      </ListItemButton>
                    )
                  })}
                </List>
              </Collapse>

              <Divider sx={{ my: 1 }} />

              {/* Sprite */}
              <ListItemButton
                onClick={() => toggleSubmenu('sprite')}
                sx={(theme) => ({
                  backgroundColor:
                    expandedMenu === 'sprite'
                      ? theme.palette.action.selected
                      : 'transparent',
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    backgroundColor:
                      expandedMenu === 'sprite'
                        ? theme.palette.action.selected
                        : theme.palette.action.hover,
                  },
                })}
              >
                <ListItemIcon sx={{ color: (theme) => getLuminance(theme.palette.primary.main) }}>
                  <ImageIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Sprite"
                  slotProps={{
                    primary: {
                      sx: { fontWeight: expandedMenu === 'sprite' ? 600 : 500 },
                    }
                  }}
                />
                {expandedMenu === 'sprite' ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={expandedMenu === 'sprite'} timeout="auto">
                <List component="div" disablePadding>
                  {SPRITE_TYPES.map((sprite) => {
                    const isSelected = spriteType === sprite.id
                    return (
                      <ListItemButton
                        key={sprite.id}
                        sx={{
                          pl: 5,
                          pr: 2,
                          py: 1,
                          backgroundColor: isSelected ? 'action.selected' : 'transparent',
                          transition: 'background-color 0.2s ease',
                          '&:hover': {
                            backgroundColor: isSelected
                              ? 'action.selected'
                              : (theme) => theme.palette.action.hover,
                          },
                        }}
                        onClick={() => handleSpriteSelect(sprite.id)}
                      >
                        {isSelected && (
                          <ListItemIcon sx={{ minWidth: 32, color: 'success.main' }}>
                            <CheckIcon fontSize="small" />
                          </ListItemIcon>
                        )}
                        <ListItemText
                          primary={sprite.label}
                          slotProps={{ 
                            primary: {
                              sx: { fontWeight: isSelected ? 600 : 400, fontSize: '0.95rem' },
                            }
                          }}
                        />
                      </ListItemButton>
                    )
                  })}
                </List>
              </Collapse>
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}
