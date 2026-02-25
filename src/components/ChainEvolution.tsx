'use client'
import { Container, Grid, Skeleton } from "@mui/material"
import { useEffect, useState } from "react"

import PokemonCard from "./PokemonCard"

import { API } from "@/api/endpoints"
import { useApi } from "@/hooks/useApi"
import { NamedAPIResource, Pokemon, PokemonSpecies } from "@/lib/types"
import { getNumberFromUrl } from "@/utils"

interface ChainEvolutionProps {
  pokemon: Pokemon
  species: PokemonSpecies
}

const ChainEvolution = ({ species }: ChainEvolutionProps) => {
  const id = getNumberFromUrl(species?.evolution_chain.url ?? '')
  const { data, isLoading } = useApi({ key: API.EVOLUTION_CHAIN(String(id)) })
  const [chains, setChains] = useState<NamedAPIResource[]>([])

  useEffect(() => {
    if (data) {
      setChains(getChains())
    }
  }, [data])

  const getChains = () => {
    const result: NamedAPIResource[] = []

    const traverse = (node: any) => {
      if (node.species) {
        result.push({
          name: node.species.name,
          url: node.species.url
        })
      }

      if (node.evolves_to && node.evolves_to.length > 0) {
        node.evolves_to.forEach((child: any) => traverse(child))
      }
    }

    traverse(data?.chain)
    return result
  }

  return (
    <Container sx={{ py: 4 }} maxWidth="sm">
      <Grid container justifyContent="center">
        {isLoading && (
          <>
            <Skeleton variant="rounded" width={110} height={170} style={{ margin: '0 5px'}} />
            <Skeleton variant="rounded" width={110} height={170} style={{ margin: '0 5px'}} />
            <Skeleton variant="rounded" width={110} height={170} style={{ margin: '0 5px'}} />
          </>
        )}
        {chains.map((chain) => (
          <PokemonCard key={chain.name} {...chain} />
        ))}
      </Grid>
    </Container>
  )
}

export default ChainEvolution
