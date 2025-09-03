export const OTHER_ARTWORK = {
  OFFICIAL: 'official-artwork',
  DREAM_WORLD: 'dream_world',
  HOME: 'home',
  SHOWDOWN: 'showdown',
} as const

export enum LANGUAGES {
  EN = 'en',
  JA = 'ja',
  FR = 'fr',
  DE = 'de',
  ES = 'es',
  IT = 'it',
  KO = 'ko',
  ZH = 'zh-Hans',
}

export const COLORS = [
  { name: 'Primary' },
  { name: 'Secondary' },
  { name: 'Accent' },
]

export type ArtworkKey = keyof typeof OTHER_ARTWORK