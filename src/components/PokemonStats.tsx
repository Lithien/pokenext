'use client'

import {
  Box,
  Typography,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Button,
  FormControl,
  InputLabel
} from '@mui/material'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { PokemonStat, VersionGameIndex } from '@/lib/types'
import { formatStatName, getStatColor } from '@/utils'
import GraphicEqIcon from '@mui/icons-material/GraphicEq'

interface PokemonStatsProps {
  stats: PokemonStat[]
  shinyMode: boolean
  onToggleShiny: () => void
  onPlayCry: () => void
  selectedGame: string
  onChangeGame: (game: string) => void
  gameOptions: VersionGameIndex[]
}

const Stats = ({
  stats,
  shinyMode,
  onToggleShiny,
  onPlayCry,
  selectedGame,
  onChangeGame,
  gameOptions
}: PokemonStatsProps) => {
  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Stack direction="row" spacing={2}>
          <Button
            variant={shinyMode ? 'contained' : 'outlined'}
            color="warning"
            onClick={onToggleShiny}
            startIcon={<GraphicEqIcon />}
          >
            {shinyMode ? 'Shiny' : 'Normal'}
          </Button>

          <Button variant="outlined" onClick={onPlayCry} startIcon={<VolumeUpIcon />}>
            Crie
          </Button>
        </Stack>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Version</InputLabel>
          <Select
            value={selectedGame}
            label="Versión"
            onChange={(e) => onChangeGame(e.target.value)}
            sx={{ textTransform: 'capitalize' }}
          >
            {gameOptions.map((game) => (
              <MenuItem key={game.version.name} value={game.version.name} sx={{ textTransform: 'capitalize' }}>
                {game.version.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Box display="flex" flexDirection="column" gap={2}>
        {stats.map((stat) => (
          <Box key={stat.stat.name}>
            <Typography variant="body2" fontWeight={600} textTransform="capitalize">
              {formatStatName(stat.stat.name)}: {stat.base_stat}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={Math.min((stat.base_stat / 255) * 100, 100)}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getStatColor(stat.stat.name)
                }
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Stats
