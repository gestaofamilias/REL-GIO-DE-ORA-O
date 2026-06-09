'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';

interface HeroCallToActionProps {
  onAssumirHorario: () => void;
  percentual: number;
  totalInscritos: number;
}

export default function HeroCallToAction({ onAssumirHorario, percentual, totalInscritos }: HeroCallToActionProps) {
  return (
    <section className="relative w-full max-w-4xl mx-auto px-6 py-10 text-center">
      {/* Soft glow behind title */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-64 blur-[100px] rounded-full bg-kerigma-blue/10 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-48 blur-[80px] rounded-full bg-kerigma-orange/8 pointer-events-none" />

      <div className="relative">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-kerigma-blue/50" />
          <span className="text-kerigma-light/70 text-xs tracking-[0.4em] uppercase font-medium">
            Assembleia de Deus Jardim Del Rey
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-kerigma-blue/50" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4"
        >
          <span className="gradient-text-blue">Relógio de</span>
          <br />
          <span className="text-white">Oração</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-kerigma-orange font-semibold text-xl md:text-2xl mt-2 mb-6"
        >
          24 horas de intercessão contínua
        </motion.p>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <p className="text-white/60 text-base md:text-lg leading-relaxed">
            &ldquo;Cada horário preenchido representa alguém buscando a Deus e
            <span className="text-kerigma-light font-medium"> intercedendo por vidas</span>.
            Juntos, cobrimos cada hora do dia em oração.&rdquo;
          </p>
        </motion.div>

        {/* Live counter badge */}
        {totalInscritos > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-2 glass-blue rounded-full px-5 py-2.5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <Heart size={14} className="text-kerigma-orange fill-kerigma-orange" />
            <span className="text-white font-bold">{totalInscritos}</span>
            <span className="text-kerigma-light/70 text-sm">pessoas orando agora</span>
            <span className="text-white/30">•</span>
            <span className="text-kerigma-light font-bold">{percentual}%</span>
            <span className="text-kerigma-light/70 text-sm">coberto</span>
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onAssumirHorario}
            className="btn-primary relative rounded-2xl px-10 py-5 text-base font-black tracking-wide shadow-glow-blue hover:scale-105 transition-transform duration-300 group"
            style={{ boxShadow: '0 0 40px rgba(0,87,255,0.3), 0 4px 20px rgba(0,0,0,0.3)' }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <span>🙏</span>
              <span>QUERO ASSUMIR UM HORÁRIO</span>
            </span>
          </button>

          <button
            onClick={() => document.getElementById('relogio')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors text-sm"
          >
            Ver horários disponíveis
            <ChevronDown size={16} className="animate-bounce" />
          </button>
        </motion.div>

        {/* Scripture */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-white/25 text-xs mt-8 italic"
        >
          &ldquo;Perseverai em oração, velando nela com ação de graças.&rdquo; — Colossenses 4:2
        </motion.p>
      </div>

      {/* Praying hands illustration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block"
      >
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
          {/* Stylized praying hands */}
          <path d="M150 40 C145 60, 130 80, 120 120 C115 140, 118 160, 125 180 L150 260 L175 180 C182 160, 185 140, 180 120 C170 80, 155 60, 150 40Z"
            fill="url(#handsGrad)" />
          <path d="M120 120 C100 110, 85 115, 78 130 C72 145, 80 165, 95 175 L125 185"
            fill="url(#handsGrad)" />
          <path d="M180 120 C200 110, 215 115, 222 130 C228 145, 220 165, 205 175 L175 185"
            fill="url(#handsGrad)" />
          <defs>
            <linearGradient id="handsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4DA6FF" />
              <stop offset="100%" stopColor="#0057FF" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </section>
  );
}
