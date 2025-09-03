import { ArtworkKey, OTHER_ARTWORK } from "@/constants"

/**
 * @name getPokemonImage
 * @description Returns the URL of a Pokémon image based on its number, artwork type, and
 * @param number Pokemon number or name
 * @param artwork Artwork type, defaults to 'HOME'
 * @param sprite If true, returns sprite URL, otherwise returns official artwork
 * @param shiny If true, returns shiny version of the image
 * @returns URL of the Pokémon image
 */
export const getPokemonImage = (number: number | string, artwork: ArtworkKey = 'HOME', sprite: boolean = false, shiny: boolean = false): string => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${!sprite ? `other/${OTHER_ARTWORK[artwork]}` : `${shiny ? 'shiny' : ''}`}/${number}.png`

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
 * @name mapPaletteToThemeColors
 * @description Maps a color palette to theme colors (primary, secondary, accent)
 * @param palette Array of RGB color arrays
 * @returns Object with primary, secondary, and accent color strings
 */
export const mapPaletteToThemeColors = (palette: number[][]) => {
  const hexColors = palette.map(convertRGBToHex)
  return {
    primary: hexColors[0] || '#ef5350',
    secondary: hexColors[1] || '#1976d2',
    accent: hexColors[2] || '#ffb300'
  }
}

/**
 * @name toBase64
 * @description Converts an image URL to a Base64 encoded string
 * @param url Image URL to be converted to Base64
 * @returns Promise that resolves to a Base64 encoded string
 */
export const toBase64 = async (url: string) => {
  const response = await fetch(url)
  const blob = await response.blob()
  return new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.readAsDataURL(blob)
  })
}
