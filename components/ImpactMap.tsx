'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, CheckCircle2, Target } from 'lucide-react';
import type { Stats } from '@/types';

function AnimatedCounter({ target }: { target: number }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    const steps = 60;
    const inc = target / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setValue(Math.min(Math.round(inc * step), target));
      if (step >= steps) clearInterval(timer);
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <>{value.toLocaleString('pt-BR')}</>;
}

interface ImpactMapProps {
  stats: Stats;
}

const METRICS = [
  { key: 'total_participantes'  as keyof Stats, label: 'Pessoas Orando',     icon: Users,         color: '#0057FF' },
  { key: 'horarios_cobertos'    as keyof Stats, label: 'Horários Cobertos',   icon: CheckCircle2,  color: '#34C759' },
  { key: 'horarios_disponiveis' as keyof Stats, label: 'Ainda Disponíveis',   icon: Clock,         color: '#FF6A00' },
  { key: 'percentual_cobertura' as keyof Stats, label: 'Cobertura Total',     icon: Target,        color: '#4DA6FF', suffix: '%' },
] as const;

export default function ImpactMap({ stats }: ImpactMapProps) {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 glass-orange rounded-full px-4 py-2 mb-4">
            <span className="text-kerigma-orange text-xs font-bold tracking-wider uppercase">Impacto da Intercessão</span>
          </div>
          <h2 className="section-title gradient-text">O Fruto da Nossa Oração</h2>
          <p className="text-white/40 mt-2">Juntos, cobrindo cada hora do dia em intercessão</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {METRICS.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group card-hover rounded-2xl p-5 text-center"
                style={{
                  background: `${m.color}15`,
                  border: `1px solid ${m.color}30`,
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                  style={{ background: `${m.color}18` }} />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: `${m.color}18`, border: `1px solid ${m.color}35` }}>
                    <Icon size={20} style={{ color: m.color }} />
                  </div>
                  <div className="text-3xl font-black text-white mb-1">
                    <AnimatedCounter target={stats[m.key] as number} />
                    {'suffix' in m ? m.suffix : ''}
                  </div>
                  <div className="text-xs font-medium leading-tight" style={{ color: m.color }}>
                    {m.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-center glass rounded-2xl p-8 relative overflow-hidden"
          style={{ border: '1px solid rgba(0,87,255,0.12)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kerigma-blue/50 to-transparent" />
          <p className="text-xl md:text-2xl font-bold text-white/90 mb-3 leading-relaxed">
            &ldquo;Perseverai em oração, velando nela com ação de graças.&rdquo;
          </p>
          <p className="text-kerigma-blue font-semibold">Colossenses 4:2</p>
          <div className="flex flex-wrap justify-center gap-6 mt-5 text-sm text-white/30">
            <span>⛪ AD Jardim Del Rey</span>
            <span>📍 São José dos Pinhais - PR</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
