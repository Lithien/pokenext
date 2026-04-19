'use client';
import { Shuffle } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { allPokemon } from '@/data/pokemons';
import { getTextColor } from '@/utils';

const getGenerationLabel = (id: number) => {
  if (id <= 151) return 'Gen I';
  if (id <= 251) return 'Gen II';
  if (id <= 386) return 'Gen III';
  if (id <= 493) return 'Gen IV';
  if (id <= 649) return 'Gen V';
  if (id <= 721) return 'Gen VI';
  if (id <= 809) return 'Gen VII';
  if (id <= 905) return 'Gen VIII';
  if (id <= 1025) return 'Gen IX';
  return 'Formas especiales';
};

const formatPokemonLabel = (label: string) => {
  const formatted = label
    .split('-')
    .map((part) => {
      if (part === 'mr') return 'Mr.';
      if (part === 'jr') return 'Jr.';
      if (part === 'f') return 'F';
      if (part === 'm') return 'M';
      if (/^\d+$/.test(part)) return part;

      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(' ');

  return formatted
    .replace(/^Mr\. Mime$/, 'Mr. Mime')
    .replace(/^Mime Jr\.$/, 'Mime Jr.')
    .replace(/^Ho Oh$/, 'Ho-Oh')
    .replace(/^Porygon Z$/, 'Porygon-Z')
    .replace(/^Jangmo O$/, 'Jangmo-o')
    .replace(/^Hakamo O$/, 'Hakamo-o')
    .replace(/^Kommo O$/, 'Kommo-o');
};

export const PokemonSelector = ({
  dexNumber,
  onChangeDex,
  name,
  onChangeName,
  onRandomize,
}: {
  dexNumber: number;
  name: string;
  onChangeDex: (value: number) => void;
  onChangeName: (value: string) => void;
  onRandomize: () => void;
}) => {
  const [localName, setLocalName] = useState(name);
  const [localDex, setLocalDex] = useState(dexNumber);
  const theme = useTheme();

  // Debounce para nombre
  useEffect(() => {
    const t = setTimeout(() => {
      onChangeName(localName);
    }, 300);
    return () => clearTimeout(t);
  }, [localName, onChangeName]);

  // Debounce para número
  useEffect(() => {
    const t = setTimeout(() => {
      onChangeDex(localDex);
    }, 300);
    return () => clearTimeout(t);
  }, [localDex, onChangeDex]);

  return (
    <Box
      display="flex"
      gap={{ xs: 0.75, sm: 1 }}
      alignItems="center"
      flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
      justifyContent={{ xs: 'center', sm: 'flex-start' }}
    >
      <Autocomplete
        options={allPokemon}
        getOptionLabel={(option) => formatPokemonLabel(option.label)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={allPokemon.find((p) => p.id === localDex) || null}
        onChange={(_, newValue) => {
          if (newValue) {
            setLocalDex(newValue.id);
            setLocalName(newValue.label);
          }
        }}
        sx={{ minWidth: { xs: 220, sm: 320 } }}
        slotProps={{
          listbox: {
            sx: {
              maxHeight: 360,
              py: 0,
              '& > li': {
                p: 0,
              },
              '& .MuiAutocomplete-option': {
                minHeight: { xs: 34, sm: 44 },
              },
              '& .generation-group-header': {
                position: 'sticky',
                top: 0,
                zIndex: 2,
              },
            },
          },
        }}
        groupBy={(option) => getGenerationLabel(option.id)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Pokemon"
            variant="outlined"
            size="small"
            sx={{
              '& .MuiInputBase-input': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
              },
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box
            component="li"
            {...props}
            key={option.id}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={{ xs: 1, sm: 2 }}
            width="100%"
            sx={{
              px: { xs: 1.25, sm: 2 },
              py: { xs: 0.375, sm: 0.75 },
            }}
          >
            <Typography
              key={option.id}
              variant="body2"
              sx={{
                fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                lineHeight: 1.2,
              }}
            >
              {formatPokemonLabel(option.label)}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.6875rem', sm: '0.75rem' },
                lineHeight: 1,
              }}
            >
              #{option.id}
            </Typography>
          </Box>
        )}
        renderGroup={(params) => (
          <Box key={params.key} component="li" sx={{ m: 0, p: 0 }}>
            <Typography
              className="generation-group-header"
              variant="caption"
              sx={{
                px: { xs: 1.25, sm: 2 },
                py: { xs: 0.5, sm: 1 },
                display: 'block',
                fontWeight: 700,
                fontSize: { xs: '0.625rem', sm: '0.75rem' },
                lineHeight: 1.2,
                bgcolor: 'background.paper',
                color: 'text.secondary',
                borderBottom: '1px solid',
                borderColor: 'divider',
                backdropFilter: 'blur(6px)',
                boxShadow: (theme) => `0 1px 0 ${theme.palette.divider}`,
              }}
            >
              {params.group}
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {params.children}
            </Box>
          </Box>
        )}
      />

      <TextField
        type="number"
        variant="outlined"
        value={localDex}
        onChange={(e) => setLocalDex(Number(e.target.value))}
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
        color="primary"
        aria-label="randomize"
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
  );
};
