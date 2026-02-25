'use client'

import { Grid, Container, Typography } from '@mui/material'

import { API } from '@/api/endpoints'
import PokemonCard from '@/components/PokemonCard'
import { useApi } from '@/hooks/useApi'
import { TableResponse } from '@/lib/types'
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