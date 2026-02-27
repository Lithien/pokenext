import { EvolutionDetail } from "@/api/types"
import { IMG_BASE_URL, SpriteType } from "@/constants"

/**
 * @name getPokemonImage
 * @description Returns the URL of a Pokémon image based on its number, artwork type, and
 * @param number Pokemon number or name
 * @param artwork Artwork type, defaults to 'HOME'
 * @param sprite If true, returns sprite URL, otherwise returns official artwork
 * @param shiny If true, returns shiny version of the image
 * @returns URL of the Pokémon image
 */
export const getPokemonImage = (
  id: number | string,
  type: SpriteType,
  back: boolean = false,
  shiny: boolean = false,
): string => {
  const number = id.toString()

  // 1. PIXEL / DEFAULT (sprites clásicos)
  if (type === "pixel" || type === "default") {
    const base = `${IMG_BASE_URL}${back ? "back/" : ""}`
    const shinyPath = shiny ? "shiny/" : ""
    return `${base}${shinyPath}${number}.png`
  }

  // 2. DREAM WORLD (solo front, NO shiny)
  if (type === "dream-world") {
    return `${IMG_BASE_URL}other/dream-world/${number}.svg`
  }

  // 3. SHOWDOWN (sí shiny, sí back)
  if (type === "showdown") {
    const base = `${IMG_BASE_URL}other/showdown/`
    const backPath = back ? "back/" : ""
    const shinyPath = shiny ? "shiny/" : ""
    return `${base}${backPath}${shinyPath}${number}.gif`
  }

  // 4. OFFICIAL ARTWORK (sí shiny, solo front)
  if (type === "official-artwork") {
    const shinyPath = shiny ? "shiny/" : ""
    return `${IMG_BASE_URL}other/official-artwork/${shinyPath}${number}.png`
  }

  // 5. HOME (sí shiny, solo front)
  if (type === "home") {
    const shinyPath = shiny ? "shiny/" : ""
    return `${IMG_BASE_URL}other/home/${shinyPath}${number}.png`
  }

  // fallback
  return `${IMG_BASE_URL}${number}.png`
}

/**
 * @name getNumberFromUrl
 * @param url  URL of a Pokémon resource
 * @description Extracts the Pokémon number from a URL
 * @example getNumberFromUrl('https://pokeapi.co/api/v2/pokemon/1/') 
 * @returns '1'
 */
export const getNumberFromUrl = (url: string): string => url.split('/').filter(Boolean).pop() ?? ''

export const formatStatName = (name: string): string => name.replace('-', ' ')

/**
 * @name getStatColor
 * @description Returns a color code based on the Pokémon stat name
 * @param name Stat name (e.g., 'hp', 'attack', 'defense', etc.)
 * @returns Color code as a string
 */
export const getStatColor = (name: string): string => {
  let color = ''
  switch (name) {
    case 'hp':
      color = '#14CC60'
      break
    case 'attack':
      color = '#EF3E33'
      break
    case 'defense':
      color = '#004E98'
      break
    case 'special-attack':
      color = '#C589E8'
      break
    case 'special-defence':
      color = '#2589BD'
      break
    case 'speed':
      color = '#E4C811'
      break

    default:
      color = '#09BC8A'
      break
  }

  return color
}

/**
 * @name convertRGBToHex
 * @description Converts an RGB color array to a HEX color string
 * @param color Array of RGB values
 * @returns HEX color string
 */
export const convertRGBToHex = (color: number[]): string => {
  const toHex = (n: number) => {
    const hex = n.toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }
  return `#${toHex(color[0])}${toHex(color[1])}${toHex(color[2])}`
}

/**
 * @name convertArrayToRGBA
 * @description Converts an RGB color array to an RGBA color string
 * @param color Array of RGB values
 * @param alpha Alpha value (default is 1)
 * @returns RGBA color string
 */
export const convertArrayToRGBA = (color: number[], alpha: number = 1): string => `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`

/**
 * @name findByLanguage
 * @description Finds a value in an array of objects based on the specified language and key
 * @param entries Array of objects that contain a language property
 * @param language Language code to search for (e.g., 'en', 'ja', etc.)
 * @param key Key to extract from the found object (e.g., 'flavor_text', 'genus', etc.)
 * @returns The value corresponding to the specified key in the found object, or an empty string if not found
 */
export const findByLanguage = <T extends { language: { name: string } }>(
  entries: T[],
  language: string,
  key: keyof T
): string => {
  const item = entries.find(e => e.language.name === language)
  const value = item?.[key]

  return typeof value === 'string' ? value : ''
}

export const getItem = (details: EvolutionDetail): string | null => {
  if (details.item) return details.item.name
  if (details.held_item) return details.held_item.name
  return null
}

export const getSpriteByType = (pokemon: any, type: SpriteType) => {
  switch (type) {
    case "official-artwork":
      return pokemon.sprites.other["official-artwork"].front_default

    case "dream-world":
      return pokemon.sprites.other["dream_world"].front_default

    case "home":
      return pokemon.sprites.other.home.front_default

    case "showdown":
      return pokemon.sprites.other.showdown.front_default

    case "pixel":
      return pokemon.sprites.front_default // retro

    default:
      return pokemon.sprites.front_default
  }
}