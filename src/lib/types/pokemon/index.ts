import { ApiResource, Effect, FlavorText, Name, NamedAPIResource, VerboseEffect, VersionEncounterDetail, VersionGameIndex, GenerationGameIndex } from "../common"

export interface Abilities {
  id: number
  name: string
  is_main_series: boolean
  generation: NamedAPIResource
  names: Name[]
  effect_entries: VerboseEffect[]
  effect_changes: AbilityEffectChange[]
  flavor_text_entries: AbilityFlavorText[]
  pokemon: AbilityPokemon[]
}

export interface Characteristics {
  id: number
  gene_modulo: number
  possible_values: number[]
  highest_stat: NamedAPIResource
  descriptions: Description[]
}

export interface EggGroup {
  id: number
  name: string
  names: Name[]
  pokemon_species: NamedAPIResource
}

export interface Gender {
  id: number
  name: string
  pokemon_species_details: PokemonSpeciesGender[]
  required_for_evolution: NamedAPIResource[]
}

export interface GrowthRates {
  id: number
  name: string
  formula: string
  descriptions: Description[]
  levels: GrowthRateExperienceLevel[]
  pokemon_species: NamedAPIResource
}

export interface Nature {
  id: number
  name: string
  decreased_stat: NamedAPIResource
  increased_stat: NamedAPIResource
  hates_flavor: NamedAPIResource
  likes_flavor: NamedAPIResource
  pokeathlon_stat_changes: NatureStatChange[]
  move_battle_style_preferences: MoveBattlestylePreference[]
  names: Name[]
}

export interface PokeathlonStats {
  id: number
  name: string
  names: Name[]
  affecting_natures: NaturePokeathlonStatAffectSets
}

export interface Pokemon {
  id: number
  name: string
  base_experience: number
  height: number
  is_default: boolean
  order: number
  weight: number
  abilities: PokemonAbility[]
  forms: NamedAPIResource
  game_indices: VersionGameIndex[]
  held_items: PokemonHeldItem[]
  location_area_encounters: string
  moves: PokemonMove[]
  past_types: PokemonTypePast[]
  sprites: PokemonSprites
  species: NamedAPIResource
  stats: PokemonStat[]
  types: PokemonType[]
  cries: PokemonCrie
}

export interface PokemonLocationAreas {
  location_area: NamedAPIResource
  version_details: VersionEncounterDetail[]
}

export interface PokemonCrie {
  latest: string
  legacy: string
}

export interface PokemonColors {
  id: number
  name: string
  names: Name[]
  pokemon_species: NamedAPIResource[]
}

export interface PokemonForms {
  id: number
  name: string
  order: number
  form_order: number
  is_default: boolean
  is_battle_only: boolean
  is_mega: boolean
  form_name: string
  pokemon: NamedAPIResource
  types: PokemonFormType[]
  sprites: PokemonFormSprites
  version_group: NamedAPIResource
  names: Name[]
  form_names: Name[]
}

export interface PokemonHabitats {
  id: number
  name: string
  names: Name[]
  pokemon_species: NamedAPIResource[]
}

export interface PokemonShapes {
  id: number
  name: string
  awesome_names: AwesomeNames[]
  names: Name[]
  pokemon_species: NamedAPIResource[]
}

export interface PokemonSpecies {
  id: number
  name: string
  order: number
  gender_rate: number
  capture_rate: number
  base_happiness: number
  is_baby: boolean
  is_legendary: boolean
  is_mithycal: boolean
  hatch_encounter: number
  has_gender_differences: boolean
  forms_switchable: boolean
  growth_rate: NamedAPIResource
  pokedex_numbers: PokemonSpeciesDexEntry[]
  egg_groups: NamedAPIResource[]
  color: NamedAPIResource
  shape: NamedAPIResource
  envolves_form_species: NamedAPIResource
  evolution_chain: NamedAPIResource
  habitat: NamedAPIResource
  generation: NamedAPIResource
  names: Name[]
  pal_park_encounters: PalParkEncounterArea[]
  flavor_text_entries: FlavorText[]
  form_description: Description[]
  genera: Genus[]
  varieties: PokemonSpeciesVariety[]
}

export interface Stats {
  id: number
  name: string
  game_index: number
  is_battle_only: boolean
  affecting_moves: MoveStatAffectSets
  affecting_natures: NatureStatAffectSets
  characteristics: ApiResource[]
  move_damage_class: NamedAPIResource
  names: Name[]
}

export interface Types {
  id: number
  name: string
  damage_relations: TypeRelations
  past_damage_relations: TypeRelationsPast[]
  game_indices: GenerationGameIndex[]
  generation: NamedAPIResource
  move_damage_class: NamedAPIResource
  names: Name[]
  pokemon: TypePokemon[]
  moves: NamedAPIResource[]
}

interface TypePokemon {
  slot: number
  pokemon: NamedAPIResource
}

interface TypeRelations {
  no_damage_to: NamedAPIResource[]
  half_damage_to: NamedAPIResource[]
  double_damage_to: NamedAPIResource[]
  no_damage_from: NamedAPIResource[]
  half_damage_from: NamedAPIResource[]
  double_damage_from: NamedAPIResource[]
}

interface TypeRelationsPast {
  generation: NamedAPIResource
  damage_relations: TypeRelations
}

interface MoveStatAffectSets {
  increase: MoveStatAffect[]
  decrease: MoveStatAffect[]
}

interface MoveStatAffect {
  change: number
  move: NamedAPIResource
}

interface NatureStatAffectSets {
  increase: NamedAPIResource[]
  decrease: NamedAPIResource[]
}

interface Genus {
  genus: string
  language: NamedAPIResource
}

interface PokemonSpeciesDexEntry {
  entry_number: number
  pokedex: NamedAPIResource
}

interface PalParkEncounterArea {
  base_score: number
  rate: number
  area: NamedAPIResource
}

interface PokemonSpeciesVariety {
  is_default: boolean
  pokemon: NamedAPIResource
}

interface AwesomeNames {
  awesome_name: string
  language: NamedAPIResource
}

interface PokemonFormSprites {
  front_default: string
  front_shiny: string
  back_default: string
  back_shiny: string
}


export interface PokemonAbility {
  is_hidden: boolean
  slot: number
  ability: NamedAPIResource
}

export interface PokemonType {
  slot: number
  type: NamedAPIResource
}

interface PokemonFormType {
  slot: number
  type: NamedAPIResource
}

interface PokemonTypePast {
  generation: NamedAPIResource
  types: PokemonType[]
}

interface PokemonHeldItem {
  item: NamedAPIResource
  version_details: PokemonHeldItemVersion[]
}

interface PokemonHeldItemVersion {
  version: NamedAPIResource
  rarity: number
}

interface PokemonMove {
  move: NamedAPIResource
  version_group_details: PokemonMoveVersion[]
}

interface PokemonMoveVersion {
  move_learn_method: NamedAPIResource
  version_group: NamedAPIResource
  level_learned_at: number
}

export interface PokemonStat {
  stat: NamedAPIResource
  effort: number
  base_stat: number
  max_stat?: number
}

export interface PokemonSprites extends PokemonSpritesPositions {  
  other: {
    [key: string]: PokemonSpritesPositions
  }
  versions: {
    [key: string]: {
      [key: string]: {
        [key: string]: PokemonSpritesPositions
      }
    }
  } 
}

export interface PokemonSpritesOrdered {
  front_default: PokemonSprite
  front_shiny: PokemonSprite
  front_female: PokemonSprite
  front_shiny_female: PokemonSprite
  back_default: PokemonSprite
  back_shiny: PokemonSprite
  back_female: PokemonSprite
  back_shiny_female: PokemonSprite
}

export interface PokemonSpritesPositions {
  front_default: string
  front_shiny: string
  front_female: string
  front_shiny_female: string
  back_default: string
  back_shiny: string
  back_female: string
  back_shiny_female: string
}

export interface PokemonSprite {
  img: string
  description: string
}

interface NaturePokeathlonStatAffectSets {
  increase: NaturePokeathlonstatAffect[]
  decrease: NaturePokeathlonstatAffect[]
}

interface NaturePokeathlonstatAffect {
  max_change: number
  nature: NamedAPIResource
}

interface GrowthRateExperienceLevel {
  level: number
  experience: number
}

interface PokemonSpeciesGender {
  rate: number
  pokemon_species: NamedAPIResource
}

interface NatureStatChange {
  max_change: number
  pokeathlon_stat: NamedAPIResource
}

interface MoveBattlestylePreference {
  low_hp_preference: number
  high_hp_preference: number
  move_battle_style: number
}

interface Description {
  description: string
  language: NamedAPIResource
}

interface AbilityEffectChange {
  effect_entries: Effect[]
  version_group: NamedAPIResource
}

interface AbilityFlavorText {
  flavor_text: string
  language: NamedAPIResource
  version_group: NamedAPIResource
}

interface AbilityPokemon {
  is_hidden: boolean
  slot: number
  pokemon: NamedAPIResource
}

export interface EvolutionChain {
  baby_trugger_item?: NamedAPIResource
  id: number
  chain: ChainLink
}

export interface ChainLink {
  is_baby: boolean
  species: NamedAPIResource
  evolution_details: EvolutionDetail[]
  evolves_to: ChainLink[]
}

interface EvolutionDetail {
  item?: NamedAPIResource
  triger?: NamedAPIResource
  gender: number
  held_item?: NamedAPIResource
  known_move?: NamedAPIResource
  know_move_type?: NamedAPIResource
  location?: NamedAPIResource
  min_level: number
  min_happiness: number
  min_beauty: number
  min_affection: number
  needs_overworld_rain: boolean
  party_species?: NamedAPIResource
  party_type?: NamedAPIResource
  relative_physical_stats: number
  time_of_day: string
  trade_species?: NamedAPIResource
  turn_upside_down: boolean
}

export type Species = {
  name: string;
  number?: string;
  imageUrl?: string;
}