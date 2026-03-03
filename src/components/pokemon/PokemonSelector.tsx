'use client'
import { Shuffle } from '@mui/icons-material'
import { Box, Button, TextField, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'

import { getTextColor } from '@/utils'

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
}) => {
  const [localName, setLocalName] = useState(name)
  const [localDex, setLocalDex] = useState(dexNumber)
  const theme = useTheme()

  // Debounce para nombre
  useEffect(() => {
    const t = setTimeout(() => {
      onChangeName(localName)
    }, 300)
    return () => clearTimeout(t)
  }, [localName])

  // Debounce para número
  useEffect(() => {
    const t = setTimeout(() => {
      onChangeDex(localDex)
    }, 300)
    return () => clearTimeout(t)
  }, [localDex])

  return (
    <Box display="flex" gap={1} alignItems="center">
      <TextField
        value={localName}
        onChange={e => setLocalName(e.target.value)}
        variant="outlined"
        size="small"
        className='capitalize'
      />

      <TextField
        type="number"
        variant="outlined"
        value={localDex}
        onChange={e => setLocalDex(Number(e.target.value))}
        size="small"
      />

      <Button
        variant="contained"
        color="primary"
        startIcon={<Shuffle />}
        onClick={onRandomize}
        sx={{ borderRadius: 5 }}
      >
        <Box component="span" color={getTextColor(theme.palette.primary.main)} sx={{ display: { xs: 'none', sm: 'block' } }}>
          Randomize
        </Box>
      </Button>
    </Box>
  )
}