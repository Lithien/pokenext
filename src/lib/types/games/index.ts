import { Description, Name, NamedAPIResource } from "../common"

export interface Games {
  id: number
  name: string
  is_main_series: boolean
  description: Description[]
  names: Name[]
  pokemon_entries: PokemonEntries[]
  region: NamedAPIResource
  version_groups: NamedAPIResource[]
}

export interface PokemonEntries {
  entry_number: number
  pokemon_species: NamedAPIResource
}