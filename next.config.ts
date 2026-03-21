import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "pokeapi.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.pokemondb.net",
        pathname: "**",
      },
    ],
  },
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.1.131:3000"]
};

export default nextConfig;
