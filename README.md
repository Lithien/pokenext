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
│   │   │   ├── useApi.ts
│   │   │   └── usePokemonQuery.ts
│   │   └── types/
│   ├── 📁 app/
│   │   ├── api/pokeapi/[...path]/route.ts
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

## 🔗 Arquitectura de datos y estado

La instancia Axios `pokeApi` usa la ruta relativa `/api/pokeapi` y no se conecta
directamente desde el navegador al upstream. El Route Handler
`src/app/api/pokeapi/[...path]/route.ts` reenvía únicamente peticiones GET a un
origen fijo (`https://pokeapi.co/api/v2`), añade `User-Agent` en el servidor y
devuelve los errores HTTP del upstream. El navegador no puede establecer de
forma fiable la cabecera protegida `User-Agent`; por eso se define en el BFF y
no en Axios. La instancia envía `X-Client-Name` como identificador adicional.
Esto no puede evitar un 403 originado por límites o políticas de PokéAPI; esos
errores se propagan para que la interfaz pueda mostrarlos.

TanStack Query es la fuente de verdad para los datos remotos: administra caché,
sincronización y cancelación. La configuración y los hooks usan `staleTime` y
`gcTime` de 24 horas; se deshabilitan revalidaciones por montaje, foco y
reconexión y los reintentos automáticos para evitar tráfico innecesario. La
caché de TanStack Query vive en memoria en el cliente. El BFF además usa la
caché de datos de Next.js con revalidación cada 24 horas y permite caché
compartida de respuestas exitosas; los errores no se almacenan. Zustand queda
para estado de interfaz persistente: preferencias, búsqueda/filtro de favoritos,
identificadores de favoritos y el orden del equipo de hasta seis Pokémon para
una interfaz con `@dnd-kit`. No se copian respuestas de la API a Zustand.

```tsx
const { data: pokemon, isPending, error } = usePokemonQuery(pokemonId);
```

`usePokemonQuery` está tipado con `Pokemon`, usa una clave estable
`['pokemon', id]` y propaga el `AbortSignal` para cancelar solicitudes obsoletas.
Para el resto de recursos, `useApi<T>` permite tipar la respuesta y comparte
el mismo cliente, BFF y ciclo de vida de TanStack Query.

En componentes, selecciona solo el estado necesario de Zustand para evitar
renders por cambios en otras preferencias:

```tsx
const favoriteIds = usePokeStore((state) => state.favoriteIds);
const toggleFavorite = usePokeStore((state) => state.toggleFavorite);
const isFavorite = favoriteIds.includes(pokemon.id);
```

La ficha de Pokémon incluye un control de favoritos con nombre accesible y
`aria-pressed`. Los fallos al cargar el detalle se muestran como un mensaje de
error en lugar de mantener un estado de carga indefinido.

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
