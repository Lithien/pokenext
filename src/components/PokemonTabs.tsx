'use client'
import { Box, Tabs, Tab } from '@mui/material'

export const PokemonTabs = ({ tab, onChange }: { tab: number; onChange: (val: number) => void }) => (
  <Box padding={3} sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Tabs variant='scrollable' value={tab} onChange={(_, val) => onChange(val)} textColor='primary' indicatorColor='secondary'>
      <Tab label="Information" />
      <Tab label="Forms & Evolutions" />
      <Tab label="Colors" />
      <Tab label="Estadísticas" />
    </Tabs>
  </Box>
)
