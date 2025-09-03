'use client'
import { useApi } from "@/hooks/useApi"
import { fetchEvolutionChain } from "@/lib"
import { NamedAPIResource, Pokemon, PokemonFormOption, PokemonSpecies } from "@/lib/types"
import { Container, Grid, Skeleton } from "@mui/material"
import { useEffect, useState } from "react"
import PokemonCard from "./PokemonCard"
import { getNumberFromUrl } from "@/utils"

interface ChainEvolutionProps {
  pokemon: Pokemon
  species: PokemonSpecies
}

const ChainEvolution = ({ pokemon, species }: ChainEvolutionProps) => {
  const id = getNumberFromUrl(species?.evolution_chain.url ?? '')
  const { data, loading: loadingPokemon } = useApi(() => fetchEvolutionChain(id), [id])
  const [chains, setChains] = useState<NamedAPIResource[]>([])
  const [availableForms, setAvailableForms] = useState<PokemonFormOption[]>([])

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
        {loadingPokemon && (
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
