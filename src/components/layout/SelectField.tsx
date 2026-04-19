'use client';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  Theme,
} from '@mui/material';
import { ReactNode } from 'react';

interface SelectFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: Array<{ id: string | number; label: string }>;
  size?: 'small' | 'medium';
  sx?: SxProps<Theme>;
  children?: ReactNode;
}

export const SelectField = ({
  label,
  value,
  onChange,
  options,
  size = 'small',
  sx = {},
  children,
}: SelectFieldProps) => {
  return (
    <FormControl size={size} sx={sx}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={String(value)}
        label={label}
        onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
      >
        {children ??
          options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
