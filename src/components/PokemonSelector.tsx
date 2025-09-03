'use client'
import { Box, Button, MenuItem, Select, TextField } from '@mui/material'
import { Shuffle } from '@mui/icons-material'

export const PokemonSelector = ({
  dexNumber,
  onChangeDex,
  name,
  onChangeName,
  onRandomize
}: {
  dexNumber: number
  name: string
  onChangeDex: (value: number) => void
  onChangeName: (value: string) => void
  onRandomize: () => void
}) => (
  <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
    <TextField value={name} onChange={e => onChangeName(e.target.value)} variant="outlined" size="small" />
    <Box display="flex" gap={1}>
      <Select value="Dex" size="small" disabled>
        <MenuItem value="Dex">Dex</MenuItem>
      </Select>
      <TextField
        type="number"
        value={dexNumber}
        onChange={e => onChangeDex(Number(e.target.value))}
        size="small"
        inputProps={{ min: 1 }}
      />
    </Box>
    <Button
      variant="contained"
      color="primary"
      startIcon={<Shuffle />}
      onClick={onRandomize}
      sx={{ borderRadius: 5 }}
    >
      Randomize
    </Button>
  </Box>
)
