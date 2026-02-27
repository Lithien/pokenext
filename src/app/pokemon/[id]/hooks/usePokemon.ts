import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { API } from "@/api/endpoints"
import { useApi } from "@/hooks/useApi"
import { Pokemon, PokemonSpecies, VersionGameIndex } from "@/lib/types"
import { usePokeStore } from "@/store/usePokeStore"
import { getNumberFromUrl } from "@/utils"

const usePokemon = ({ id }: { id: string }) => {
  const router = useRouter()
  const [selectedGame, setSelectedGame] = useState('')
  const [tab, setTab] = useState(0)
  let gameOptions: VersionGameIndex[] = []
  const { isShiny, language } = usePokeStore()

  const { data: pokemon, isLoading: loadingPokemon } = useApi<Pokemon>({ key: API.POKEMON_DETAIL(String(id)) })
  const { data: species, isLoading: loadingSpecies } = useApi<PokemonSpecies>({ key: API.POKEMON_SPECIES(String(id)) })

  useEffect(() => {
    if (pokemon) gameOptions = pokemon.game_indices
  }, [pokemon])

  const loading = loadingPokemon || loadingSpecies || !pokemon || !species

  const playCry = () => {
    const cryUrl = pokemon!.cries?.latest || pokemon!.cries?.legacy
    if (cryUrl) {
      const audio = new Audio(cryUrl)
      audio.play()
    }
  }

  if (selectedGame === '' && gameOptions.length > 0) {
    setSelectedGame(gameOptions[0].version.name)
  }

  const onChangeDex = (value: number) => {
    if (value < 1 || value > 1025) {
      return
    }
    router.push(`/pokemon/${value}`)
    setTab(0)
  }

  const onChangeName = (value: string) => {
    if (value.trim() === '') {
      return
    }
    const pokemonId = getNumberFromUrl(value)
    if (pokemonId) {
      router.push(`/pokemon/${pokemonId}`)
      setTab(0)
    } else {
      console.warn('Invalid Pokémon name or ID')
    }
  }

  const onRandomize = () => {
    const randomId = Math.floor(Math.random() * 1025) + 1
    router.push(`/pokemon/${randomId}`)
    setTab(0)
  }

  return ({
    fn: {
      playCry,
      onChangeDex,
      onChangeName,
      onRandomize,
      setTab,
      setSelectedGame
    },
    data: {
      pokemon,
      species,
      selectedGame,
      gameOptions,
      language,
      isShiny,
      tab,
      loading
    }
  })
}

export default usePokemon
