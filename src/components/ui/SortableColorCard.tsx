'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Typography, IconButton } from '@mui/material';

import { getTextColor } from '@/utils';

interface Props {
  id: string;
  hex: string;
  index: number;
  displayValue: string;
}

export default function SortableColorCard({ id, hex, displayValue }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <Box
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: hex,
        borderRadius: '12px',
        p: 2,
        width: 280,
        cursor: 'grab',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box>
          <Typography
            variant="body2"
            className="capitalize"
            color={getTextColor(hex)}
          >
            {id}
          </Typography>
          <Typography
            variant="caption"
            className="uppercase"
            color={getTextColor(hex)}
          >
            {displayValue}
          </Typography>
        </Box>
      </Box>

      <IconButton size="small" sx={{ color: getTextColor(hex) }}>
        <LockIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
