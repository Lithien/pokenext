import { PokemonType } from "../pokemon"

export interface ApiResource {
  url: string
}

export interface Description {
  description: string
  language: NamedAPIResource
}

export interface Effect {
  effect: string
  language: NamedAPIResource
}

export interface Encounter {
  min_level: number
  max_level: number
  condition_values: NamedAPIResource[]
  chance: number
  method: NamedAPIResource
}

export interface FlavorText {
  flavor_text: string
  language: NamedAPIResource
  version: NamedAPIResource
}

export interface GenerationGameIndex {
  game_index: number
  generation: NamedAPIResource
}

export interface MachineVersionDetail {
  machine: ApiResource
  version_group: NamedAPIResource
}

export interface VerboseEffect {
  effect: string
  short_effect: string
  language: NamedAPIResource
}

export interface VersionEncounterDetail {
  version: NamedAPIResource
  max_chande: number
  enconter_details: Encounter[]
}

export interface VersionGameIndex {
  game_index: number
  version: NamedAPIResource
}

export interface VersionGroupFlavorText {
  text: string
  language: NamedAPIResource
  version_group: NamedAPIResource
}


export interface NamedAPIResource {
  name: string
  url: string
}

export interface Name {
  name: string
  language: NamedAPIResource
}

export interface PokemonList {
  id: number
  name: string
  types: PokemonType[]
}

export interface UrlData {
  id: string
  type: string
}

export interface PokemonFormOption {
  name: string
  id: string
  type: 'form' | 'variety'
  isDefault?: boolean
  sprite?: string
}


export interface COLORS {
  [key: number]: {
    name: string
    hex: string
  }
}