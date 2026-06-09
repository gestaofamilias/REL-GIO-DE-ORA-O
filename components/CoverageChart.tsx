'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BarChart2 } from 'lucide-react';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  DoughnutController,
  ArcElement,
} from 'chart.js';
import type { HorarioSlot } from '@/types';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, DoughnutController, ArcElement);

const PERIODS = [
  { label: 'Madrugada\n00h–05h', hours: ['00', '01', '02', '03', '04', '05'] },
  { label: 'Manhã\n06h–11h',     hours: ['06', '07', '08', '09', '10', '11'] },
  { label: 'Tarde\n12h–17h',     hours: ['12', '13', '14', '15', '16', '17'] },
  { label: 'Noite\n18h–23h',     hours: ['18', '19', '20', '21', '22', '23'] },
];

export default function CoverageChart({ slots }: { slots: HorarioSlot[] }) {
  const barRef = useRef<HTMLCanvasElement>(null);
  const doughnutRef = useRef<HTMLCanvasElement>(null);
  const barChart = useRef<Chart | null>(null);
  const doughnutChart = useRef<Chart | null>(null);

  useEffect(() => {
    if (!barRef.current) return;
    barChart.current?.destroy();

    const data = PERIODS.map((p) => {
      const ps = slots.filter((s) => p.hours.includes(s.hora.split(':')[0]));
      return { cobertos: ps.filter((s) => s.status === 'coberto').length, vagos: ps.filter((s) => s.status !== 'coberto').length };
    });

    barChart.current = new Chart(barRef.current, {
      type: 'bar',
      data: {
        labels: ['Madrugada', 'Manhã', 'Tarde', 'Noite'],
        datasets: [
          {
            label: 'Cobertos',
            data: data.map((d) => d.cobertos),
            backgroundColor: 'rgba(0,87,255,0.7)',
            borderColor: '#0057FF',
            borderWidth: 1,
            borderRadius: 6,
          },
          {
            label: 'Disponíveis',
            data: data.map((d) => d.vagos),
            backgroundColor: 'rgba(255,255,255,0.07)',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: 'rgba(255,255,255,0.6)', font: { size: 11 }, boxWidth: 12 } },
          tooltip: {
            backgroundColor: 'rgba(0,13,46,0.95)',
            borderColor: 'rgba(0,87,255,0.3)',
            borderWidth: 1,
            titleColor: '#fff',
            bodyColor: 'rgba(255,255,255,0.7)',
          },
        },
        scales: {
          x: { stacked: true, ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.04)' } },
          y: { stacked: true, ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.04)' } },
        },
      },
    });
    return () => barChart.current?.destroy();
  }, [slots]);

  useEffect(() => {
    if (!doughnutRef.current) return;
    doughnutChart.current?.destroy();

    const cobertos = slots.filter((s) => s.status === 'coberto').length;
    const urgentes = slots.filter((s) => s.status === 'urgente').length;
    const disponiveis = slots.filter((s) => s.status === 'disponivel').length;

    doughnutChart.current = new Chart(doughnutRef.current, {
      type: 'doughnut',
      data: {
        labels: ['Cobertos', 'Urgentes', 'Disponíveis'],
        datasets: [{
          data: [cobertos, urgentes, disponiveis],
          backgroundColor: ['rgba(0,87,255,0.8)', 'rgba(255,59,48,0.7)', 'rgba(255,255,255,0.1)'],
          borderColor: ['#0057FF', '#FF3B30', 'rgba(255,255,255,0.2)'],
          borderWidth: 2,
          hoverOffset: 8,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: 'rgba(255,255,255,0.6)', font: { size: 11 }, boxWidth: 10, padding: 12 },
          },
          tooltip: {
            backgroundColor: 'rgba(0,13,46,0.95)',
            borderColor: 'rgba(0,87,255,0.3)',
            borderWidth: 1,
            titleColor: '#fff',
            bodyColor: 'rgba(255,255,255,0.7)',
          },
        },
      },
    });
    return () => doughnutChart.current?.destroy();
  }, [slots]);

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <BarChart2 size={22} className="text-kerigma-blue" />
          <h2 className="section-title gradient-text-blue">Cobertura das 24 Horas</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="glass rounded-2xl p-5">
            <h3 className="text-white/60 text-xs font-medium mb-4 uppercase tracking-wider">Horários por Período</h3>
            <div style={{ height: 200 }}><canvas ref={barRef} /></div>
          </div>
          <div className="glass rounded-2xl p-5">
            <h3 className="text-white/60 text-xs font-medium mb-4 uppercase tracking-wider">Visão Geral do Relógio</h3>
            <div style={{ height: 200 }}><canvas ref={doughnutRef} /></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
