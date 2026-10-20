'use client';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  Box,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import { memo, useEffect } from 'react';

import { usePokeStore } from '@/store/usePokeStore';
import { useThemeStore } from '@/store/useThemeStore';
import { applyColorsFromImage } from '@/utils/extractColors';

interface PokemonImageHeaderProps {
  pokemonId: number;
  imageUrl: string;
  name: string;
  genere: string;
}

export const PokemonImageHeader = memo(function PokemonImageHeader({
  pokemonId,
  imageUrl,
  name,
  genere,
}: PokemonImageHeaderProps) {
  const isShiny = usePokeStore((s) => s.isShiny);
  const toggleShiny = usePokeStore((s) => s.toggleShiny);
  const isFavorite = usePokeStore((s) => s.favoriteIds.includes(pokemonId));
  const toggleFavorite = usePokeStore((s) => s.toggleFavorite);
  const similarityThreshold = useThemeStore((s) => s.similarityThreshold);

  useEffect(() => {
    applyColorsFromImage(imageUrl, 20);
  }, [imageUrl, similarityThreshold]);

  return (
    <Container sx={{ mb: { xs: 2, sm: 3 }, width: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 0.5, sm: 1 },
          position: 'relative',
        }}
      >
        <IconButton
          color={isShiny ? 'warning' : 'default'}
          aria-label={isShiny ? 'Desactivar variocolor' : 'Activar variocolor'}
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
        <IconButton
          color={isFavorite ? 'error' : 'default'}
          aria-label={
            isFavorite
              ? `Quitar ${name} de favoritos`
              : `Añadir ${name} a favoritos`
          }
          aria-pressed={isFavorite}
          onClick={() => toggleFavorite(pokemonId)}
          sx={{
            position: 'absolute',
            top: 0,
            right: { xs: '2.5rem', sm: '3rem' },
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
            color: (theme) => theme.palette.primary.light,
          }}
        >
          {genere}
        </Typography>
      </Box>
    </Container>
  );
});
