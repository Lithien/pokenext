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
    applyColorsFromImage(imageUrl, 20)
  }, [imageUrl])

  return (
    <Container sx={{ mb: { xs: 2, sm: 3 }, width: 'auto' }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={{ xs: 0.5, sm: 1 }} sx={{ position: 'relative' }}>
        <IconButton
          color={isShiny ? 'warning' : 'default'}
          aria-label="toggle shiny"
          onClick={toggleShiny}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: { xs: '2rem', sm: '2.5rem' },
            width: { xs: '2rem', sm: '2.5rem' },
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1) rotate(10deg)',
              color: (theme) => theme.palette.warning.main,
            },
            '&:active': {
              transform: 'scale(0.95)',
            },
          }}
        >
          <AutoAwesomeIcon />
        </IconButton>
        <CardMedia
          component="img"
          image={imageUrl}
          alt={name}
          style={{
            imageRendering: 'pixelated',
            width: 'auto',
            height: '200px',
            transition: 'all 0.3s ease',
          }}
        />
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: '0.875rem', sm: '1rem' },
            fontWeight: 500,
            transition: 'all 0.2s ease',
            color: theme => theme.palette.primary.light,
          }}
        >
          {genere}
        </Typography>
      </Box>
    </Container>
  )
}
