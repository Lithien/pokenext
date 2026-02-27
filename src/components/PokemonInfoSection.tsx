'use client'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import { PokemonType } from '@/api/types'

export const PokemonInfoSection = ({
  types,
  height,
  weight
}: {
  types: PokemonType[]
  height: number
  weight: number
}) => (
  <Box display="flex" gap={6} mt={3} flexWrap="wrap">
    <Box>
      <Typography variant="body2" color="secondary">Type</Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        {types.map((t: PokemonType) => (
          <Image
            src={`/${t.type.name}.svg`}
            alt={t.type.name}
            width={40}
            height={40}
            key={t.type.name}
          />
        ))}
      </Box>
    </Box>
    <Box>
      <Typography variant="body2" color="secondary">Height</Typography>
      <Typography variant="h6" color='accent'>{height.toFixed(1)} m</Typography>
    </Box>
    <Box>
      <Typography variant="body2" color="secondary">Weight</Typography>
      <Typography variant="h6" color='accent'>{weight.toFixed(1)} kg</Typography>
    </Box>
  </Box>
)
