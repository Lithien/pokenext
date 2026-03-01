import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

import { SpriteType, SPRITE_TYPES } from "@/constants"
import { usePokeStore } from "@/store/usePokeStore"


const SpriteSelector = () => {
  const { spriteType, setSpriteType } = usePokeStore()

  return (
    <FormControl size="small" sx={{ minWidth: 150, zIndex: 9999 }}>
      <InputLabel>Sprite</InputLabel>
      <Select
        value={spriteType}
        label="Sprite"
        onChange={(e) => setSpriteType(e.target.value as SpriteType)}
      >
        {SPRITE_TYPES.map((t) => (
          <MenuItem key={t.id} value={t.id}>
            {t.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

  )
}

export default SpriteSelector