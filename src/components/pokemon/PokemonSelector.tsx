'use client'
import { Shuffle } from '@mui/icons-material'
import { Box, Button, IconButton, TextField, useTheme } from '@mui/material'
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
  }, [localName, onChangeName])

  // Debounce para número
  useEffect(() => {
    const t = setTimeout(() => {
      onChangeDex(localDex)
    }, 300)
    return () => clearTimeout(t)
  }, [localDex, onChangeDex])

  return (
    <Box
      display="flex"
      gap={{ xs: 0.75, sm: 1 }}
      alignItems="center"
      flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
      justifyContent={{ xs: 'center', sm: 'flex-start' }}
    >
      <TextField
        value={localName}
        onChange={e => setLocalName(e.target.value)}
        variant="outlined"
        size="small"
        className='capitalize'
        label="Nombre"
        slotProps={{
          input: {
            sx: {
              fontSize: { xs: '0.875rem', sm: '1rem' },
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: (theme) => theme.palette.primary.main,
              },
            },
          },
        }}
        sx={{
          minWidth: { xs: 120, sm: 150 },
          '& .MuiOutlinedInput-root': {
            transition: 'all 0.2s ease',
          },
        }}
      />

      <TextField
        type="number"
        variant="outlined"
        value={localDex}
        onChange={e => setLocalDex(Number(e.target.value))}
        size="small"
        label="Dex #"
        slotProps={{
          input: {
            sx: {
              fontSize: { xs: '0.875rem', sm: '1rem' },
              transition: 'all 0.2s ease',
            },
          },
        }}
        sx={{
          minWidth: { xs: 90, sm: 110 },
        }}
      />

      <Button
        variant="contained"
        color="primary"
        startIcon={<Shuffle />}
        onClick={onRandomize}
        sx={{
          borderRadius: 2,
          display: { sm: 'flex', xs: 'none' },
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        }}
      >
        <Box component="span" color={getTextColor(theme.palette.primary.main)}>
          Aleatorio
        </Box>
      </Button>
      <IconButton
        onClick={onRandomize}
        color='primary'
        aria-label='randomize'
        sx={{
          display: { xs: 'flex', sm: 'none' },
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'rotate(15deg) scale(1.1)',
          },
          '&:active': {
            transform: 'rotate(15deg) scale(0.95)',
          },
        }}
      >
        <Shuffle />
      </IconButton>
    </Box>
  )
}