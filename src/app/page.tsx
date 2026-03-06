'use client'

import { Grid, Container, Typography } from '@mui/material'

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

  if (isLoading) {
    return <Typography variant="h6" align="center">Loading...</Typography>
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Pokédex
      </Typography>
      <Grid container justifyContent="center">
        {data?.pokemon_species.sort((a, b) => Number(getNumberFromUrl(a.url)) - Number(getNumberFromUrl(b.url))).map((pokemon) => (
          <PokemonCard key={pokemon.name} {...pokemon} />
        ))}
      </Grid>
    </Container>
  )
}

export default Home