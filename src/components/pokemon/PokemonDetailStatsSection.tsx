'use client';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { memo } from 'react';

import StatsRadarChart from '../ui/StatsRadarChart';

import PokemonStats from './PokemonStats';
import WeaknessTable from './WeaknessTable';

import { Pokemon, PokemonSpecies, VersionGameIndex } from '@/api/types';
import { usePokeStore } from '@/store/usePokeStore';
import { getAugmentedTypeColor } from '@/theme/theme';
import { findByLanguage, getTextColor } from '@/utils';

interface PokemonDetailStatsSectionProps {
  onPlayCry: () => void;
  selectedGame: string;
  onChangeGame: (game: string) => void;
  gameOptions: VersionGameIndex[];
  pokemon: Pokemon;
  species: PokemonSpecies;
}

export const PokemonDetailStatsSection = memo(
  function PokemonDetailStatsSection({
    onPlayCry,
    selectedGame,
    onChangeGame,
    gameOptions,
    pokemon,
    species,
  }: PokemonDetailStatsSectionProps) {
    const theme = useTheme();
    const language = usePokeStore((s) => s.language);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const panelBg =
      theme.palette.mode === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[100];

    const panelBorder =
      theme.palette.mode === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.grey[300];

    return (
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 4,
          p: 4,
          borderRadius: 4,
          bgcolor: panelBg,
          border: `1px solid ${panelBorder}`,
          overflow: 'hidden',
          color: theme.palette.text.primary,
        }}
      >
        {/* Columna izquierda */}
        <Box sx={{ flex: 1, zIndex: 1 }}>
          {/* Nombre + ID */}
          <Box
            display="flex"
            gap={2}
            alignItems="center"
            justifyContent={'space-between'}
            mb={1}
          >
            <Box display="flex" alignItems="center">
              <Typography
                variant="h4"
                fontWeight="bold"
                mb={2}
                className="capitalize"
              >
                {pokemon.name}
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: theme.palette.text.secondary }}
                mb={2}
                ml={1}
              >
                #{pokemon.id}
              </Typography>
            </Box>

            <IconButton aria-label="sound" onClick={onPlayCry}>
              <VolumeUpIcon />
            </IconButton>
          </Box>

          {/* Género */}
          <Typography
            variant="subtitle1"
            mb={1}
            sx={{ color: theme.palette.text.secondary }}
          >
            {findByLanguage(species.genera, language, 'genus') || 'Pokémon'}
          </Typography>

          {/* Types */}
          <Box display="flex">
            {pokemon.types.map((type, index) => {
              const color = getAugmentedTypeColor(theme, type.type.name);

              const bg =
                theme.palette.mode === 'dark' ? color.main : `${color.dark}33`;

              return (
                <span
                  key={index}
                  className="px-2 py-0.5 rounded-md text-xs font-medium shadow-sm border border-black/10 capitalize mr-2.5"
                  style={{
                    backgroundColor: bg,
                    color: color.contrastText,
                  }}
                >
                  {type.type.name}
                </span>
              );
            })}
          </Box>

          {/* Pokédex entry */}
          <Typography variant="h5" mt={6} mb={2}>
            Pokédex Entry
          </Typography>

          <Typography variant="body2" mb={2}>
            {findByLanguage(
              species.flavor_text_entries,
              language,
              'flavor_text'
            ) || 'No flavor text available in this language.'}
          </Typography>

          {/* Height & Weight */}
          <Box display="flex" gap={4} flexWrap="wrap">
            <Box>
              <Typography variant="body2" color="text.secondary">
                Height
              </Typography>
              <Typography variant="h6">{pokemon.height / 10} m</Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                Weight
              </Typography>
              <Typography variant="h6">{pokemon.weight / 10} kg</Typography>
            </Box>
          </Box>

          {/* Abilities */}
          <Typography variant="h6" mt={4} mb={2}>
            Abilities
          </Typography>

          <Box
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            gap={1}
          >
            {pokemon.abilities.map((abilityInfo) => {
              const baseColor =
                abilityInfo.slot === 1
                  ? theme.palette.primary.main
                  : abilityInfo.slot === 2
                    ? theme.palette.secondary.main
                    : theme.palette.accent.main;

              const bg =
                theme.palette.mode === 'dark' ? baseColor : `${baseColor}33`;

              const text = getTextColor(bg);

              return (
                <span
                  key={abilityInfo.slot}
                  className="px-2 py-0.5 rounded-md text-xs font-medium shadow-sm border border-black/10 capitalize mr-2.5"
                  style={{
                    backgroundColor: bg,
                    color: text,
                  }}
                >
                  {abilityInfo.ability.name}{' '}
                  {abilityInfo.is_hidden && '(Hidden)'}
                </span>
              );
            })}
          </Box>

          {/* Version selector */}
          {gameOptions.length > 0 && (
            <Box mt={2}>
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
                  <MenuItem
                    key={game.version.name}
                    value={game.version.name}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {game.version.name.replace('-', ' ')}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          )}
          <WeaknessTable types={pokemon.types} />
        </Box>

        {/* Columna derecha: Stats */}
        <Box sx={{ flex: 1, zIndex: 1 }}>
          <PokemonStats stats={pokemon.stats} />
          <StatsRadarChart stats={pokemon.stats} />
        </Box>
      </Box>
    );
  }
);
