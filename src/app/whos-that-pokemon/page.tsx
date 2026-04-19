'use client';

import { Box, Typography, Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import { API } from '@/api';
import { useApi } from '@/api/hooks/useApi';
import { Pokemon } from '@/api/types';
import { useThemeStore } from '@/store/useThemeStore';

export default function WhosThatPokemon() {
  const mode = useThemeStore((s) => s.mode);
  const [pokemonId, setPokemonId] = useState<number | null>(null);
  const [guess, setGuess] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);

  // Llamada a la API usando tu hook
  const { data: pokemon, isLoading: loadingPokemon } = useApi<Pokemon>({
    key: pokemonId ? API.POKEMON_DETAIL(String(pokemonId)) : '',
  });

  // Cargar un Pokémon aleatorio
  const loadRandomPokemon = useCallback(() => {
    const id = Math.floor(Math.random() * 1025) + 1;
    setPokemonId(id);
    setGuess('');
    setIsRevealed(false);
  }, []);

  // Cargar uno al entrar
  useEffect(() => {
    loadRandomPokemon();
  }, []);

  // Comprobar respuesta
  useEffect(() => {
    if (!pokemon) return;

    const normalizedGuess = guess.trim().toLowerCase().replace(/[- ]/g, '');
    const normalizedName = pokemon.name.toLowerCase().replace(/[- ]/g, '');

    if (normalizedGuess === normalizedName) {
      setIsRevealed(true);
    }
  }, [guess, pokemon]);

  if (loadingPokemon || !pokemon) {
    return (
      <Box className="flex items-center justify-center h-[70vh]">
        <Typography variant="h5">Cargando Pokémon...</Typography>
      </Box>
    );
  }

  const sprite =
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default;

  return (
    <Box className="flex flex-col items-center gap-6 p-6">
      <Typography variant="h4" fontWeight="bold">
        ¿Quién es este Pokémon?
      </Typography>

      {/* Imagen */}
      <div className="w-64 h-64 flex items-center justify-center">
        {sprite && (
          <img
            src={sprite}
            alt="pokemon"
            className={`w-64 h-64 transition-all duration-500 brightness-0 ${
              isRevealed ? 'filter-none' : mode === 'dark' ? 'invert' : ''
            }`}
          />
        )}
      </div>

      {/* Input */}
      {!isRevealed && (
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Escribe el nombre..."
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white w-64 text-center shadow"
        />
      )}

      {/* Resultado */}
      {isRevealed && (
        <Typography variant="h5" className="capitalize">
          ¡Es {pokemon.name}!
        </Typography>
      )}

      {/* Botón siguiente */}
      {isRevealed && (
        <Button
          variant="contained"
          color="primary"
          onClick={loadRandomPokemon}
          sx={{ borderRadius: 3, mt: 2 }}
        >
          Siguiente Pokémon
        </Button>
      )}
    </Box>
  );
}
