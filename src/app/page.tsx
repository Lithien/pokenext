'use client'

import { Grid, Container, Typography } from '@mui/material'

import { API } from '@/api'
import { useApi } from '@/api/hooks/useApi'
import { TableResponse } from '@/api/types'
import PokemonCard from '@/components/pokemon/PokemonCard'
import { usePokeStore } from '@/store/usePokeStore'

const Home = () => {
  const { language } = usePokeStore()
  const { data, isLoading } = useApi<TableResponse>({
    key: API.POKEMON,
    query: { limit: 251, lang: language }
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
        {data?.results.map((pokemon) => (
          <PokemonCard key={pokemon.name} {...pokemon} />
        ))}
      </Grid>
    </Container>
  )
}

export default Home