'use client'

import { useParams, useRouter } from 'next/navigation'
import { useApi } from '@/hooks/useApi'
import { fetchPokemonById, fetchPokemonSpecies } from '@/lib'
import { Typography, Container, Card, CardMedia, Chip, Box, Skeleton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import PokemonStats from '@/components/PokemonStats'
import { useState } from 'react'
import { FlavorText, PokemonType } from '@/lib/types'
import Image from 'next/image'
import { PokemonDetailStatsSection } from '@/components/PokemonStatsCard'
import { getNumberFromUrl, getPokemonImage } from '@/utils'
import { PokemonImageHeader } from '@/components/PokemonImageHeader'
import { PokemonInfoSection } from '@/components/PokemonInfoSection'
import { PokemonSelector } from '@/components/PokemonSelector'
import { PokemonTabs } from '@/components/PokemonTabs'
import ChainEvolution from '@/components/ChainEvolution'
import { usePokeStore } from '@/store/usePokeStore'
import ColorPalette from '@/components/ColorPalette'

const PokemonDetailPage = () => {
  const { id } = useParams()
  const router = useRouter()
  const theme = useTheme()
  const [tab, setTab] = useState(0)

  const { data: pokemon, loading: loadingPokemon } = useApi(() => fetchPokemonById(String(id)), [id])
  const { data: species, loading: loadingSpecies } = useApi(() => fetchPokemonSpecies(String(id)), [id])

  const { isShiny, language } = usePokeStore()
  const [selectedGame, setSelectedGame] = useState('')

  if (loadingPokemon || loadingSpecies || !pokemon || !species) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Skeleton variant='circular' width={130} height={130} />
        <Skeleton variant='text' width={130} />
        <Skeleton variant='rounded' width={700} height={40} />
        <Skeleton variant='rounded' width={300} height={40} />
        <Box display="flex" gap={2} flexWrap="wrap">
          <Skeleton variant='rounded' width={50} height={80} />
          <Skeleton variant='rounded' width={50} height={80} />
          <Skeleton variant='rounded' width={50} height={80} />
        </Box>
        <Skeleton variant='text' width={300} />
      </Box>
    )
  }

  const playCry = () => {
    const cryUrl = pokemon!.cries?.latest || pokemon!.cries?.legacy
    if (cryUrl) {
      const audio = new Audio(cryUrl)
      audio.play()
    }
  }

  const gameOptions = pokemon.game_indices

  if (selectedGame === '' && gameOptions.length > 0) {
    setSelectedGame(gameOptions[0].version.name)
  }

  const getColor = (type: string) => theme.pokedex.getColorByType(type) || theme.palette.grey[500]

  const onChangeDex = (value: number) => {
    if (value < 1 || value > 898) {
      return
    }
    router.push(`/pokemon/${value}`)
    setTab(0)
  }
  const onChangeName = (value: string) => {
    if (value.trim() === '') {
      return
    }
    const pokemonId = getNumberFromUrl(value)
    if (pokemonId) {
      router.push(`/pokemon/${pokemonId}`)
      setTab(0)
    } else {
      console.warn('Invalid Pokémon name or ID')
    }
  }
  const onRandomize = () => {
    const randomId = Math.floor(Math.random() * 898) + 1
    router.push(`/pokemon/${randomId}`)
    setTab(0)
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PokemonImageHeader
        imageUrl={getPokemonImage(pokemon.id, 'HOME', true, isShiny)}
        name={pokemon.name}
        genere={species.genera.find(gen => gen.language.name === language)?.genus || 'Pokémon'}
      />

      <PokemonSelector
        dexNumber={pokemon.id}
        name={pokemon.name}
        onChangeDex={onChangeDex}
        onChangeName={onChangeName}
        onRandomize={onRandomize}
      />

      <PokemonTabs tab={tab} onChange={setTab} />

      {tab === 0 && (
        <PokemonInfoSection
          types={pokemon.types}
          height={pokemon.height / 10}
          weight={pokemon.weight / 10}
        />
      )}
      {tab === 1 && (
        <ChainEvolution pokemon={pokemon} species={species} />
      )}
      {tab === 2 && (
        <ColorPalette />
      )}

      <Typography mt={4} variant="body2" color="text.secondary" textAlign="center">
        More Pokémon details coming in future updates
      </Typography>
    </Box>
    // <Container sx={{ py: 4 }}>
    //   <Typography variant="h4" align="center" gutterBottom textTransform="capitalize">
    //     {pokemon!.name} #{pokemon!.id}
    //   </Typography>

    //   <Card sx={{ maxWidth: 300, mx: 'auto', mb: 2 }}>
    //     <CardMedia
    //       component="img"
    //       height="300"
    //       image={pokemon!.sprites.other['official-artwork'][shinyMode ? 'front_shiny' : 'front_default']}
    //       alt={pokemon!.name}
    //     />
    //   </Card>

    //   <Typography variant="h6" gutterBottom>Types</Typography>
    //   <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
    //     {pokemon!.types.map((t: PokemonType) => (
    //       <Image
    //         src={`/${t.type.name}.svg`}
    //         alt={t.type.name}
    //         width={50}
    //         height={50}
    //       />
    //     ))}
    //   </Box>

    //   <Typography variant="h6" gutterBottom>Stats</Typography>


    //   <PokemonDetailStatsSection
    //     statsComponent={<PokemonStats stats={pokemon.stats} />}
    //     shinyMode={shinyMode}
    //     onToggleShiny={toggleShiny}
    //     onPlayCry={playCry}
    //     selectedGame={selectedGame}
    //     onChangeGame={setSelectedGame}
    //     backgroundImageUrl={getPokemonImage(pokemon.id)}
    //     gameOptions={gameOptions}
    //     flavorText={species?.flavor_text_entries.find(
    //       (entry: FlavorText) => entry.language.name === 'en' && entry.version.name === selectedGame
    //     )?.flavor_text.replace(/\f/g, ' ') || 'Sin descripción disponible.'}
    //   />
    // </Container>
  )
}

export default PokemonDetailPage
