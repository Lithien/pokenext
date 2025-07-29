'use client'

import { useParams } from 'next/navigation'
import { useApi } from '@/hooks/useApi'
import { fetchPokemonById, fetchPokemonSpecies } from '@/lib'
import { Typography, Container, Card, CardMedia, Chip, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import PokemonStats from '@/components/PokemonStats'
import { useState } from 'react'
import { FlavorText, PokemonType } from '@/lib/types'
import Image from 'next/image'

const PokemonDetailPage = () => {
  const { id } = useParams()
  const theme = useTheme()

  const { data: pokemon, loading: loadingPokemon } = useApi(() => fetchPokemonById(String(id)), [id])
  const { data: species, loading: loadingSpecies } = useApi(() => fetchPokemonSpecies(String(id)), [id])

  const [shinyMode, setShinyMode] = useState(false)
  const [selectedGame, setSelectedGame] = useState('')

  if (loadingPokemon || loadingSpecies || !pokemon) {
    return <Typography variant="h6" align="center">Loading...</Typography>
  }

  const toggleShiny = () => setShinyMode(!shinyMode)

  const playCry = () => {
    const cryUrl = pokemon!.cries?.latest || pokemon!.cries?.legacy
    if (cryUrl) {
      const audio = new Audio(cryUrl)
      audio.play()
    }
  }

  const gameOptions = pokemon.game_indices

  if (selectedGame === '') {
    setSelectedGame(gameOptions[0].version.name)
  }

  const getColor = (type: string) => theme.pokedex.getColorByType(type) || theme.palette.grey[500]
  

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom textTransform="capitalize">
        {pokemon!.name} #{pokemon!.id}
      </Typography>

      <Card sx={{ maxWidth: 300, mx: 'auto', mb: 2 }}>
        <CardMedia
          component="img"
          height="300"
          image={pokemon!.sprites.other['official-artwork'][shinyMode ? 'front_shiny' : 'front_default']}
          alt={pokemon!.name}
        />
      </Card>

      <Typography variant="h6" gutterBottom>Types</Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        {pokemon!.types.map((t: PokemonType) => (
          <Image
            src={`/${t.type.name}.svg`}
            alt={t.type.name}
            width={50}
            height={50}
          />
        ))}
      </Box>

      <Typography variant="h6" gutterBottom>Stats</Typography>
      <PokemonStats
        stats={pokemon.stats}
        shinyMode={shinyMode}
        onToggleShiny={toggleShiny}
        onPlayCry={playCry}
        selectedGame={selectedGame}
        onChangeGame={(game) => setSelectedGame(game)}
        gameOptions={gameOptions}
      />

      {species && (
        <>
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Description</Typography>
          <Typography>
            {species.flavor_text_entries.find(
              (entry: FlavorText) => entry.language.name === 'en' && entry.version.name === selectedGame
            )?.flavor_text.replace(/\f/g, ' ') || 'Sin descripción disponible.'}
          </Typography>
        </>
      )}
    </Container>
  )
}

export default PokemonDetailPage
