export const API = {
  POKEMON: "/pokemon",
  POKEMON_DETAIL: (id: string) => `/pokemon/${id}`,
  POKEMON_SPECIES: (id: string) => `/pokemon-species/${id}`,
  EVOLUTION_CHAIN: (id: string) => `/evolution-chain/${id}`,
};