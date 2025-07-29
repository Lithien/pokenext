import { Name, NamedAPIResource } from ".."

export interface EncounterMethod {
  id: number
  name: string
  order: number
  names: Name[]
}

export interface EncounterConditionValues {
  id: number
  name: string
  names: Name[]
  values: NamedAPIResource[]
}

export interface EncounterConditionValue {
  id: number
  name: string
  condition: NamedAPIResource
  names: Name[]
}