'use client'

import { useQuery } from "@tanstack/react-query";

import { api } from "@/api/client";


interface UseApiProps {
  key: string;
  query?: Record<string, any>;
  enabled?: boolean;
}

export function useApi<T = any>({
  key,
  query,
  enabled = true,
}: UseApiProps) {
  const queryResult = useQuery({
    queryKey: [key, JSON.stringify(query)],
    enabled: enabled,
    queryFn: async () => {
      const res = await api.get(key, { params: query });
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: 1
  });
  return {
    data: queryResult.data as T,
    error: queryResult.error,
    isLoading: queryResult.isLoading,
  };
}