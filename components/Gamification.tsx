'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { BADGE_CONFIG, type Badge } from '@/types';

const BADGE_LEVELS: { badge: Badge; requirement: string; unlocked?: boolean }[] = [
  { badge: 'pescador_iniciante', requirement: 'Assuma seu primeiro horário', unlocked: true },
  { badge: 'intercessor_fiel', requirement: 'Assuma 3 ou mais horários' },
  { badge: 'lancador_redes', requirement: 'Traga alguém para orar' },
  { badge: 'evangelista', requirement: 'Participe de um evangelismo' },
  { badge: 'discipulador', requirement: 'Conclua o treinamento Kerigma' },
];

export default function Gamification() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Award size={24} className="text-kerigma-orange" />
          <div>
            <h2 className="section-title gradient-text-blue">Sistema de Conquistas</h2>
            <p className="text-white/40 text-sm mt-0.5">Cada passo conta na jornada do Reino</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {BADGE_LEVELS.map(({ badge, requirement, unlocked }, i) => {
            const config = BADGE_CONFIG[badge];
            return (
              <motion.div
                key={badge}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-5 text-center relative overflow-hidden transition-all duration-300 ${
                  unlocked
                    ? 'card-hover cursor-pointer'
                    : 'opacity-50 cursor-default'
                }`}
                style={{
                  background: unlocked ? 'rgba(0,87,255,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${unlocked ? 'rgba(0,87,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
                  backdropFilter: 'blur(12px)',
                }}
              >
                {!unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl backdrop-blur-sm">
                    <span className="text-2xl">🔒</span>
                  </div>
                )}
                <div className="text-4xl mb-3">{config.emoji}</div>
                <div className="font-bold text-white text-sm mb-1">{config.label}</div>
                <div className="text-xs text-white/40 leading-snug">{requirement}</div>
                {unlocked && (
                  <div className="mt-2">
                    <span className="text-xs bg-kerigma-blue/30 text-kerigma-light px-2 py-0.5 rounded-full">
                      Desbloqueado
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
