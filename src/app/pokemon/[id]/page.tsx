'use client'

import { Typography, Box, Skeleton } from '@mui/material'
import { useParams } from 'next/navigation'

import usePokemon from './hooks/usePokemon'

import ChainEvolution from '@/components/ChainEvolution'
import ColorPalette from '@/components/ColorPalette'
import { PokemonImageHeader } from '@/components/PokemonImageHeader'
import { PokemonInfoSection } from '@/components/PokemonInfoSection'
import { PokemonSelector } from '@/components/PokemonSelector'
import PokemonStats from '@/components/PokemonStats'
import { PokemonDetailStatsSection } from '@/components/PokemonStatsCard'
import { PokemonTabs } from '@/components/PokemonTabs'
import { findByLanguage, getPokemonImage } from '@/utils'

const PokemonDetailPage = () => {
  const { id } = useParams()
  const { fn, data } = usePokemon({ id: String(id) })
  const { pokemon, species, selectedGame, gameOptions, language, isShiny, tab } = data

  if (data.loading) {
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

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PokemonImageHeader
        imageUrl={getPokemonImage(pokemon.id, 'HOME', true, isShiny)}
        name={pokemon.name}
        genere={findByLanguage(species.genera, language, 'genus') || 'Pokémon'}
      />

      <PokemonSelector
        dexNumber={pokemon.id}
        name={pokemon.name}
        onChangeDex={fn.onChangeDex}
        onChangeName={fn.onChangeName}
        onRandomize={fn.onRandomize}
      />

      <PokemonTabs tab={tab} onChange={fn.setTab} />

      {tab === 0 && (<PokemonInfoSection types={pokemon.types} height={pokemon.height / 10} weight={pokemon.weight / 10} />)}
      {tab === 1 && (<ChainEvolution pokemon={pokemon} species={species} />)}
      {tab === 2 && (<ColorPalette />)}
      {tab === 3 && (
        <PokemonDetailStatsSection
          onPlayCry={fn.playCry}
          selectedGame={selectedGame}
          onChangeGame={fn.setSelectedGame}
          gameOptions={gameOptions}
          flavorText={findByLanguage(species.flavor_text_entries, language, 'flavor_text') || 'No flavor text available in this language.'}
          statsComponent={<PokemonStats stats={pokemon.stats} />}
        />
      )}

      <Typography mt={4} variant="body2" color="text.secondary" textAlign="center">
        More Pokémon details coming in future updates
      </Typography>
    </Box>
  )
}

export default PokemonDetailPage
