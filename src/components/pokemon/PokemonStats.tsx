'use client'

import { Box, Typography, LinearProgress, Grid } from '@mui/material'

import { PokemonStat } from '@/api/types'
import { formatStatName } from '@/utils'

interface PokemonStatsProps {
  stats: PokemonStat[]
}

export default function Stats({ stats }: PokemonStatsProps) {
  const total = stats.reduce((acc, s) => acc + s.base_stat, 0)

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Grid container spacing={2}>
        {stats.map((stat) => (
          <Grid size={{ xs: 12 }} key={stat.stat.name}>
            <Box display="flex" justifyContent="space-between" mb={0.5}>
              <Typography
                variant="body2"
                fontWeight={600}
                textTransform="capitalize"
                color="#ccc"
              >
                {formatStatName(stat.stat.name)}
              </Typography>

              <Typography
                variant="body2"
                fontWeight={700}
                color="#ccc"
              >
                {stat.base_stat}
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={Math.min((stat.base_stat / 255) * 100, 100)}
              color='primary'
              sx={{
                height: 8,
                borderRadius: 2,
                backgroundColor: '#1a1a1a'
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* TOTAL */}
      <Box
        mt={0.5}
        borderTop="1px solid #eee"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body1" fontWeight={700} color="#aaa">
          Total
        </Typography>

        <Typography variant="h6" fontWeight={800} color="#fff">
          {total}
        </Typography>
      </Box>
    </Box>
  )
}