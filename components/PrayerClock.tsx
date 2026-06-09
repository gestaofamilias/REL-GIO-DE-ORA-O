'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HorarioSlot } from '@/types';
import { polarToCartesian, createArcPath, getSlotColor } from '@/lib/utils';

const SIZE = 600;
const CX = SIZE / 2;
const CY = SIZE / 2;
const OUTER_R = 260;
const INNER_R = 165;
const LABEL_R = 282;
const TICK_OUTER = 268;
const TICK_INNER = 258;
const TOTAL_SLOTS = 48;
const SLOT_DEG = 360 / TOTAL_SLOTS;

/** Round to 2 decimal places — prevents floating-point hydration mismatches */
const r2 = (n: number) => Math.round(n * 100) / 100;

interface Tooltip {
  x: number;
  y: number;
  slot: HorarioSlot;
}

interface PrayerClockProps {
  slots: HorarioSlot[];
  onSelectSlot: (slot: HorarioSlot) => void;
}

export default function PrayerClock({ slots, onSelectSlot }: PrayerClockProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    function tick() {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleMouseEnter = useCallback(
    (slot: HorarioSlot, e: React.MouseEvent<SVGPathElement>) => {
      setHovered(slot.id);
      const rect = (e.currentTarget.closest('svg') as SVGSVGElement).getBoundingClientRect();
      const svgX = e.clientX - rect.left;
      const svgY = e.clientY - rect.top;
      setTooltip({ x: svgX, y: svgY, slot });
    },
    []
  );

  const coveredCount = slots.filter((s) => s.status === 'coberto').length;
  const pct = Math.round((coveredCount / TOTAL_SLOTS) * 100);

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="section-title gradient-text-blue">Relógio de Oração</h2>
          <p className="text-white/50 mt-2">Selecione seu horário e assuma a intercessão</p>
        </div>

        {/* Clock wrapper */}
        <div className="clock-container relative">
          <div className="relative w-full h-full">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full blur-3xl bg-kerigma-blue/10 scale-90" />

            <svg
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="w-full h-full drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 40px rgba(0,87,255,0.15))' }}
              suppressHydrationWarning
            >
              <defs>
                {/* Glow filters */}
                <filter id="glow-blue" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-orange" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-red" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="center-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="15" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Gradients */}
                <radialGradient id="clockBg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#001A4E" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#000D2E" stopOpacity="0.98" />
                </radialGradient>
                <radialGradient id="innerBg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#001235" stopOpacity="1" />
                  <stop offset="80%" stopColor="#000D2E" stopOpacity="1" />
                  <stop offset="100%" stopColor="#001A4E" stopOpacity="1" />
                </radialGradient>
                <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0057FF" />
                  <stop offset="100%" stopColor="#FF6A00" />
                </linearGradient>
              </defs>

              {/* Background circle */}
              <circle cx={CX} cy={CY} r={OUTER_R + 10} fill="url(#clockBg)" opacity="0.7" />

              {/* Outer decorative ring */}
              <circle
                cx={CX} cy={CY} r={OUTER_R + 8}
                fill="none"
                stroke="rgba(0,87,255,0.1)"
                strokeWidth="1"
              />
              <circle
                cx={CX} cy={CY} r={OUTER_R + 16}
                fill="none"
                stroke="rgba(0,87,255,0.05)"
                strokeWidth="1"
              />

              {/* Clock segments */}
              {slots.map((slot, i) => {
                const startAngle = i * SLOT_DEG;
                const endAngle = (i + 1) * SLOT_DEG;
                const isHovered = hovered === slot.id;
                const path = createArcPath(CX, CY, INNER_R, OUTER_R, startAngle, endAngle);
                const color = getSlotColor(slot.status);
                const isActive = slot.status !== 'disponivel';

                return (
                  <path
                    key={slot.id}
                    d={path}
                    fill={isHovered ? (isActive ? color : 'rgba(0,87,255,0.25)') : color}
                    stroke={isHovered ? 'rgba(255,255,255,0.2)' : 'transparent'}
                    strokeWidth="0.5"
                    filter={isActive ? (slot.status === 'coberto' ? 'url(#glow-blue)' : slot.status === 'urgente' ? 'url(#glow-red)' : 'url(#glow-orange)') : 'none'}
                    style={{
                      cursor: slot.status !== 'coberto' ? 'pointer' : 'default',
                      transition: 'fill 0.2s ease',
                      transform: isHovered ? `scale(1.02)` : 'scale(1)',
                      transformOrigin: `${CX}px ${CY}px`,
                    }}
                    onMouseEnter={(e) => handleMouseEnter(slot, e)}
                    onMouseLeave={() => { setHovered(null); setTooltip(null); }}
                    onClick={() => slot.status !== 'coberto' && onSelectSlot(slot)}
                  />
                );
              })}

              {/* Hour markers (every 2 hours = 4 slots) */}
              {Array.from({ length: 24 }, (_, h) => {
                const angle = (h / 24) * 360 - 90;
                const outer = polarToCartesian(CX, CY, TICK_OUTER, angle + 90);
                const inner = polarToCartesian(CX, CY, TICK_INNER - (h % 6 === 0 ? 4 : 0), angle + 90);
                return (
                  <line
                    key={h}
                    x1={r2(inner.x)} y1={r2(inner.y)}
                    x2={r2(outer.x)} y2={r2(outer.y)}
                    stroke={h % 6 === 0 ? 'rgba(77,166,255,0.6)' : 'rgba(255,255,255,0.15)'}
                    strokeWidth={h % 6 === 0 ? 2 : 1}
                  />
                );
              })}

              {/* Hour labels */}
              {[0, 3, 6, 9, 12, 15, 18, 21].map((h) => {
                const angle = (h / 24) * 360;
                const pos = polarToCartesian(CX, CY, LABEL_R, angle);
                return (
                  <text
                    key={h}
                    x={r2(pos.x)}
                    y={r2(pos.y)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="rgba(77,166,255,0.7)"
                    fontSize="13"
                    fontWeight="600"
                    fontFamily="system-ui, sans-serif"
                  >
                    {h.toString().padStart(2, '0')}h
                  </text>
                );
              })}

              {/* Inner circle */}
              <circle cx={CX} cy={CY} r={INNER_R - 5} fill="url(#innerBg)" />
              <circle
                cx={CX} cy={CY} r={INNER_R - 5}
                fill="none"
                stroke="rgba(0,87,255,0.2)"
                strokeWidth="1"
              />

              {/* Center content */}
              {/* Logo fish */}
              <g filter="url(#center-glow)">
                <path
                  d="M270 285 C278 275, 292 270, 306 272 C320 274, 328 280, 328 285 C328 290, 320 296, 306 298 C292 300, 278 295, 270 285 Z"
                  fill="#0057FF"
                  opacity="0.3"
                />
              </g>

              {/* KERIGMA text */}
              <text x={CX} y={CY - 40} textAnchor="middle" fill="white" fontSize="22" fontWeight="900" fontFamily="system-ui" letterSpacing="-1">
                KERIGMA
              </text>
              <text x={CX} y={CY - 18} textAnchor="middle" fill="#0057FF" fontSize="11" fontWeight="600" fontFamily="system-ui" letterSpacing="4">
                24H
              </text>

              {/* Current time */}
              <text x={CX} y={CY + 12} textAnchor="middle" fill="rgba(77,166,255,0.8)" fontSize="28" fontWeight="700" fontFamily="monospace">
                {currentTime}
              </text>

              {/* Coverage % */}
              <text x={CX} y={CY + 38} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="12" fontFamily="system-ui">
                {pct}% coberto
              </text>

              {/* Bottom tag */}
              <text x={CX} y={CY + 58} textAnchor="middle" fill="rgba(255,106,0,0.6)" fontSize="10" fontFamily="system-ui">
                ✦ Noite do Reencontro ✦
              </text>

              {/* Decorative inner ring */}
              <circle
                cx={CX} cy={CY} r={INNER_R - 20}
                fill="none"
                stroke="rgba(0,87,255,0.08)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
            </svg>

            {/* SVG Tooltip */}
            <AnimatePresence>
              {tooltip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute pointer-events-none z-50 glass rounded-xl p-3 min-w-[140px]"
                  style={{
                    left: tooltip.x + 12,
                    top: tooltip.y - 20,
                    transform: tooltip.x > SIZE / 2 ? 'translateX(-120%)' : 'none',
                  }}
                >
                  <div className="font-bold text-white text-base">{tooltip.slot.hora}</div>
                  {tooltip.slot.status === 'coberto' ? (
                    <>
                      <div className="text-kerigma-blue text-xs mt-0.5">✓ Horário coberto</div>
                      {tooltip.slot.inscricoes?.slice(0, 2).map((i) => (
                        <div key={i.id} className="text-white/60 text-xs mt-1 truncate">
                          {i.nome}
                        </div>
                      ))}
                    </>
                  ) : tooltip.slot.status === 'urgente' ? (
                    <div className="text-red-400 text-xs mt-0.5">🔥 Precisa de intercessor</div>
                  ) : (
                    <div className="text-white/50 text-xs mt-0.5">Clique para assumir</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {[
            { color: '#0057FF', label: 'Coberto', glow: 'rgba(0,87,255,0.4)' },
            { color: '#FF6A00', label: 'Selecionado', glow: 'rgba(255,106,0,0.4)' },
            { color: 'rgba(255,255,255,0.15)', label: 'Disponível', glow: 'transparent' },
            { color: '#FF3B30', label: 'Urgente', glow: 'rgba(255,59,48,0.4)' },
          ].map(({ color, label, glow }) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-sm"
                style={{
                  background: color,
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: `0 0 8px ${glow}`,
                }}
              />
              <span className="text-sm text-white/60">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
