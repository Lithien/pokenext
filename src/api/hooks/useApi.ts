'use client';
import { useQuery } from '@tanstack/react-query';

import { pokeApi } from '@/api';
import { POKEAPI_CACHE_TIME } from '@/api/queryCache';

interface UseApiProps {
  key: string;
  query?: Record<string, string | number | boolean | undefined>;
  enabled?: boolean;
}

export function useApi<T>({ key, query, enabled = true }: UseApiProps) {
  const queryResult = useQuery({
    queryKey: [key, query],
    enabled: enabled && !!key,
    staleTime: POKEAPI_CACHE_TIME,
    gcTime: POKEAPI_CACHE_TIME,
    queryFn: async ({ signal }) => {
      const res = await pokeApi.get<T>(key, { params: query, signal });
      return res.data;
    },
  });
  return queryResult;
}
