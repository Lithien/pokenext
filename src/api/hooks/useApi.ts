'use client';
import { useQuery } from '@tanstack/react-query';

import { api } from '@/api';

interface UseApiProps {
  key: string;
  query?: Record<string, any>;
  enabled?: boolean;
}

export function useApi<T = any>({ key, query, enabled = true }: UseApiProps) {
  const queryResult = useQuery({
    queryKey: [key, query],
    enabled: enabled && !!key,
    queryFn: async () => {
      const res = await api.get(key, { params: query });
      return res.data;
    },
  });
  return {
    data: queryResult.data as T,
    error: queryResult.error,
    isLoading: queryResult.isLoading,
  };
}
