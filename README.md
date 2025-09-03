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
│   ├── bug.svg
│   ├── fire.svg
│   └── ...otros iconos
├── 📁 src/
│   ├── 📁 app/
│   │   ├── page.tsx
│   │   └── pokemon/[id]/page.tsx
│   ├── 📁 components/
│   │   ├── PokemonCard.tsx
│   │   ├── PokemonImageHeader.tsx
│   │   ├── ChainEvolution.tsx
│   │   └── ...
│   ├── 📁 lib/
│   │   └── 📁 types/
│   │       ├── 📁 common/
│   │       └── 📁 pokemon/
│   ├── 📁 theme/
│   │   └── theme.ts
│   ├── 📁 utils/
│   │   └── index.ts
│   └── 📁 constants/
│       └── index.ts
└── ...
```

## 🧩 Funcionalidades

- 🔎 Buscar Pokémon por nombre o número
- 🌈 Visualizar colores y tipos
- 🦾 Ver evoluciones y formas
- 🎨 Cambiar tema y paleta de colores
- 🖼️ Imágenes oficiales y sprites

## 📚 Aprende más

- [PokeAPI](https://pokeapi.co/)
- [NextJS](https://nextjs.org/learn)
- [Material UI](https://mui.com/material-ui/getting-started/)

---
¡Atrápalos a todos!
