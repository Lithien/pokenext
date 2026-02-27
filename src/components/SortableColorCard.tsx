'use client'

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import LockIcon from "@mui/icons-material/Lock"
import { Box, Typography, IconButton } from "@mui/material"

interface Props {
  id: string
  hex: string
  index: number
  displayValue: string
}

export default function SortableColorCard({ id, hex, displayValue }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="#0F0F10"
      borderRadius="12px"
      p={2}
      sx={{ width: 280, cursor: "grab" }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          sx={{
            width: 32,
            height: 32,
            bgcolor: hex,
            borderRadius: "50%",
            border: "2px solid #1e1e1e",
          }}
        />
        <Box>
          <Typography variant="body2" color="#aaa">
            {id}
          </Typography>
          <Typography variant="caption" color="#777">
            {displayValue}
          </Typography>
        </Box>
      </Box>

      <IconButton size="small" sx={{ color: "#777" }}>
        <LockIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}