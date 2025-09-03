'use client'

import { NamedAPIResource } from '@/lib/types'
import { usePokeStore } from '@/store/usePokeStore'
import { getNumberFromUrl, getPokemonImage } from '@/utils'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import Link from 'next/link'

export default function PokemonCard({ name, url }: NamedAPIResource) {
  const { isShiny } = usePokeStore()
  const pokemonId = getNumberFromUrl(url)
  
  return (
    <Link href={`/pokemon/${pokemonId}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ maxWidth: 400, margin: 1 }}>
        <CardMedia
          component="img"
          image={getPokemonImage(pokemonId, 'HOME', true, isShiny)}
          alt={name}
          style={{ imageRendering: 'pixelated', height: '130px', objectFit: 'contain' }}
        />
        <CardContent>
          <Typography variant="caption" color='accent' component="div" textAlign="center" fontWeight={600}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
