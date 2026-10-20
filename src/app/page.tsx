'use client';

import {
  Grid,
  Container,
  Typography,
  Box,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { useMemo } from 'react';

import { API } from '@/api';
import { useApi } from '@/api/hooks/useApi';
import { Generation } from '@/api/types';
import PokemonCard from '@/components/pokemon/PokemonCard';
import { usePokeStore } from '@/store/usePokeStore';
import { getNumberFromUrl } from '@/utils';

const Home = () => {
  const language = usePokeStore((e) => e.language);
  const generation = usePokeStore((e) => e.generation);
  const searchTerm = usePokeStore((state) => state.searchTerm);
  const setSearchTerm = usePokeStore((state) => state.setSearchTerm);
  const showFavorites = usePokeStore((state) => state.showFavorites);
  const setShowFavorites = usePokeStore((state) => state.setShowFavorites);
  const favoriteIds = usePokeStore((state) => state.favoriteIds);
  const { data, isLoading, isError } = useApi<Generation>({
    key: API.POKEMON_GENERATION(generation),
    query: { lang: language },
  });

  const sortedSpecies = useMemo(
    () =>
      data?.pokemon_species
        ?.slice()
        .sort(
          (a, b) =>
            Number(getNumberFromUrl(a.url)) - Number(getNumberFromUrl(b.url))
        ),
    [data?.pokemon_species]
  );

  const filteredSpecies = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return sortedSpecies?.filter((pokemon) => {
      const pokemonId = Number(getNumberFromUrl(pokemon.url));
      const matchesSearch =
        !term ||
        pokemon.name.toLowerCase().includes(term) ||
        String(pokemonId).includes(term);
      return matchesSearch && (!showFavorites || favoriteIds.includes(pokemonId));
    });
  }, [favoriteIds, searchTerm, showFavorites, sortedSpecies]);

  if (isLoading) {
    return (
      <Container sx={{ py: 6 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ animation: 'fadeIn 0.5s ease-in-out' }}
          >
            Pokédex
          </Typography>
          <CircularProgress size={40} />
          <Typography variant="body1" color="textSecondary" align="center">
            Cargando Pokémon...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container role="alert" sx={{ py: 6, textAlign: 'center' }}>
        <Typography>No se pudo cargar la Pokédex. Inténtalo de nuevo.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 700,
          mb: { xs: 3, sm: 4 },
          fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' },
        }}
      >
        Pokédex
      </Typography>
      <Box
        component="section"
        aria-label="Filtros de la Pokédex"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          label="Buscar por nombre o número"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          size="small"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showFavorites}
              onChange={(event) => setShowFavorites(event.target.checked)}
            />
          }
          label="Mostrar favoritos"
        />
      </Box>
      <Grid
        container
        spacing={{ xs: 1.5, sm: 2 }}
        sx={{
          animation: 'fadeIn 0.4s ease-in-out',
          justifyContent: 'center',
        }}
      >
        {filteredSpecies?.map((pokemon) => (
          <PokemonCard key={pokemon.name} {...pokemon} />
        ))}
      </Grid>
      {filteredSpecies?.length === 0 && (
        <Typography role="status" align="center" sx={{ mt: 3 }}>
          No se encontraron Pokémon con esos filtros.
        </Typography>
      )}
    </Container>
  );
};

export default Home;
