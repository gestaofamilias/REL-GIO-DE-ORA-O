'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Users, Clock, CheckCircle2, Target } from 'lucide-react';
import type { Stats } from '@/types';

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (target === 0) { setCurrent(0); return; }
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCurrent(Math.min(Math.round(increment * step), target));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return <span>{current.toLocaleString('pt-BR')}{suffix}</span>;
}

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  label: string;
  sublabel?: string;
  suffix?: string;
  scheme: 'blue' | 'orange' | 'green' | 'light';
  delay: number;
}

const SCHEMES = {
  blue:   { bg: 'rgba(0,87,255,0.12)',   border: 'rgba(0,87,255,0.25)',   text: '#4DA6FF',  glow: 'rgba(0,87,255,0.15)' },
  orange: { bg: 'rgba(255,106,0,0.12)',  border: 'rgba(255,106,0,0.25)',  text: '#FF8C40',  glow: 'rgba(255,106,0,0.15)' },
  green:  { bg: 'rgba(52,199,89,0.12)',  border: 'rgba(52,199,89,0.25)',  text: '#34C759',  glow: 'rgba(52,199,89,0.15)' },
  light:  { bg: 'rgba(77,166,255,0.12)', border: 'rgba(77,166,255,0.25)', text: '#4DA6FF',  glow: 'rgba(77,166,255,0.15)' },
};

function StatCard({ icon: Icon, value, label, sublabel, suffix, scheme, delay }: StatCardProps) {
  const c = SCHEMES[scheme];
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="relative group card-hover rounded-2xl p-5 text-center"
      style={{ background: c.bg, border: `1px solid ${c.border}`, backdropFilter: 'blur(20px)' }}
    >
      <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: c.glow }} />
      <div className="relative">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3"
          style={{ background: c.bg, border: `1px solid ${c.border}` }}>
          <Icon size={22} style={{ color: c.text }} />
        </div>
        <div className="text-3xl md:text-4xl font-black text-white mb-0.5">
          <AnimatedNumber target={value} suffix={suffix} />
        </div>
        <div className="text-sm font-semibold" style={{ color: c.text }}>{label}</div>
        {sublabel && <div className="text-xs text-white/30 mt-0.5">{sublabel}</div>}
      </div>
    </motion.div>
  );
}

export default function HeroSection({ stats }: { stats: Stats }) {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatCard
          icon={Users}
          value={stats.total_participantes}
          label="Pessoas Orando"
          sublabel="intercessores inscritos"
          scheme="blue"
          delay={0.1}
        />
        <StatCard
          icon={CheckCircle2}
          value={stats.horarios_cobertos}
          label="Horários Cobertos"
          sublabel="em 24 horas"
          scheme="green"
          delay={0.2}
        />
        <StatCard
          icon={Clock}
          value={stats.horarios_disponiveis}
          label="Ainda Disponíveis"
          sublabel="aguardando intercessores"
          scheme="orange"
          delay={0.3}
        />
        <StatCard
          icon={Target}
          value={stats.percentual_cobertura}
          suffix="%"
          label="do Relógio Coberto"
          sublabel="cobertura total"
          scheme="light"
          delay={0.4}
        />
      </div>
    </section>
  );
}
