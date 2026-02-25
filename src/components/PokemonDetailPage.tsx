'use client'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'

import { PokemonImageHeader } from './PokemonImageHeader'
import { PokemonInfoSection } from './PokemonInfoSection'
import { PokemonSelector } from './PokemonSelector'
import { PokemonTabs } from './PokemonTabs'

export const PokemonDetailPage = ({ pokemon }: { pokemon: any }) => {
  const [tab, setTab] = useState(0)

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PokemonImageHeader imageUrl={pokemon.image} name={pokemon.name} genere={pokemon.genere} />

      <PokemonSelector
        dexNumber={pokemon.id}
        name={pokemon.name}
        onChangeDex={() => { }}
        onChangeName={() => { }}
        onRandomize={() => { }}
      />

      <PokemonTabs tab={tab} onChange={setTab} />

      {tab === 0 && (
        <PokemonInfoSection
          types={pokemon.types}
          height={pokemon.height / 10}
          weight={pokemon.weight / 10}
        />
      )}

      <Typography mt={4} variant="body2" color="secondary" textAlign="center">
        More Pokémon details coming in future updates
      </Typography>
    </Box>
  )
}
