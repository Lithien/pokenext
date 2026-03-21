'use client'

import { MenuItem } from '@mui/material'

import { SelectField } from './SelectField'

import { SpriteType, SPRITE_TYPES } from '@/constants'
import { usePokeStore } from '@/store/usePokeStore'

const SpriteSelector = () => {
  const spriteType = usePokeStore((e) => e.spriteType)
  const setSpriteType = usePokeStore((e) => e.setSpriteType)

  return (
    <SelectField
      label="Sprite"
      value={spriteType}
      onChange={(value) => setSpriteType(value as SpriteType)}
      options={[]}
      sx={{
        minWidth: { xs: 100, sm: 130 },
        zIndex: 9999,
        '& .MuiOutlinedInput-input': {
          py: { xs: 0.75, sm: 1 },
          fontSize: { xs: '0.875rem', sm: '1rem' },
        },
      }}
    >
      {SPRITE_TYPES.map((t) => (
        <MenuItem key={t.id} value={t.id} aria-label={t.label}>
          {t.label}
        </MenuItem>
      ))}
    </SelectField>
  )
}

export default SpriteSelector