'use client';

import { motion } from 'framer-motion';
import { getSlotColor } from '@/lib/utils';
import type { HorarioSlot } from '@/types';

const PERIODS = [
  { label: 'Madrugada', emoji: '🌙', range: '00h – 05h', hours: ['00', '01', '02', '03', '04', '05'] },
  { label: 'Manhã',     emoji: '🌅', range: '06h – 11h', hours: ['06', '07', '08', '09', '10', '11'] },
  { label: 'Tarde',     emoji: '☀️', range: '12h – 17h', hours: ['12', '13', '14', '15', '16', '17'] },
  { label: 'Noite',     emoji: '🌆', range: '18h – 23h', hours: ['18', '19', '20', '21', '22', '23'] },
];

const STATUS_STYLE = {
  coberto:    { bg: 'rgba(0,87,255,0.22)',   border: 'rgba(0,87,255,0.45)',   text: '#4DA6FF',  label: '✓ Coberto' },
  urgente:    { bg: 'rgba(255,59,48,0.22)',  border: 'rgba(255,59,48,0.55)',  text: '#FF6B6B',  label: '🔥 Urgente' },
  disponivel: { bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.1)', text: 'rgba(255,255,255,0.35)', label: 'Disponível' },
  selecionado:{ bg: 'rgba(255,106,0,0.22)',  border: 'rgba(255,106,0,0.45)',  text: '#FF8C40',  label: 'Selecionado' },
} as const;

interface GridClockProps {
  slots: HorarioSlot[];
  onSelectSlot: (slot: HorarioSlot) => void;
}

function SlotCard({ slot, index, onSelectSlot }: { slot: HorarioSlot; index: number; onSelectSlot: (s: HorarioSlot) => void }) {
  const s = STATUS_STYLE[slot.status] ?? STATUS_STYLE.disponivel;
  const canSelect = slot.status !== 'coberto';
  const firstName = slot.inscricoes?.[0]?.nome?.split(' ')[0];

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.015, 0.5) }}
      disabled={!canSelect}
      onClick={() => canSelect && onSelectSlot(slot)}
      className="relative rounded-xl p-2.5 text-center group transition-all duration-200 disabled:cursor-default"
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
      }}
      whileHover={canSelect ? { scale: 1.06, y: -2 } : {}}
      whileTap={canSelect ? { scale: 0.97 } : {}}
    >
      {/* Glow on hover */}
      {canSelect && (
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-md"
          style={{ background: 'rgba(0,87,255,0.2)' }} />
      )}

      <div className="relative">
        {/* Time */}
        <div className="font-mono font-black text-white text-sm leading-none mb-1">
          {slot.hora}
        </div>

        {/* Status / name */}
        {slot.status === 'coberto' && firstName ? (
          <div className="text-xs truncate" style={{ color: s.text }}>{firstName}</div>
        ) : (
          <div className="text-xs" style={{ color: s.text }}>
            {slot.status === 'urgente' ? '🔥' : slot.status === 'coberto' ? '✓' : '+'}
          </div>
        )}
      </div>
    </motion.button>
  );
}

export default function GridClock({ slots, onSelectSlot }: GridClockProps) {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="section-title gradient-text-blue">Relógio de Oração</h2>
          <p className="text-white/50 mt-2">Selecione seu horário e assuma a intercessão</p>
        </div>

        {/* 4 period columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PERIODS.map((period) => {
            const periodSlots = slots.filter((s) =>
              period.hours.includes(s.hora.split(':')[0])
            );
            const covered = periodSlots.filter((s) => s.status === 'coberto').length;

            return (
              <div key={period.label}>
                {/* Period header */}
                <div className="glass rounded-2xl px-4 py-3 mb-3 flex items-center justify-between"
                  style={{ border: '1px solid rgba(0,87,255,0.15)' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{period.emoji}</span>
                    <div>
                      <div className="text-white font-bold text-sm">{period.label}</div>
                      <div className="text-white/30 text-xs">{period.range}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-kerigma-light font-black text-lg leading-none">{covered}</div>
                    <div className="text-white/30 text-xs">/{periodSlots.length}</div>
                  </div>
                </div>

                {/* Slots grid — 3 cols inside each period */}
                <div className="grid grid-cols-3 gap-1.5">
                  {periodSlots.map((slot, i) => (
                    <SlotCard
                      key={slot.id}
                      slot={slot}
                      index={i}
                      onSelectSlot={onSelectSlot}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {[
            { color: '#0057FF', glow: 'rgba(0,87,255,0.4)',   label: 'Coberto' },
            { color: 'rgba(255,255,255,0.15)', glow: 'transparent', label: 'Disponível' },
            { color: '#FF3B30', glow: 'rgba(255,59,48,0.4)',  label: 'Urgente' },
          ].map(({ color, glow, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm"
                style={{ background: color, border: '1px solid rgba(255,255,255,0.1)', boxShadow: `0 0 8px ${glow}` }} />
              <span className="text-sm text-white/60">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
