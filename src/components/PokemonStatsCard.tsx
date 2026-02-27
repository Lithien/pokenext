'use client'

import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { Box, Typography, IconButton, Select, MenuItem, useMediaQuery, useTheme } from '@mui/material'

import { VersionGameIndex } from '@/lib/types'


interface PokemonDetailStatsSectionProps {
  onPlayCry: () => void
  selectedGame: string
  onChangeGame: (game: string) => void
  gameOptions: VersionGameIndex[]
  flavorText: string
  statsComponent: React.ReactNode
}

export const PokemonDetailStatsSection = ({
  onPlayCry,
  selectedGame,
  onChangeGame,
  gameOptions,
  flavorText,
  statsComponent
}: PokemonDetailStatsSectionProps) => {
  const theme = useTheme()
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
        <Box display="flex" gap={2} alignItems="center" mb={2}>
          <IconButton onClick={onPlayCry}>
            <VolumeUpIcon />
          </IconButton>
        </Box>

        <Typography variant="body1" fontWeight="bold" mb={1}>
          Pokédex Entry
        </Typography>

        <Typography variant="body2" mb={2}>
          {flavorText || 'No description available.'}
        </Typography>

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
        {statsComponent}
      </Box>
    </Box>
  )
}
