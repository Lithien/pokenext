'use client';

import { useQuery } from '@tanstack/react-query';

import { pokeApi } from '@/api';
import { API } from '@/api/endpoints';
import { POKEAPI_CACHE_TIME } from '@/api/queryCache';
import { Pokemon } from '@/api/types';

export function usePokemonQuery(identifier: string | number) {
  const pokemonId = String(identifier).trim().toLowerCase();

  return useQuery({
    queryKey: ['pokemon', pokemonId],
    staleTime: POKEAPI_CACHE_TIME,
    gcTime: POKEAPI_CACHE_TIME,
    queryFn: async ({ signal }) => {
      const response = await pokeApi.get<Pokemon>(
        API.POKEMON_DETAIL(encodeURIComponent(pokemonId)),
        { signal }
      );
      return response.data;
    },
    enabled: pokemonId.length > 0,
  });
}
