'use client'

import { Grid, Container, Typography, Box, CircularProgress } from '@mui/material'
import { useMemo } from 'react'

import { API } from '@/api'
import { useApi } from '@/api/hooks/useApi'
import { Generation } from '@/api/types'
import PokemonCard from '@/components/pokemon/PokemonCard'
import { usePokeStore } from '@/store/usePokeStore'
import { getNumberFromUrl } from '@/utils'

const Home = () => {
  const language = usePokeStore(e => e.language)
  const generation = usePokeStore(e => e.generation)
  const { data, isLoading } = useApi<Generation>({
    key: API.POKEMON_GENERATION(generation),
    query: { lang: language }
  })

  const sortedSpecies = useMemo(
    () => data?.pokemon_species
      ?.slice()
      .sort((a, b) => Number(getNumberFromUrl(a.url)) - Number(getNumberFromUrl(b.url))),
    [data?.pokemon_species]
  )

  if (isLoading) {
    return (
      <Container sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Typography variant="h4" align="center" sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
            Pokédex
          </Typography>
          <CircularProgress size={40} />
          <Typography variant="body1" color="textSecondary" align="center">
            Cargando Pokémon...
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 700,
          mb: { xs: 3, sm: 4 },
          fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' },
        }}
      >
        Pokédex
      </Typography>
      <Grid
        container
        spacing={{ xs: 1.5, sm: 2 }}
        justifyContent="center"
        sx={{
          animation: 'fadeIn 0.4s ease-in-out',
        }}
      >
        {sortedSpecies?.map((pokemon) => (
          <PokemonCard key={pokemon.name} {...pokemon} />
        ))}
      </Grid>
    </Container>
  )
}

export default Home