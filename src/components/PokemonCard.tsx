'use client'

import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import Link from 'next/link'

import { NamedAPIResource } from '@/lib/types'
import { usePokeStore } from '@/store/usePokeStore'
import { getNumberFromUrl, getPokemonImage } from '@/utils'

export default function PokemonCard({ name, url }: NamedAPIResource) {
  const { isShiny } = usePokeStore()
  const pokemonId = getNumberFromUrl(url)
  
  return (
    <Link href={`/pokemon/${name}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ maxWidth: 400, margin: 1 }}>
        <CardMedia
          component="img"
          image={getPokemonImage(pokemonId, 'HOME', true, isShiny)}
          alt={name}
          style={{ imageRendering: 'pixelated', height: '130px', objectFit: 'contain' }}
        />
        <CardContent>
          <Typography variant="caption" color='accent' component="div" textAlign="center" textTransform='capitalize' fontWeight={600}>
            {/* {name.charAt(0) + name.slice(1)}<br></br> */}
            {name.split('-').join(' ')}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
