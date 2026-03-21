'use client'

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useState } from "react"



import SortableColorCard from "./SortableColorCard"

import { useThemeStore } from "@/store/useThemeStore"
import { convertColor } from "@/utils"

export type ColorFormat = "hex" | "rgb" | "hsl"


export default function ColorPalette() {
  const { colors, setColors, allColors } = useThemeStore()
  const [format, setFormat] = useState<ColorFormat>("hex")

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = colors.findIndex((c) => c.name === active.id)
    const newIndex = colors.findIndex((c) => c.name === over.id)

    const newOrder = arrayMove(colors, oldIndex, newIndex)

    setColors(newOrder)
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Formato</InputLabel>
        <Select
          value={format}
          label="Formato"
          onChange={(e) => setFormat(e.target.value as ColorFormat)}
        >
          <MenuItem value="hex">HEX</MenuItem>
          <MenuItem value="rgb">RGB</MenuItem>
          <MenuItem value="hsl">HSL</MenuItem>
        </Select>
      </FormControl>


      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={allColors.map((c) => c.name)}
          strategy={verticalListSortingStrategy}
        >
          <Box display="flex" flexDirection="column" gap={2}>
            {allColors.map((c, index) => (
              <SortableColorCard
                key={c.hex}
                id={c.hex}
                hex={c.hex}
                displayValue={convertColor(c.hex, format)}
                index={index}
              />
            ))}
          </Box>
        </SortableContext>
      </DndContext>
    </Box>
  )
}