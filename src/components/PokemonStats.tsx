'use client'

import {
  Box,
  Typography,
  LinearProgress,
} from '@mui/material'

import { PokemonStat } from '@/lib/types'
import { formatStatName, getStatColor } from '@/utils'

interface PokemonStatsProps {
  stats: PokemonStat[]
}

const Stats = ({
  stats,
}: PokemonStatsProps) => (
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
)


export default Stats
