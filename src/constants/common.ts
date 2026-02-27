export const OTHER_ARTWORK = {
  OFFICIAL: 'official-artwork',
  DREAM_WORLD: 'dream_world',
  HOME: 'home',
  SHOWDOWN: 'showdown',
} as const

export const LANGUAGES = {
  EN: 'en',
  JA: 'ja',
  FR: 'fr',
  DE: 'de',
  ES: 'es',
  IT: 'it',
  KO: 'ko',
} as const

export const LANGUAGE_FLAGS: Record<LANGUAGES, string> = {
  [LANGUAGES.EN]: `/${LANGUAGES.EN}.svg`,
  [LANGUAGES.ES]: `/${LANGUAGES.ES}.svg`,
  [LANGUAGES.FR]: `/${LANGUAGES.FR}.svg`,
  [LANGUAGES.DE]: `/${LANGUAGES.DE}.svg`,
  [LANGUAGES.IT]: `/${LANGUAGES.IT}.svg`,
  [LANGUAGES.JA]: `/${LANGUAGES.JA}.svg`,
  [LANGUAGES.KO]: `/${LANGUAGES.KO}.svg`,
}


export const COLORS = [
  { name: 'Primary' },
  { name: 'Secondary' },
  { name: 'Accent' },
]

export type ArtworkKey = keyof typeof OTHER_ARTWORK
export type LANGUAGES = typeof LANGUAGES[keyof typeof LANGUAGES]

export const IMG_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
export const ITEM_IMAGE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world/'

export const SPRITE_TYPES = [
  { id: "default", label: "Default" },
  { id: "official-artwork", label: "Official Artwork" },
  { id: "dream-world", label: "Dream World" },
  { id: "home", label: "Home" },
  { id: "showdown", label: "Showdown" },
  { id: "pixel", label: "Pixel" },
] as const

export type SpriteType = typeof SPRITE_TYPES[number]["id"]