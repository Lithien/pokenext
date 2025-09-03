'use client'

import { Grid, Container, Typography } from '@mui/material'
import PokemonCard from '@/components/PokemonCard'
import { fetchPokemons } from '@/lib'
import { useApi } from '@/hooks/useApi'

const Home = () => {
  const { data, loading } = useApi(() => fetchPokemons({ limit: 251 }), [])

  if (loading) {
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