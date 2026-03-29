'use client'

import { Box, Typography, useTheme, Theme } from "@mui/material"
import Image from "next/image"
import { memo } from "react"

import { PokemonType } from "@/api/types"
import { TYPE_MULTIPLIERS } from "@/constants"
import { getAugmentedTypeColor } from "@/theme/theme"

type WeaknessTableProps = {
  types: PokemonType[]
}

const TypeChip = memo(function TypeChip({ type, multiplier, theme }: { type: string; multiplier: number; theme: Theme }) {
  const color = getAugmentedTypeColor(theme, type)

  return (
    <span
      className="
        flex items-center gap-2 px-3 py-1 rounded-xl text-sm font-semibold border
        transition-all duration-300
        hover:scale-105 hover:shadow-md
        animate-[float_3s_ease-in-out_infinite]
      "
      style={{
        backgroundColor: color.dark,
        color: color.contrastText,
        borderColor: color.main,
        borderWidth: 1,
      }}
    >
      <Image
        src={`/${type}.svg`}
        alt={type}
        width={22}
        height={22}
        className="transition-transform duration-300 hover:rotate-6 hover:scale-110"
      />
      <span className="font-bold">{multiplier}×</span>
    </span>
  )
})

export default function WeaknessTable({ types }: WeaknessTableProps) {
  const theme = useTheme()

  const typeNames = types.map(t => t.type.name)

  // --- DEFENSIVO ---
  const defensive: Record<string, number> = {}

  for (const attackType in TYPE_MULTIPLIERS) {
    let multiplier = 1

    typeNames.forEach(defType => {
      const chart = TYPE_MULTIPLIERS[defType]

      // IMPORTANTE: permitir 0×
      if (chart && chart[attackType] !== undefined) {
        multiplier *= chart[attackType]
      }
    })

    defensive[attackType] = multiplier
  }

  const weaknesses = Object.entries(defensive).filter(([, m]) => m === 2 || m === 4)
  const resistances = Object.entries(defensive).filter(([, m]) => m === 0.5 || m === 0.25)
  const immunities = Object.entries(defensive).filter(([, m]) => m === 0)

  // --- OFENSIVO ---
  const offensive: Record<string, number> = {}

  typeNames.forEach(attType => {
    const chart = TYPE_MULTIPLIERS[attType]
    if (!chart) return

    for (const defType in chart) {
      const mult = chart[defType]
      if (mult > 1) offensive[defType] = mult
    }
  })

  const strengths = Object.entries(offensive)

  const renderRow = (title: string, items: [string, number][]) => {
    if (items.length === 0) return null

    return (
      <Box mb={3}>
        <Typography
          variant="subtitle2"
          fontWeight={800}
          sx={{ opacity: 0.8, letterSpacing: 1 }}
          mb={1}
        >
          {title.toUpperCase()}
        </Typography>

        <Box className="flex gap-2 flex-wrap">
          {items.map(([type, multiplier]) => (
            <TypeChip key={type} type={type} multiplier={multiplier} theme={theme} />
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Box mt={4}>
      <Typography variant="h6" mb={2} fontWeight={800}>
        Efectividad de tipos
      </Typography>

      {renderRow("Débil a", weaknesses)}
      {renderRow("Resistente a", resistances)}
      {renderRow("Inmune a", immunities)}
      {renderRow("Fuerte contra (ofensivo)", strengths)}
    </Box>
  )
}