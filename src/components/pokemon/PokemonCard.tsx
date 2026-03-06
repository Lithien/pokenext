'use client'

import { Card, CardContent, CardMedia, Typography, useTheme } from '@mui/material'
import Link from 'next/link'

import { NamedAPIResource } from '@/api/types'
import { usePokeStore } from '@/store/usePokeStore'
import { getNumberFromUrl, getPokemonImage } from '@/utils'

export default function PokemonCard({ name, url }: NamedAPIResource) {
  const theme = useTheme()
  const { isShiny, spriteType } = usePokeStore()
  const pokemonId = getNumberFromUrl(url)
  
  return (
    <Link href={`/pokemon/${name}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ maxWidth: 400, minWidth: 110, margin: 1 }}>
        <CardMedia
          component="img"
          image={getPokemonImage(pokemonId, spriteType, false, isShiny)}
          alt={name}
          onError={(e) => {
            e.currentTarget.style.filter = theme.palette.mode === 'dark' ? 'invert(1)' : 'none'
            e.currentTarget.src = '/pokeball.svg'
          }}
          style={{
            padding: 10,
            imageRendering:
              spriteType === 'default' || spriteType === 'showdown'
                ? 'pixelated'
                : 'auto',
            objectFit: 'contain',
          }}
          width={130}
          height={130}
        />
        <CardContent>
          <Typography
            variant="caption"
            color={theme.palette.text.primary}
            component="div"
            textAlign="center"
            textTransform='capitalize'
            fontWeight={600}
            width={98}
          >
            {name.split('-').join(' ')}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
