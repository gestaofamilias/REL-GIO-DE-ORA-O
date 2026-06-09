'use client';

import { motion } from 'framer-motion';
import { Flame, ChevronRight } from 'lucide-react';
import type { HorarioSlot } from '@/types';

interface UrgencyPanelProps {
  slots: HorarioSlot[];
  onSelectSlot: (slot: HorarioSlot) => void;
}

export default function UrgencyPanel({ slots, onSelectSlot }: UrgencyPanelProps) {
  const urgentSlots = slots.filter((s) => s.status === 'urgente');
  const availableSlots = slots.filter((s) => s.status === 'disponivel').slice(0, 4);
  const targetSlots = urgentSlots.length > 0 ? urgentSlots : availableSlots;

  if (targetSlots.length === 0) return null;

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl urgent-pulse"
        style={{
          background: 'linear-gradient(135deg, rgba(255,59,48,0.15) 0%, rgba(255,106,0,0.15) 100%)',
          border: '1px solid rgba(255,59,48,0.3)',
          boxShadow: '0 0 40px rgba(255,59,48,0.1)',
        }}
      >
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.15) 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,59,48,0.2)', border: '1px solid rgba(255,59,48,0.4)' }}>
              <Flame size={20} className="text-red-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">
                {urgentSlots.length > 0 ? 'Horários Precisando de Intercessores' : 'Horários Disponíveis'}
              </h3>
              <p className="text-white/50 text-sm">
                {urgentSlots.length > 0
                  ? `${urgentSlots.length} horário(s) sem intercessor`
                  : 'Escolha um horário e participe da cobertura'}
              </p>
            </div>
          </div>

          {/* Slots grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {targetSlots.map((slot, i) => (
              <motion.button
                key={slot.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onSelectSlot(slot)}
                className="relative group rounded-xl p-4 text-center cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  background: urgentSlots.length > 0 ? 'rgba(255,59,48,0.2)' : 'rgba(0,87,255,0.2)',
                  border: `1px solid ${urgentSlots.length > 0 ? 'rgba(255,59,48,0.4)' : 'rgba(0,87,255,0.4)'}`,
                  boxShadow: `0 0 20px ${urgentSlots.length > 0 ? 'rgba(255,59,48,0.15)' : 'rgba(0,87,255,0.15)'}`,
                }}
              >
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: urgentSlots.length > 0 ? 'rgba(255,59,48,0.1)' : 'rgba(0,87,255,0.1)' }}
                />
                <div className="relative">
                  <div className="text-2xl font-black text-white">{slot.hora}</div>
                  <div className="text-xs mt-1" style={{ color: urgentSlots.length > 0 ? '#FF8080' : '#4DA6FF' }}>
                    {urgentSlots.length > 0 ? '🔥 Urgente' : '+ Disponível'}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={() => targetSlots[0] && onSelectSlot(targetSlots[0])}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #FF3B30, #FF6A00)',
                boxShadow: '0 4px 20px rgba(255,59,48,0.3)',
                color: 'white',
              }}
            >
              <Flame size={16} />
              Assumir Agora
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
