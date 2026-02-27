'use client'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { Box, CardMedia, Container, IconButton, Typography } from '@mui/material'
import { useEffect } from 'react'

import { usePokeStore } from '@/store/usePokeStore'
import { applyColorsFromImage } from '@/utils/extractColors'

interface PokemonImageHeaderProps {
  imageUrl: string
  name: string
  genere: string
}

export const PokemonImageHeader = ({ imageUrl, name, genere }: PokemonImageHeaderProps) => {
  const { isShiny, toggleShiny } = usePokeStore()

  useEffect(() => {
    applyColorsFromImage(imageUrl)
  }, [imageUrl])
  
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
