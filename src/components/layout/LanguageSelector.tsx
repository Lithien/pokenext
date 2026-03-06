'use client'

import { Select, MenuItem, Box } from '@mui/material'
import Image from 'next/image'

import { LANGUAGES, LANGUAGE_FLAGS } from '@/constants/common'
import { usePokeStore } from '@/store/usePokeStore'

export const LanguageSelector = () => {
  const language = usePokeStore(e => e.language)
  const setLanguage = usePokeStore(e => e.setLanguage)

  return (
    <Box lineHeight={0}>
      <Select
        value={language}
        onChange={(e) => setLanguage(e.target.value as LANGUAGES)}
        size="small"
        sx={theme => ({
          minWidth: 60,
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
        })}
      >
        {Object.values(LANGUAGES).map((lang) => (
          <MenuItem
            key={lang}
            value={lang}
            aria-label={lang}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}
          >
            <Image
              src={LANGUAGE_FLAGS[lang]}
              alt={lang}
              width={20}
              height={20}
              style={{ height: '20px !important'}}
            />
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}