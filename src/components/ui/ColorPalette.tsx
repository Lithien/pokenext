'use client';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import SortableColorCard from './SortableColorCard';

import { useThemeStore } from '@/store/useThemeStore';
import { convertColor } from '@/utils';

export type ColorFormat = 'hex' | 'rgb' | 'hsl';

export default function ColorPalette() {
  const { colors, setColors, similarityThreshold, setSimilarityThreshold } =
    useThemeStore();
  const [format, setFormat] = useState<ColorFormat>('hex');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = colors.findIndex((c) => c.name === active.id);
    const newIndex = colors.findIndex((c) => c.name === over.id);

    const newOrder = arrayMove(colors, oldIndex, newIndex);

    setColors(newOrder);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Formato</InputLabel>
            <Select
              value={format}
              fullWidth
              label="Formato"
              onChange={(e) => setFormat(e.target.value as ColorFormat)}
            >
              <MenuItem value="hex">HEX</MenuItem>
              <MenuItem value="rgb">RGB</MenuItem>
              <MenuItem value="hsl">HSL</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ maxWidth: 420, px: 1 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
              Diferencia mínima entre colores: {similarityThreshold}
            </Typography>
            <Slider
              value={similarityThreshold}
              onChange={(_, value) => setSimilarityThreshold(value)}
              min={0}
              max={442}
              step={1}
              valueLabelDisplay="auto"
              aria-label="similarity-threshold"
            />
            <Typography variant="caption" color="text.secondary">
              Bajo = tonos más parecidos. Alto = tonos más distintos.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={colors.map((c) => c.name)}
                strategy={verticalListSortingStrategy}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {colors.map((c, index) => (
                    <SortableColorCard
                      key={c.hex}
                      id={c.name}
                      hex={c.hex}
                      displayValue={convertColor(c.hex, format)}
                      index={index}
                    />
                  ))}
                </Box>
              </SortableContext>
            </DndContext>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
