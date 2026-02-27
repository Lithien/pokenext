'use client'

import LockIcon from '@mui/icons-material/Lock'
import { Box, Typography, IconButton } from '@mui/material'

import { COLORS } from '@/constants/common'
// import { usePokeStore } from '@/store/usePokeStore'
import { useThemeStore } from '@/store/useThemeStore'
// import { convertRGBToHex } from '@/utils'

interface ColorCardProps {
  hex: string
  index: number
}

const ColorCard = ({ hex, index }: ColorCardProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="#0F0F10"
      borderRadius="12px"
      p={2}
      sx={{ width: 280 }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          sx={{
            width: 32,
            height: 32,
            bgcolor: hex,
            borderRadius: '50%',
            border: '2px solid #1e1e1e'
          }}
        />
        <Box>
          <Typography variant="body2" color="#aaa">
            {COLORS?.[index]?.name}
          </Typography>
          <Typography variant="caption" color="#777">
            {hex.toUpperCase()}
          </Typography>
        </Box>
      </Box>
      <IconButton size="small" sx={{ color: '#777' }}>
        <LockIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}

export default function ColorPalette() {
  const { colors } = useThemeStore()

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <ColorCard hex={colors.primary} index={0} />
      <ColorCard hex={colors.secondary} index={1} />
      <ColorCard hex={colors.accent} index={2} />
    </Box>
  )
}
