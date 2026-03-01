'use client'

import { Select, MenuItem, Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'

import { LANGUAGES, LANGUAGE_FLAGS } from '@/constants/common'
import { usePokeStore } from '@/store/usePokeStore'

export const LanguageSelector = () => {
  const theme = useTheme()
  const { language, setLanguage } = usePokeStore()

  return (
    <Box>
      <Select
        value={language}
        onChange={(e) => setLanguage(e.target.value as LANGUAGES)}
        size="small"
        sx={{
          minWidth: 60,
          zIndex: 9999,
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          borderRadius: 2,
          color: theme.palette.mode === 'dark' ? '#fff' : '#111',
          backgroundColor:
            theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(0,0,0,0.05)',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor:
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.3)'
                : 'rgba(0,0,0,0.3)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor:
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.6)'
                : 'rgba(0,0,0,0.6)',
          },
        }}
      >
        {Object.values(LANGUAGES).map((lang) => (
          <MenuItem
            key={lang}
            value={lang}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textTransform: 'uppercase',
            }}
          >
            <Typography component="span" fontSize="1.2rem">
              <Image
                src={LANGUAGE_FLAGS[lang]}
                alt={lang}
                width={20}
                height={20}
              />
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}