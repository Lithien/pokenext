import { Name } from "../common"

export interface Languages {
  id: number
  name: string
  official: boolean
  iso639: string
  iso3166: string
  names: Name[]
}