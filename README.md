# 🐱‍👤 PokeNext

¡Bienvenido a PokeNext! Un proyecto hecho con [Next.js](https://nextjs.org) para explorar la Pokédex con estilo.

## 🚀 Comenzando

1. Instala las dependencias:
   ```bash
   pnpm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```
3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura de Archivos

```
├── .gitignore
├── package.json
├── README.md
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── 📁 public/
│   └── ...
├── 📁 src/
│   ├── 📁 api/
│   │   ├── client.ts
│   │   ├── endpoints.ts
│   │   ├── hooks/
│   │   │   └── useApi.ts
│   │   └── types/
│   ├── 📁 app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── pokemon/
│   │   │   └── [id]/page.tsx
│   │   └── whos-that-pokemon/page.tsx
│   ├── 📁 components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── LanguageSelector.tsx
│   │   └── pokemon/
│   │   │   ├── PokemonCard.tsx
│   │   │   ├── ChainEvolution.tsx
│   │   │   ├── PokemonSelector.tsx
│   │   └── ui/
│   │       ├── StatsRadarChart.tsx
│   │       └── ...
│   ├── 📁 constants/
│   │   ├── pokemons.ts
│   │   ├── evolutions.ts
│   │   └── ...
│   ├── 📁 providers/
│   │   └── QueryProvider.tsx
│   ├── 📁 store/
│   │   ├── usePokeStore.ts
│   │   └── useThemeStore.ts
│   ├── 📁 theme/
│   │   ├── theme.ts
│   │   ├── ThemeProvider.tsx
│   │   └── types/
│   └── 📁 utils/
│       ├── extractColors.ts
│       └── index.ts
└── ...
```
## 🔗 Llamadas a la API

Las llamadas a la API se gestionan mediante axios y react-query, usando el archivo `src/api/client.ts` y el hook `useApi`. Los endpoints principales definidos en `src/api/endpoints.ts` son:

- `/pokemon` — Lista de Pokémon
- `/pokemon/{id}` — Detalle de Pokémon
- `/pokemon-species/{id}` — Especie de Pokémon
- `/evolution-chain/{id}` — Cadena de evolución
- `/generation/{id}` — Generación

Ejemplo de uso:

```tsx
const { data: pokemon } = useApi<Pokemon>({
   key: API.POKEMON_DETAIL(String(pokemonId))
});
```
## 🛠️ Tecnologías utilizadas

- Next.js
- React
- Material UI
- Axios
- TanStack React Query
- Zustand
- Chart.js
- TypeScript
- ESLint
- TailwindCSS (solo para postcss)

## 🧩 Funcionalidades

- 🔎 Buscar Pokémon por nombre o número
- 🌈 Visualizar colores y tipos
- 🦾 Ver evoluciones y formas
- 🎨 Cambiar tema y paleta de colores (ahora centralizado en theme.ts)
- 🖼️ Imágenes oficiales y sprites
- 🌓 Soporte completo para modo claro/oscuro con contraste mejorado
- 🛠️ Estilos unificados y gestionados desde theme.ts

## 🆕 Cambios recientes

- Refactorización de estilos: todos los estilos dependientes del modo claro/oscuro están centralizados en theme.ts.
- Mejora de contraste y accesibilidad en los temas.
- Componentes como Header, LanguageSelector y StatsRadarChart usan el theme para estilos.
- Eliminación de duplicidad y mejor mantenimiento de estilos.

## 📚 Aprende más

- [PokeAPI](https://pokeapi.co/)
- [NextJS](https://nextjs.org/learn)
- [Material UI](https://mui.com/material-ui/getting-started/)

---
¡Atrápalos a todos!
