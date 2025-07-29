'use client'

import { NamedAPIResource } from '@/lib/types'
import { getNumberFromUrl, getPokemonImage } from '@/utils'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import Link from 'next/link'

export default function PokemonCard({ name, url }: NamedAPIResource) {
  const pokemonId = getNumberFromUrl(url)
  return (
    <Link href={`/pokemon/${pokemonId}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ maxWidth: 200, margin: 1 }}>
        <CardMedia component="img" height="140" image={getPokemonImage(pokemonId)} alt={name} />
        <CardContent>
          <Typography variant="h6" component="div" textAlign="center">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
