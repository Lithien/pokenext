'use client';

import { MenuItem, Box, SxProps, Theme } from '@mui/material';
import Image from 'next/image';

import { SelectField } from './SelectField';

import { LANGUAGES, LANGUAGE_FLAGS } from '@/constants/common';
import { usePokeStore } from '@/store/usePokeStore';

export const LanguageSelector = () => {
  const language = usePokeStore((e) => e.language);
  const setLanguage = usePokeStore((e) => e.setLanguage);

  const selectSx: SxProps<Theme> = (theme) => ({
    minWidth: { xs: 50, sm: 70 },
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
    '& .MuiOutlinedInput-input': {
      py: { xs: 0.75, sm: 1 },
      fontSize: { xs: '0.875rem', sm: '1rem' },
    },
    transition: 'all 0.2s ease',
  });

  return (
    <Box lineHeight={0}>
      <SelectField
        label="Idioma"
        value={language}
        onChange={(value) => setLanguage(value as LANGUAGES)}
        options={[]}
        sx={selectSx}
      >
        {Object.values(LANGUAGES).map((lang) => (
          <MenuItem
            key={lang}
            value={lang}
            aria-label={lang}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Image
              src={LANGUAGE_FLAGS[lang]}
              alt={lang}
              width={18}
              height={18}
              style={{ height: '18px', width: '18px' }}
            />
          </MenuItem>
        ))}
      </SelectField>
    </Box>
  );
};
