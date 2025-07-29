import { GenerationGameIndex, Name, NamedAPIResource } from "../common"

export interface Type {
  id: number
  name: string
  damage_relations: TypeRelationsPast[]
  game_indices: GenerationGameIndex
  generation: NamedAPIResource
  move_damage_class: NamedAPIResource
  names: Name[]
  pokemon: PokeType[]
  moves: NamedAPIResource[]
}

interface TypeRelationsPast {
  generation: NamedAPIResource
  damage_relations: TypeRelations
}

interface TypeRelations {
  no_damage_to: NamedAPIResource[]
  half_damage_to: NamedAPIResource[]
  double_damage_to: NamedAPIResource[]
  no_damage_from: NamedAPIResource[]
  half_damage_from: NamedAPIResource[]
  double_damage_from: NamedAPIResource[]
}

export interface PokeType {
  slot: number
  pokemon: NamedAPIResource
}