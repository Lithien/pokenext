'use client'
import { Box, CardMedia, Container, IconButton, Typography } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { usePokeStore } from '@/store/usePokeStore'
import { useEffect } from 'react'
import { useThemeStore } from '@/store/useThemeStore'
import { extractColors } from '@/utils/colorThief'

interface PokemonImageHeaderProps {
  imageUrl: string
  name: string
  genere: string
}

export const PokemonImageHeader = ({ imageUrl, name, genere }: PokemonImageHeaderProps) => {
  const { isShiny, toggleShiny } = usePokeStore()
  const setColors = useThemeStore((state) => state.setColors)

  useEffect(() => {
    extractColors(imageUrl, setColors)
  }, [imageUrl, setColors, isShiny])

  return (
    <Container sx={{ mb: 2, width: 'auto' }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <IconButton
          color={isShiny ? 'warning' : 'default'}
          onClick={toggleShiny}
          sx={{
            position: 'relative', top: '2.5rem', right: '-4.5rem', height: '2rem',
            width: '2rem',
          }}
        >
          <AutoAwesomeIcon />
        </IconButton>
        <CardMedia
          component="img"
          image={imageUrl}
          alt={name}
          style={{ imageRendering: 'pixelated', width: '160px' }}
        />
        <Typography variant="body2" color="accent">{genere}</Typography>
      </Box>
    </Container>
  )
}
