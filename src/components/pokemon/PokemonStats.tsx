'use client'

import { Box, Typography, LinearProgress, Grid, useTheme } from '@mui/material'

import { PokemonStat } from '@/api/types'
import { formatStatName } from '@/utils'

interface PokemonStatsProps {
  stats: PokemonStat[]
}

export default function Stats({ stats }: PokemonStatsProps) {
  const total = stats.reduce((acc, s) => acc + s.base_stat, 0)
  const theme = useTheme()
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        {stats.map((stat) => (
          <Grid size={{ xs: 12 }} key={stat.stat.name}>
            <Box display="flex" justifyContent="space-between" mb={0.75}>
              <Typography
                variant="body2"
                fontWeight={600}
                textTransform="capitalize"
                color={theme.palette.text.secondary}
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              >
                {formatStatName(stat.stat.name)}
              </Typography>

              <Typography
                variant="body2"
                fontWeight={700}
                color={theme.palette.text.primary}
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              >
                {stat.base_stat}
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={Math.min((stat.base_stat / 255) * 100, 100)}
              color='primary'
              aria-label={`${formatStatName(stat.stat.name)}: ${stat.base_stat}`}
              sx={{
                height: 8,
                borderRadius: 2,
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* TOTAL */}
      <Box
        mt={1}
        pt={2}
        borderTop={`1px solid ${theme.palette.divider}`}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          p: { xs: 1.5, sm: 2 },
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.02)',
          borderRadius: 1,
          transition: 'all 0.3s ease',
        }}
      >
        <Typography
          variant="body1"
          fontWeight={700}
          color={theme.palette.text.secondary}
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          Total
        </Typography>

        <Typography
          variant="h6"
          fontWeight={800}
          color={theme.palette.primary.main}
          sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
        >
          {total}
        </Typography>
      </Box>
    </Box>
  )
}