import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'

import { usePokeStore } from '@/store/usePokeStore'

const GenerationSelector = () => {
  const setGeneration = usePokeStore(s => s.setGeneration)
  const generation = usePokeStore((s) => s.generation)
  return (
    <FormControl size='small'>
      <InputLabel>Generation</InputLabel>
      <Select
        value={generation}
        label='Generation'
        onChange={(e) => setGeneration(e.target.value)}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => (
          <MenuItem key={gen} value={gen}>
            Generación {gen}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default GenerationSelector
