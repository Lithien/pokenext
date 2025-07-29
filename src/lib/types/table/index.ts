import { NamedAPIResource } from "../common"

export interface TableProps {
  lang?: string
  limit?: number
  offset?: number
}

export interface TableResponse {
  results: NamedAPIResource[]
  count: number
  next: string
  previous: string
}
