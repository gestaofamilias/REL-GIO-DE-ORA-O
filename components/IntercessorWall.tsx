'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { Inscricao } from '@/types';

const AVATAR_COLORS = [
  { bg: 'rgba(0,87,255,0.2)',   border: 'rgba(0,87,255,0.35)',   text: '#4DA6FF' },
  { bg: 'rgba(255,106,0,0.2)',  border: 'rgba(255,106,0,0.35)',  text: '#FF8C40' },
  { bg: 'rgba(77,166,255,0.2)', border: 'rgba(77,166,255,0.35)', text: '#4DA6FF' },
  { bg: 'rgba(52,199,89,0.2)',  border: 'rgba(52,199,89,0.35)',  text: '#34C759' },
  { bg: 'rgba(191,90,242,0.2)', border: 'rgba(191,90,242,0.35)', text: '#BF5AF2' },
  { bg: 'rgba(255,159,10,0.2)', border: 'rgba(255,159,10,0.35)', text: '#FF9F0A' },
];

function getFirstName(nome: string): string {
  return nome.trim().split(' ')[0];
}

interface IntercessorCardProps {
  inscricao: Inscricao;
  index: number;
}

function IntercessorCard({ inscricao, index }: IntercessorCardProps) {
  const c = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const firstName = getFirstName(inscricao.nome);
  const initial = firstName[0]?.toUpperCase() ?? '?';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 1) }}
      className="flex flex-col items-center gap-2 p-3 rounded-2xl group card-hover"
      style={{ background: c.bg, border: `1px solid ${c.border}`, backdropFilter: 'blur(12px)' }}
    >
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${c.text}55, ${c.text}22)`,
          border: `2px solid ${c.text}55`,
          color: c.text,
        }}
      >
        {initial}
      </div>

      {/* First name */}
      <span className="text-white text-xs font-semibold text-center leading-tight truncate w-full text-center">
        {firstName}
      </span>

      {/* Time */}
      <span
        className="font-mono font-black text-sm tracking-tight"
        style={{ color: c.text }}
      >
        {inscricao.horario?.hora ?? '--:--'}
      </span>
    </motion.div>
  );
}

interface IntercessorWallProps {
  inscricoes: Inscricao[];
}

export default function IntercessorWall({ inscricoes }: IntercessorWallProps) {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 glass-blue rounded-full px-4 py-2 mb-4">
            <Heart size={13} className="text-kerigma-orange fill-kerigma-orange" />
            <span className="text-kerigma-light text-xs font-bold tracking-wider uppercase">
              Em Oração Agora
            </span>
            <Heart size={13} className="text-kerigma-orange fill-kerigma-orange" />
          </div>
          <h2 className="section-title gradient-text-blue">Mural de Intercessores</h2>
          <p className="text-white/40 mt-2 max-w-md mx-auto text-sm leading-relaxed">
            Cada nome aqui representa alguém que se comprometeu a interceder durante esse horário.
            {inscricoes.length > 0 && (
              <span className="text-kerigma-light font-semibold"> {inscricoes.length} intercessores</span>
            )}{' '}
            {inscricoes.length > 0 && 'cobrindo a corrente de oração.'}
          </p>
        </div>

        {inscricoes.length === 0 ? (
          <div className="glass rounded-3xl p-16 text-center">
            <div className="text-5xl mb-4">🙏</div>
            <p className="text-white/50 font-medium">Seja o(a) primeiro(a) intercessor(a)!</p>
            <p className="text-white/30 text-sm mt-2">Assuma um horário e inicie a corrente de oração.</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
            {inscricoes.map((inscricao, i) => (
              <IntercessorCard key={inscricao.id} inscricao={inscricao} index={i} />
            ))}
          </div>
        )}

        {/* Inspirational quote */}
        {inscricoes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-white/25 text-xs italic">
              &ldquo;Confessai, pois, os vossos pecados uns aos outros e orai uns pelos outros, para serdes curados.&rdquo; — Tiago 5:16
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
