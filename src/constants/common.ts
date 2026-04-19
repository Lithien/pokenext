export const OTHER_ARTWORK = {
  OFFICIAL: 'official-artwork',
  DREAM_WORLD: 'dream_world',
  HOME: 'home',
  SHOWDOWN: 'showdown',
} as const;

export const LANGUAGES = {
  EN: 'en',
  JA: 'ja',
  FR: 'fr',
  DE: 'de',
  ES: 'es',
  IT: 'it',
  KO: 'ko',
} as const;

export const LANGUAGE_FLAGS: Record<LANGUAGES, string> = {
  [LANGUAGES.EN]: `/${LANGUAGES.EN}.svg`,
  [LANGUAGES.ES]: `/${LANGUAGES.ES}.svg`,
  [LANGUAGES.FR]: `/${LANGUAGES.FR}.svg`,
  [LANGUAGES.DE]: `/${LANGUAGES.DE}.svg`,
  [LANGUAGES.IT]: `/${LANGUAGES.IT}.svg`,
  [LANGUAGES.JA]: `/${LANGUAGES.JA}.svg`,
  [LANGUAGES.KO]: `/${LANGUAGES.KO}.svg`,
};

export const COLORS = [
  { name: 'Primary' },
  { name: 'Secondary' },
  { name: 'Accent' },
];

export type ArtworkKey = keyof typeof OTHER_ARTWORK;
export type LANGUAGES = (typeof LANGUAGES)[keyof typeof LANGUAGES];

const BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites';

export const IMG_BASE_URL = `${BASE_URL}/pokemon/`;
export const ITEM_IMAGE_URL = `${BASE_URL}/items/dream-world/`;
export const ITEM_IMAGE_URL_FALLBACK =
  'https://raw.githubusercontent.com/msikma/pokesprite/master/items/evo-item/';
export const TYPE_IMAGE_URL = `${BASE_URL}/types/generation-ix/scarlet-violet/`;

export const SPRITE_TYPES = [
  { id: 'pixel', label: 'Pixel' },
  { id: 'official-artwork', label: 'Official Artwork' },
  { id: 'dream-world', label: 'Dream World' },
  { id: 'home', label: 'Home' },
  { id: 'showdown', label: 'Showdown' },
] as const;

export type SpriteType = (typeof SPRITE_TYPES)[number]['id'];

export const TYPE_MULTIPLIERS: Record<string, Record<string, number>> = {
  normal: {
    fighting: 2,
    ghost: 0,
  },
  fire: {
    water: 2,
    ground: 2,
    rock: 2,
    fire: 0.5,
    grass: 0.5,
    ice: 0.5,
    bug: 0.5,
    steel: 0.5,
    fairy: 0.5,
  },
  water: {
    electric: 2,
    grass: 2,
    fire: 0.5,
    water: 0.5,
    ice: 0.5,
    steel: 0.5,
  },
  electric: {
    ground: 2,
    electric: 0.5,
    flying: 0.5,
    steel: 0.5,
  },
  grass: {
    fire: 2,
    ice: 2,
    poison: 2,
    flying: 2,
    bug: 2,
    water: 0.5,
    electric: 0.5,
    grass: 0.5,
    ground: 0.5,
  },
  ice: {
    fire: 2,
    fighting: 2,
    rock: 2,
    steel: 2,
    ice: 0.5,
  },
  fighting: {
    flying: 2,
    psychic: 2,
    fairy: 2,
    rock: 0.5,
    bug: 0.5,
    dark: 0.5,
  },
  poison: {
    ground: 2,
    psychic: 2,
    fighting: 0.5,
    poison: 0.5,
    bug: 0.5,
    grass: 0.5,
    fairy: 0.5,
  },
  ground: {
    water: 2,
    grass: 2,
    ice: 2,
    poison: 0.5,
    rock: 0.5,
    electric: 0,
  },
  flying: {
    electric: 2,
    ice: 2,
    rock: 2,
    grass: 0.5,
    fighting: 0.5,
    bug: 0.5,
    ground: 0,
  },
  psychic: {
    bug: 2,
    ghost: 2,
    dark: 2,
    fighting: 0.5,
    psychic: 0.5,
  },
  bug: {
    fire: 2,
    flying: 2,
    rock: 2,
    fighting: 0.5,
    ground: 0.5,
    grass: 0.5,
  },
  rock: {
    water: 2,
    grass: 2,
    fighting: 2,
    ground: 2,
    steel: 2,
    normal: 0.5,
    fire: 0.5,
    poison: 0.5,
    flying: 0.5,
  },
  ghost: {
    ghost: 2,
    dark: 2,
    poison: 0.5,
    bug: 0.5,
    normal: 0,
    fighting: 0,
  },
  dragon: {
    ice: 2,
    dragon: 2,
    fairy: 2,
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    grass: 0.5,
  },
  dark: {
    fighting: 2,
    bug: 2,
    fairy: 2,
    ghost: 0.5,
    dark: 0.5,
    psychic: 0,
  },
  steel: {
    fire: 2,
    fighting: 2,
    ground: 2,
    normal: 0.5,
    grass: 0.5,
    ice: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 0.5,
    dragon: 0.5,
    steel: 0.5,
    fairy: 0.5,
    poison: 0,
  },
  fairy: {
    poison: 2,
    steel: 2,
    fighting: 0.5,
    bug: 0.5,
    dark: 0.5,
    dragon: 0,
  },
};
