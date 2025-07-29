export const getPokemonImage = (number: number | string): string => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`

export const getNumberFromUrl = (url: string): string => url.split('/').filter(Boolean).pop() ?? ''

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

export const formatStatName = (name: string): string => name.replace('-', ' ')