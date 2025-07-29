import { Pokemon, PokemonSpecies, TableProps, TableResponse } from "./types"

const API_URL = 'https://pokeapi.co/api/v2'

export const fetchPokemons = async (params?: TableProps): Promise<TableResponse> => {
  const { lang, limit = 20, offset = 0 } = params || {}
  const url = new URL(`${API_URL}/pokemon`)
  
  url.searchParams.append('limit', String(limit))
  url.searchParams.append('offset', String(offset))
  
  if (lang) {
    url.searchParams.append('language', lang)
  }

  const response = await fetch(url.toString())
  
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`)
  }

  const data = await response.json()
  
  return {
    results: data.results,
    count: data.count,
    next: data.next,
    previous: data.previous
  }
}

export const fetchPokemonById = async (id: string): Promise<Pokemon> => {
  const response = await fetch(`${API_URL}/pokemon/${id}`)
  
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`)
  }

  return response.json()
}

export const fetchPokemonSpecies = async (id: string): Promise<PokemonSpecies> => {
  const response = await fetch(`${API_URL}/pokemon-species/${id}`)
  
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`)
  }

  return response.json()
}