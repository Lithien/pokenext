'use client'
import { Shuffle } from '@mui/icons-material'
import { Box, Button, TextField } from '@mui/material'

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
  <Box display="flex" gap={1} alignItems="center">
    <TextField value={name} onChange={e => onChangeName(e.target.value)} variant="outlined" size="small" />
    <TextField type="number" variant='outlined' value={dexNumber} onChange={e => onChangeDex(Number(e.target.value))} size="small" />
    <Button
      variant="contained"
      color="primary"
      startIcon={<Shuffle />}
      onClick={onRandomize}
      sx={{ borderRadius: 5 }}
    >
      <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>Randomize</Box>
    </Button>
  </Box>
)
