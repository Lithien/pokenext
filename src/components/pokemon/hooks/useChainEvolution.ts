import { useState, useEffect, useCallback, useRef } from 'react';

import { API } from '@/api';
import { useApi } from '@/api/hooks/useApi';
import {
  PokemonSpecies,
  EvolutionChain,
  ChainLink,
  EvolutionDetail,
} from '@/api/types';
import { getNumberFromUrl } from '@/utils';

const useChainEvolution = ({ species }: { species: PokemonSpecies }) => {
  const id = getNumberFromUrl(species?.evolution_chain.url ?? '');
  const { data, isLoading } = useApi<EvolutionChain>({
    key: API.EVOLUTION_CHAIN(String(id)),
  });

  const [chain, setChain] = useState<ChainLink | null>(null);
  const [pokemonTypes, setPokemonTypes] = useState<Record<string, string>>({});
  const isMountedRef = useRef(true);

  const extractSpeciesNames = useCallback((node: ChainLink): string[] => {
    const names = [node.species.name];
    node.evolves_to.forEach((child) => {
      names.push(...extractSpeciesNames(child));
    });
    return names;
  }, []);

  // ------------------------------------------------------
  // 2. Guardar la cadena evolutiva
  // ------------------------------------------------------
  useEffect(() => {
    if (data) {
      setChain(data.chain);
    }
  }, [data]);

  // Cleanup al desmontar: marcar como no montado
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // ------------------------------------------------------
  // 3. Cargar tipos de TODOS los Pokémon del árbol CON CLEANUP
  // ------------------------------------------------------
  useEffect(() => {
    if (!chain) return;

    // Crear AbortController para cancelar requests pendientes
    const abortController = new AbortController();

    const fetchPokemonTypes = async () => {
      try {
        const names = extractSpeciesNames(chain);

        // Usar Promise.allSettled en lugar de Promise.all para evitar que falte uno falle todo
        const results = await Promise.allSettled(
          names.map((name) =>
            fetch(API.POKEMON_DETAIL(name), { signal: abortController.signal })
              .then((res) => {
                if (!res.ok) throw new Error(`Failed to fetch ${name}`);
                return res.json();
              })
              .then((data) => ({
                name,
                type: data.types?.[0]?.type?.name ?? 'normal',
              }))
              .catch((error) => {
                console.warn(`Error fetching ${name}:`, error.message);
                return null;
              })
          )
        );

        // Solo actualizar si el componente sigue montado
        if (!isMountedRef.current) return;

        // Procesar resultados exitosos
        const map: Record<string, string> = {};
        results.forEach((result) => {
          if (result.status === 'fulfilled' && result.value) {
            map[result.value.name] = result.value.type;
          }
        });

        setPokemonTypes(map);
      } catch (error) {
        // AbortError es normal cuando se cancela, no loguear como error
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error in fetchPokemonTypes:', error);
        }
      }
    };

    fetchPokemonTypes();

    // Cleanup: cancelar requests pendientes al desmontar o cambiar chain
    return () => {
      abortController.abort();
    };
  }, [chain, extractSpeciesNames]);

  // ------------------------------------------------------
  // 4. Requisitos de evolución
  // ------------------------------------------------------
  const requeriments = useCallback((details: EvolutionDetail[]) => {
    if (!details || details.length === 0) return null;

    const d = details[0];
    const reqs: string[] = [];

    if (d.min_level) reqs.push(`Lvl ${d.min_level}`);
    if (d.item) reqs.push(`Item: ${d.item.name}`);
    if (d.trigger?.name === 'trade') reqs.push('Trade');
    if (d.min_happiness) reqs.push(`Happiness ${d.min_happiness}+`);
    if (d.min_affection) reqs.push(`Affection ${d.min_affection}+`);
    if (d.min_beauty) reqs.push(`Beauty ${d.min_beauty}+`);
    if (d.party_species) reqs.push(`Party: ${d.party_species.name}`);
    if (d.party_type) reqs.push(`Party Type: ${d.party_type.name}`);
    if (d.time_of_day) reqs.push(`Time: ${d.time_of_day}`);
    if (d.gender === 1) reqs.push('♀ Only');
    if (d.gender === 2) reqs.push('♂ Only');
    if (d.held_item) reqs.push(`Hold: ${d.held_item.name}`);
    if (d.location) reqs.push(`Location: ${d.location.name}`);
    if (d.known_move) reqs.push(`Move: ${d.known_move.name}`);
    if (d.needs_overworld_rain) reqs.push('Rain');
    if (d.turn_upside_down) reqs.push('Flip Console');
    return reqs;
  }, []);

  return {
    requeriments,
    chain,
    pokemonTypes,
    isLoading,
  };
};

export default useChainEvolution;
