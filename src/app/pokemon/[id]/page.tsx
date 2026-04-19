'use client';

import { Typography, Box, Skeleton, Tab, Tabs } from '@mui/material';
import { useParams } from 'next/navigation';

import usePokemon from './hooks/usePokemon';

import ChainEvolution from '@/components/pokemon/ChainEvolution';
import { PokemonDetailStatsSection } from '@/components/pokemon/PokemonDetailStatsSection';
import { PokemonImageHeader } from '@/components/pokemon/PokemonImageHeader';
import { PokemonSelector } from '@/components/pokemon/PokemonSelector';
import ColorPalette from '@/components/ui/ColorPalette';

const PokemonDetailPage = () => {
  const { id } = useParams();
  const { fn, data } = usePokemon({ id: String(id) });
  const { pokemon, species, selectedGame, gameOptions, tab } = data;

  if (data.loadingPokemonData) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Skeleton variant="circular" width={130} height={130} />
        <Skeleton variant="text" width={130} />
        <Skeleton variant="rounded" width={700} height={40} />
        <Skeleton variant="rounded" width={300} height={40} />
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Skeleton variant="rounded" width={50} height={80} />
          <Skeleton variant="rounded" width={50} height={80} />
          <Skeleton variant="rounded" width={50} height={80} />
        </Box>
        <Skeleton variant="text" width={300} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        padding: 3,
      }}
    >
      <PokemonImageHeader
        imageUrl={fn.getImage()}
        name={pokemon.name}
        genere={fn.getGenera()}
      />

      <PokemonSelector
        dexNumber={pokemon.id}
        name={pokemon.name}
        onChangeDex={fn.onChangeDex}
        onChangeName={fn.onChangeName}
        onRandomize={fn.onRandomize}
      />

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tab}
          onChange={(_, val) => fn.setTab(val)}
          textColor="primary"
          indicatorColor="secondary"
        >
          {!data.loadingSpeciesData && <Tab label="Information" />}
          {!data.loadingSpeciesData && <Tab label="Forms" />}
          <Tab label="Colors" />
        </Tabs>
      </Box>

      {tab === 0 && !data.loadingSpeciesData && (
        <PokemonDetailStatsSection
          onPlayCry={fn.playCry}
          selectedGame={selectedGame}
          onChangeGame={fn.setSelectedGame}
          gameOptions={gameOptions}
          pokemon={pokemon}
          species={species}
        />
      )}
      {tab === 1 && !data.loadingSpeciesData && (
        <ChainEvolution pokemon={pokemon} species={species} />
      )}
      {tab === (!data.loadingSpeciesData ? 2 : 0) && <ColorPalette />}

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 4, textAlign: 'center' }}
      >
        More Pokémon details coming in future updates
      </Typography>
    </Box>
  );
};

export default PokemonDetailPage;
