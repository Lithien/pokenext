'use client';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { memo } from 'react';

import { NamedAPIResource } from '@/api/types';
import { usePokeStore } from '@/store/usePokeStore';
import { getNumberFromUrl, getPokemonImage } from '@/utils';

const PokemonCard = memo(function PokemonCard({ name, url }: NamedAPIResource) {
  const theme = useTheme();
  const isShiny = usePokeStore((s) => s.isShiny);
  const spriteType = usePokeStore((s) => s.spriteType);
  const pokemonId = getNumberFromUrl(url);

  return (
    <Link href={`/pokemon/${name}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          maxWidth: { xs: 150, sm: 180, md: 200 },
          minWidth: 110,
          margin: { xs: 0.75, sm: 1 },
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor:
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.02)',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.05)',
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0 12px 24px rgba(255, 255, 255, 0.2)'
                : '0 12px 24px rgba(0, 0, 0, 0.15)',
            backgroundColor:
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.04)',
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
        }}
      >
        <CardMedia
          component="img"
          image={getPokemonImage(pokemonId, spriteType, false, isShiny)}
          alt={name}
          onError={(e) => {
            e.currentTarget.style.filter =
              theme.palette.mode === 'dark' ? 'invert(1)' : 'none';
            e.currentTarget.src = '/pokeball.svg';
          }}
          style={{
            padding: '12px 8px',
            imageRendering:
              spriteType === 'pixel' || spriteType === 'showdown'
                ? 'pixelated'
                : 'auto',
            objectFit: 'contain',
            minHeight: '110px',
          }}
          width={130}
          height={130}
        />
        <CardContent
          sx={{ padding: { xs: '8px', sm: '12px' }, textAlign: 'center' }}
        >
          <Typography
            variant="caption"
            color={theme.palette.text.primary}
            component="div"
            sx={{
              textAlign: 'center',
              textTransform: 'capitalize',
              fontWeight: 600,
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              transition: 'all 0.2s ease',
              wordBreak: 'break-word',
            }}
          >
            {name.split('-').join(' ')}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
});

export default PokemonCard;
