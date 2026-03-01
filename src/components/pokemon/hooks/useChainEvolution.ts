import { useState, useEffect } from "react"

import { API } from "@/api"
import { useApi } from "@/api/hooks/useApi"
import { PokemonSpecies, EvolutionChain, ChainLink, EvolutionDetail } from "@/api/types"
import { getNumberFromUrl } from "@/utils"

const useChainEvolution = ({ species }: { species: PokemonSpecies }) => {
  const id = getNumberFromUrl(species?.evolution_chain.url ?? '')
  const { data, isLoading } = useApi<EvolutionChain>({ key: API.EVOLUTION_CHAIN(String(id)) })

  const [chain, setChain] = useState<ChainLink | null>(null)
  const [pokemonTypes, setPokemonTypes] = useState<Record<string, string>>({})

  const extractSpeciesNames = (node: ChainLink): string[] => {
    const names = [node.species.name]
    node.evolves_to.forEach(child => {
      names.push(...extractSpeciesNames(child))
    })
    return names
  }

  // ------------------------------------------------------
  // 2. Guardar la cadena evolutiva
  // ------------------------------------------------------
  useEffect(() => {
    if (data) {
      setChain(data.chain)
    }
  }, [data])

  // ------------------------------------------------------
  // 3. Cargar tipos de TODOS los Pokémon del árbol
  // ------------------------------------------------------
  useEffect(() => {
    if (!chain) return

    const names = extractSpeciesNames(chain)

    Promise.all(
      names.map(name =>
        fetch(API.POKEMON_DETAIL(name))
          .then(res => res.json())
          .then(data => ({
            name,
            type: data.types?.[0]?.type?.name ?? "normal"
          }))
      )
    ).then(results => {
      const map: Record<string, string> = {}
      results.forEach(r => (map[r.name] = r.type))
      setPokemonTypes(map)
    })
  }, [chain])

  // ------------------------------------------------------
  // 4. Requisitos de evolución
  // ------------------------------------------------------
  const requeriments = (details: EvolutionDetail[]) => {
    if (!details || details.length === 0) return null

    const d = details[0]
    const reqs: string[] = []

    if (d.min_level) reqs.push(`Lvl ${d.min_level}`)
    if (d.item) reqs.push(`Item: ${d.item.name}`)
    if (d.trigger?.name === "trade") reqs.push("Trade")
    if (d.min_happiness) reqs.push(`Happiness ${d.min_happiness}+`)
    if (d.min_affection) reqs.push(`Affection ${d.min_affection}+`)
    if (d.min_beauty) reqs.push(`Beauty ${d.min_beauty}+`)
    if (d.party_species) reqs.push(`Party: ${d.party_species.name}`)
    if (d.party_type) reqs.push(`Party Type: ${d.party_type.name}`)
    if (d.time_of_day) reqs.push(`Time: ${d.time_of_day}`)
    if (d.gender === 1) reqs.push("♀ Only")
    if (d.gender === 2) reqs.push("♂ Only")
    if (d.held_item) reqs.push(`Hold: ${d.held_item.name}`)
    if (d.location) reqs.push(`Location: ${d.location.name}`)
    if (d.known_move) reqs.push(`Move: ${d.known_move.name}`)
    if (d.needs_overworld_rain) reqs.push("Rain")
    if (d.turn_upside_down) reqs.push("Flip Console")
    return reqs
  }

  return ({
    requeriments,
    chain,
    pokemonTypes,
    isLoading
  })
}

export default useChainEvolution
