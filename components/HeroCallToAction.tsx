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
    <section className="relative w-full overflow-hidden min-h-[520px] md:min-h-[600px] flex flex-col justify-center">

      {/* ── Imagem de fundo ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />

      {/* ── Overlay escuro — garante legibilidade do texto ──────── */}
      {/* Gradiente: escuro nas bordas, semitransparente no centro */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(to bottom, rgba(0,13,46,0.72) 0%, rgba(0,13,46,0.45) 40%, rgba(0,13,46,0.65) 100%)',
            'linear-gradient(to right, rgba(0,13,46,0.55) 0%, transparent 40%, rgba(0,13,46,0.3) 100%)',
          ].join(', '),
        }}
      />

      {/* ── Conteúdo ─────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-kerigma-blue/60" />
          <span className="text-kerigma-light/80 text-xs tracking-[0.4em] uppercase font-medium drop-shadow">
            Assembleia de Deus Jardim Del Rey
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-kerigma-blue/60" />
        </motion.div>

        {/* Título principal */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4 drop-shadow-lg"
        >
          <span className="gradient-text-blue">Relógio de</span>
          <br />
          <span className="text-white">Oração</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-kerigma-orange font-semibold text-xl md:text-2xl mt-2 mb-6 drop-shadow"
        >
          24 horas de intercessão contínua
        </motion.p>

        {/* Citação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <p className="text-white/70 text-base md:text-lg leading-relaxed drop-shadow">
            &ldquo;Cada horário preenchido representa alguém buscando a Deus e
            <span className="text-kerigma-light font-medium"> intercedendo por vidas</span>.
            Juntos, cobrimos cada hora do dia em oração.&rdquo;
          </p>
        </motion.div>

        {/* Contador ao vivo */}
        {totalInscritos > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 mb-8"
            style={{
              background: 'rgba(0,13,46,0.65)',
              border: '1px solid rgba(77,166,255,0.35)',
              backdropFilter: 'blur(12px)',
            }}
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

        {/* Botões CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onAssumirHorario}
            className="btn-primary relative rounded-2xl px-10 py-5 text-base font-black tracking-wide hover:scale-105 transition-transform duration-300"
            style={{ boxShadow: '0 0 40px rgba(0,87,255,0.45), 0 4px 20px rgba(0,0,0,0.4)' }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <span>🙏</span>
              <span>QUERO ASSUMIR UM HORÁRIO</span>
            </span>
          </button>

          <button
            onClick={() => document.getElementById('relogio')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors text-sm drop-shadow"
          >
            Ver horários disponíveis
            <ChevronDown size={16} className="animate-bounce" />
          </button>
        </motion.div>

        {/* Versículo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-white/35 text-xs mt-8 italic drop-shadow"
        >
          &ldquo;Perseverai em oração, velando nela com ação de graças.&rdquo; — Colossenses 4:2
        </motion.p>
      </div>

      {/* ── Fade suave para a próxima seção ─────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,13,46,0.95))' }}
      />
    </section>
  );
}
