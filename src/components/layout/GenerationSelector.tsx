'use client';

import { MenuItem } from '@mui/material';

import { SelectField } from './SelectField';

import { usePokeStore } from '@/store/usePokeStore';

const GenerationSelector = () => {
  const generation = usePokeStore((s) => s.generation);
  const setGeneration = usePokeStore((s) => s.setGeneration);

  return (
    <SelectField
      label="Gen"
      value={generation}
      onChange={(value) => setGeneration(String(value))}
      options={[]}
      sx={{
        minWidth: { xs: 70, sm: 100 },
        '& .MuiOutlinedInput-input': {
          py: { xs: 0.75, sm: 1 },
          fontSize: { xs: '0.875rem', sm: '1rem' },
        },
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => (
        <MenuItem key={gen} value={gen}>
          Gen {gen}
        </MenuItem>
      ))}
    </SelectField>
  );
};

export default GenerationSelector;
