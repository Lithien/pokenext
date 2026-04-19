'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import { PokemonType } from '@/api/types';

export const PokemonInfoSection = ({
  types,
  height,
  weight,
}: {
  types: PokemonType[];
  height: number;
  weight: number;
}) => (
  <Box
    display="flex"
    gap={{ xs: 2, sm: 4, md: 6 }}
    mt={3}
    flexWrap="wrap"
    sx={{
      p: { xs: 2, sm: 3 },
      backgroundColor: (theme) =>
        theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.05)'
          : 'rgba(0, 0, 0, 0.02)',
      borderRadius: 2,
      transition: 'all 0.3s ease',
    }}
  >
    <Box>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          fontWeight: 600,
          mb: 1,
          fontSize: { xs: '0.75rem', sm: '0.875rem' },
        }}
      >
        Tipo
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        {types.map((t: PokemonType) => (
          <Image
            src={`/${t.type.name}.svg`}
            alt={t.type.name}
            width={40}
            height={40}
            key={t.type.name}
            style={{ transition: 'transform 0.2s ease' }}
          />
        ))}
      </Box>
    </Box>
    <Box>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          fontWeight: 600,
          mb: 1,
          fontSize: { xs: '0.75rem', sm: '0.875rem' },
        }}
      >
        Altura
      </Typography>
      <Typography
        variant="h6"
        color="accent"
        sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, fontWeight: 600 }}
      >
        {height.toFixed(1)} m
      </Typography>
    </Box>
    <Box>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          fontWeight: 600,
          mb: 1,
          fontSize: { xs: '0.75rem', sm: '0.875rem' },
        }}
      >
        Peso
      </Typography>
      <Typography
        variant="h6"
        color="accent"
        sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, fontWeight: 600 }}
      >
        {weight.toFixed(1)} kg
      </Typography>
    </Box>
  </Box>
);
