'use client';

import { useTheme } from '@mui/material';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { useMemo, useRef } from 'react';
import { Radar } from 'react-chartjs-2';

import { PokemonStat } from '@/api/types';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

type Props = {
  stats: PokemonStat[];
};

export default function StatsRadarChart({ stats }: Props) {
  const theme = useTheme();
  const chartRef = useRef<any>(null);

  // Colores del Pokémon desde el theme
  const c1 = theme.palette.primary.main;
  const c2 = theme.palette.secondary.main;
  const c3 = theme.palette.accent.main;

  const getStat = (name: string) =>
    stats.find((s) => s.stat.name === name)?.base_stat ?? 0;

  const data: ChartData<'radar'> = useMemo(
    () => ({
      labels: ['HP', 'ATK', 'DEF', 'SpA', 'SpD', 'SPD'],
      datasets: [
        {
          label: 'Stats',
          data: [
            getStat('hp'),
            getStat('attack'),
            getStat('defense'),
            getStat('special-attack'),
            getStat('special-defense'),
            getStat('speed'),
          ],
          backgroundColor: (ctx) => {
            const chart = ctx.chart;
            const { ctx: canvas } = chart;
            const g = canvas.createRadialGradient(0, 0, 0, 0, 0, 300);
            g.addColorStop(0, `${c1}88`);
            g.addColorStop(0.5, `${c2}55`);
            g.addColorStop(1, `${c3}33`);
            return g;
          },

          borderColor: (ctx) => {
            const chart = ctx.chart;
            const { ctx: canvas } = chart;
            const g = canvas.createLinearGradient(0, 0, 300, 300);
            g.addColorStop(0, c1);
            g.addColorStop(0.5, c2);
            g.addColorStop(1, c3);
            return g;
          },

          pointBackgroundColor: (ctx) => {
            const chart = ctx.chart;
            const { ctx: canvas } = chart;
            const g = canvas.createLinearGradient(0, 0, 300, 300);
            g.addColorStop(0, c1);
            g.addColorStop(1, c2);
            return g;
          },

          pointBorderColor: (ctx) => {
            const chart = ctx.chart;
            const { ctx: canvas } = chart;
            const g = canvas.createLinearGradient(300, 0, 0, 300);
            g.addColorStop(0, c2);
            g.addColorStop(1, c3);
            return g;
          },

          borderWidth: 2,
          pointHoverRadius: 7,
          pointRadius: 5,
        },
      ],
    }),
    [stats, c1, c2, c3]
  );

  const options: ChartOptions<'radar'> = useMemo(
    () => ({
      responsive: true,
      scales: {
        r: {
          beginAtZero: true,
          suggestedMax: 150,
          grid: { color: '#9993' },
          angleLines: { color: '#9993' },
          pointLabels: {
            color: theme.palette.text.primary,
            font: { size: 12, weight: 'bold' },
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: theme.palette.background.default,
          titleColor: theme.palette.text.primary,
          bodyColor: theme.palette.text.primary,
          borderColor: c1,
          borderWidth: 1,
          padding: 10,
        },
      },
      animation: {
        duration: 900,
        easing: 'easeOutQuart' as const,
      },
    }),
    [theme.palette.text.primary, theme.palette.background.default, c1]
  );

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Radar ref={chartRef} data={data} options={options} />
    </div>
  );
}
