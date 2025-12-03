import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://raw.githubusercontent.com/'), new URL('https://pokeapi.co/'), new URL('https://img.pokemondb.net/')],
  }
};

export default nextConfig;
