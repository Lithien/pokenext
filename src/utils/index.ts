import { ArtworkKey, IMG_BASE_URL, OTHER_ARTWORK } from "@/constants"

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
  number: number | string,
  artwork: ArtworkKey = 'HOME',
  sprite: boolean = false,
  shiny: boolean = false,
  back: boolean = false
): string => {
  const id = number.toString()

  // 1. SPRITES CLÁSICOS (front/back)
  if (sprite) {
    const base = `${IMG_BASE_URL}${back ? 'back/' : ''}`
    const shinyPath = shiny ? 'shiny/' : ''
    return `${base}${shinyPath}${id}.png`
  }

  // 2. ARTWORKS "OTHER"
  const folder = OTHER_ARTWORK[artwork]

  // Extensiones según artwork
  const extension =
    artwork === 'DREAM_WORLD'
      ? 'svg'
      : artwork === 'SHOWDOWN'
        ? 'gif'
        : 'png'

  // SHOWDOWN tiene estructura distinta
  if (artwork === 'SHOWDOWN') {
    const base = `${IMG_BASE_URL}other/showdown/`
    const backPath = back ? 'back/' : ''
    const shinyPath = shiny ? 'shiny/' : ''
    return `${base}${backPath}${shinyPath}${id}.${extension}`
  }

  // DREAM WORLD solo tiene front_default
  if (artwork === 'DREAM_WORLD') {
    return `${IMG_BASE_URL}other/dream-world/${id}.${extension}`
  }

  // OFFICIAL y HOME
  const shinyPath = shiny ? 'shiny/' : ''
  return `${IMG_BASE_URL}other/${folder}/${shinyPath}${id}.${extension}`
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