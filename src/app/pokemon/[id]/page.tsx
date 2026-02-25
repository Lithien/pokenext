'use client'

import { Typography, Box, Skeleton } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

import { API } from '@/api/endpoints'
import ChainEvolution from '@/components/ChainEvolution'
import ColorPalette from '@/components/ColorPalette'
import { PokemonImageHeader } from '@/components/PokemonImageHeader'
import { PokemonInfoSection } from '@/components/PokemonInfoSection'
import { PokemonSelector } from '@/components/PokemonSelector'
import PokemonStats from '@/components/PokemonStats'
import { PokemonDetailStatsSection } from '@/components/PokemonStatsCard'
import { PokemonTabs } from '@/components/PokemonTabs'
import { useApi } from '@/hooks/useApi'
import { Pokemon, PokemonSpecies } from '@/lib/types'
import { usePokeStore } from '@/store/usePokeStore'
import { findByLanguage, getNumberFromUrl, getPokemonImage } from '@/utils'

const PokemonDetailPage = () => {
  const { id } = useParams()
  const router = useRouter()
  const [tab, setTab] = useState(0)
  
  const { data: pokemon, isLoading: loadingPokemon } = useApi<Pokemon>({ key: API.POKEMON_DETAIL(String(id))})
  const { data: species, isLoading: loadingSpecies } = useApi<PokemonSpecies>({ key: API.POKEMON_SPECIES(String(id)) })

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

  const onChangeDex = (value: number) => {
    if (value < 1 || value > 1350) {
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
    const randomId = Math.floor(Math.random() * 1350) + 1
    router.push(`/pokemon/${randomId}`)
    setTab(0)
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
        onChangeDex={onChangeDex}
        onChangeName={onChangeName}
        onRandomize={onRandomize}
      />

      <PokemonTabs tab={tab} onChange={setTab} />

      {tab === 0 && (<PokemonInfoSection types={pokemon.types} height={pokemon.height / 10} weight={pokemon.weight / 10} />)}
      {tab === 1 && (<ChainEvolution pokemon={pokemon} species={species} />)}
      {tab === 2 && (<ColorPalette />)}
      {tab === 3 && (
        <PokemonDetailStatsSection
          onPlayCry={playCry}
          selectedGame={selectedGame}
          onChangeGame={setSelectedGame}
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
