import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useMemo } from 'react';

import { API } from '@/api';
import { useApi } from '@/api/hooks/useApi';
import { VersionGameIndex, Pokemon, PokemonSpecies } from '@/api/types';
import { usePokeStore } from '@/store/usePokeStore';
import { findByLanguage, getNumberFromUrl, getPokemonImage } from '@/utils';

const usePokemon = ({ id }: { id: string }) => {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState('');
  const isShiny = usePokeStore((s) => s.isShiny);
  const language = usePokeStore((s) => s.language);
  const spriteType = usePokeStore((s) => s.spriteType);

  const { data: pokemon, isLoading: loadingPokemon } = useApi<Pokemon>({
    key: API.POKEMON_DETAIL(String(id)),
  });
  const { data: species, isLoading: loadingSpecies } = useApi<PokemonSpecies>({
    key: API.POKEMON_SPECIES(String(id)),
  });
  const [tab, setTab] = useState(0);

  const gameOptions = useMemo<VersionGameIndex[]>(
    () => pokemon?.game_indices ?? [],
    [pokemon?.game_indices]
  );

  useEffect(() => {
    if (
      pokemon?.game_indices &&
      pokemon.game_indices.length > 0 &&
      !selectedGame
    ) {
      setSelectedGame(pokemon.game_indices[0].version.name);
    }
  }, [pokemon]);

  const loadingPokemonData = loadingPokemon || !pokemon;
  const loadingSpeciesData = loadingSpecies || !species;

  const playCry = useCallback(() => {
    const cryUrl = pokemon!.cries?.latest || pokemon!.cries?.legacy;
    if (cryUrl) {
      const audio = new Audio(cryUrl);
      audio.play();
    }
  }, [pokemon]);

  const onChangeDex = useCallback(
    (value: number) => {
      if (value < 1 || value > 1025) {
        return;
      }
      router.push(`/pokemon/${value}`);
      setTab(0);
    },
    [router]
  );

  const onChangeName = useCallback(
    (value: string) => {
      if (value.trim() === '') {
        return;
      }
      const pokemonId = getNumberFromUrl(value);
      if (pokemonId) {
        router.push(`/pokemon/${pokemonId}`);
        setTab(0);
      } else {
        console.warn('Invalid Pokémon name or ID');
      }
    },
    [router]
  );

  const onRandomize = useCallback(() => {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    router.push(`/pokemon/${randomId}`);
    setTab(0);
  }, [router]);

  const getGenera = useCallback(() => {
    if (!loadingSpeciesData) return '';
    return (
      findByLanguage(species?.genera ?? [], language, 'genus') || 'Pokémon'
    );
  }, [loadingSpeciesData, species?.genera, language]);

  const getImage = useCallback(
    () => getPokemonImage(pokemon?.id, spriteType, false, isShiny),
    [pokemon?.id, spriteType, isShiny]
  );

  return {
    fn: {
      playCry,
      onChangeDex,
      onChangeName,
      onRandomize,
      setTab,
      setSelectedGame,
      getGenera,
      getImage,
    },
    data: {
      pokemon,
      species,
      selectedGame,
      gameOptions,
      isShiny,
      tab,
      loadingPokemonData,
      loadingSpeciesData,
      spriteType,
    },
  };
};

export default usePokemon;
