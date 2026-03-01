'use client'

import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { Box, Typography, IconButton, Select, MenuItem, useMediaQuery, useTheme } from '@mui/material'

import PokemonStats from './PokemonStats'

import { Pokemon, PokemonSpecies, VersionGameIndex } from '@/api/types'
import { usePokeStore } from '@/store/usePokeStore'
import { findByLanguage } from '@/utils'


interface PokemonDetailStatsSectionProps {
  onPlayCry: () => void
  selectedGame: string
  onChangeGame: (game: string) => void
  gameOptions: VersionGameIndex[]
  pokemon: Pokemon
  species: PokemonSpecies
}

export const PokemonDetailStatsSection = ({
  onPlayCry,
  selectedGame,
  onChangeGame,
  gameOptions,
  pokemon,
  species
}: PokemonDetailStatsSectionProps) => {
  const theme = useTheme()
  const { language } = usePokeStore()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: 4,
        p: 4,
        borderRadius: 4,
        bgcolor: theme.palette.grey[900],
        overflow: 'hidden',
        color: theme.palette.text.primary
      }}
    >
      {/* Columna izquierda: descripción */}
      <Box sx={{ flex: 1, zIndex: 1 }}>
        {/* Nombre y número de Pokédex */}
        <Box display="flex" gap={2} alignItems="center" justifyContent={'space-between'} mb={1}>
          <Box display="flex" alignContent="center" alignItems="center">
            <Typography variant='h4' fontWeight="bold" mb={2} className='capitalize'>
              {pokemon.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: theme.palette.grey[500] }} mb={2} ml={1}>
              {`#${pokemon.id}`}
            </Typography>
          </Box>
          <IconButton onClick={onPlayCry}>
            <VolumeUpIcon />
          </IconButton>
        </Box>
        {/* Género */}
        <Typography variant="subtitle1" mb={1} sx={{ color: theme.palette.grey[500] }}>
          {findByLanguage(species.genera, language, 'genus') || 'Pokémon'}
        </Typography>
        {/* Types */}
        <Box display="flex">
          {pokemon.types.map((type, index) => (
            <span key={index}
              className="px-2 block py-0.5 rounded-md text-xs font-medium shadow-sm border border-black/10 capitalize mr-2.5"
              style={{ color: theme.palette.common.black, backgroundColor: index === 0 ? theme.palette.primary.main : theme.palette.secondary.main }}
            >
              {type.type.name}
            </span>
          ))}
        </Box>
        {/* Pokédex entry */}
        <Typography variant="h5" mt={6} mb={2}>
          Pokédex Entry
        </Typography>
        <Typography variant="body2" mb={2}>
          {findByLanguage(species.flavor_text_entries, language, 'flavor_text') || 'No flavor text available in this language.'}
        </Typography>
        {/* Altura y peso */}
        <Box display="flex" gap={4} flexWrap="wrap">
          <Box>
            <Typography variant="body2" color="secondary">Height</Typography>
            <Typography variant="h6" color='primary'>{pokemon.height / 10} m</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="secondary">Weight</Typography>
            <Typography variant="h6" color='primary'>{pokemon.weight / 10} kg</Typography>
          </Box>
        </Box>
        {/* Habilidades */}
        <Typography variant="h6" mt={4} mb={2}>
          Abilities
        </Typography>
        <Box display="flex" alignItems='flex-start' flexDirection="column" gap={1}>
          {pokemon.abilities.map((abilityInfo) => (
            <span key={abilityInfo.slot}
              className="px-2 py-0.5 rounded-md text-xs font-medium shadow-sm border border-black/10 capitalize mr-2.5"
              style={{ color: theme.palette.common.black, backgroundColor: abilityInfo.slot === 1 ? theme.palette.primary.main : abilityInfo.slot === 2 ? theme.palette.secondary.main : theme.palette.accent.main }}
            >
              {abilityInfo.ability.name} {abilityInfo.is_hidden && '(Hidden)'}
            </span>
          ))}
        </Box>


        {gameOptions.length > 0 && (
          <Box>
            <Typography variant="caption" mr={1}>
              Version:
            </Typography>
            <Select
              value={selectedGame}
              onChange={(e) => onChangeGame(e.target.value)}
              size="small"
              sx={{ textTransform: 'capitalize' }}
            >
              {gameOptions.map((game) => (
                <MenuItem key={game.version.name} value={game.version.name} sx={{ textTransform: 'capitalize' }}>
                  {game.version.name.replace('-', ' ')}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}
      </Box>

      {/* Columna derecha: statsComponent ya creado */}
      <Box sx={{ flex: 1, zIndex: 1 }}>
        <PokemonStats stats={pokemon.stats} />
      </Box>
    </Box >
  )
}
