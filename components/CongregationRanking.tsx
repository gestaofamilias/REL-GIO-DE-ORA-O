'use client';

import { motion } from 'framer-motion';
import { Trophy, Users, Clock, TrendingUp } from 'lucide-react';
interface CongregacaoRanking { id: string; nome: string; participantes: number; horarios: number; percentual: number; posicao: number; }

const MEDALS = ['🥇', '🥈', '🥉'];
const MEDAL_COLORS = [
  { bg: 'rgba(255,215,0,0.12)', border: 'rgba(255,215,0,0.3)', text: '#FFD700' },
  { bg: 'rgba(192,192,192,0.12)', border: 'rgba(192,192,192,0.3)', text: '#C0C0C0' },
  { bg: 'rgba(205,127,50,0.12)', border: 'rgba(205,127,50,0.3)', text: '#CD7F32' },
];

interface CongregationRankingProps {
  congregacoes: CongregacaoRanking[];
}

export default function CongregationRanking({ congregacoes }: CongregationRankingProps) {
  const maxHorarios = Math.max(...congregacoes.map((c) => c.horarios), 1);

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Trophy size={24} className="text-kerigma-orange" />
          <div>
            <h2 className="section-title gradient-text-blue">Ranking de Congregações</h2>
            <p className="text-white/40 text-sm mt-0.5">Quem está avançando mais no Reino</p>
          </div>
        </div>

        <div className="glass rounded-3xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-12 px-6 py-3 border-b border-white/10">
            <div className="col-span-1 text-xs text-white/30 font-medium">#</div>
            <div className="col-span-4 text-xs text-white/30 font-medium">Congregação</div>
            <div className="col-span-2 text-xs text-white/30 font-medium text-center hidden sm:block">
              <Users size={10} className="inline mr-1" />Part.
            </div>
            <div className="col-span-2 text-xs text-white/30 font-medium text-center hidden sm:block">
              <Clock size={10} className="inline mr-1" />Horários
            </div>
            <div className="col-span-5 sm:col-span-3 text-xs text-white/30 font-medium text-right">
              <TrendingUp size={10} className="inline mr-1" />Cobertura
            </div>
          </div>

          {/* Rows */}
          {congregacoes.map((cong, i) => {
            const mc = i < 3 ? MEDAL_COLORS[i] : { bg: 'transparent', border: 'transparent', text: '#4DA6FF' };
            const barWidth = (cong.horarios / maxHorarios) * 100;

            return (
              <motion.div
                key={cong.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="grid grid-cols-12 items-center px-6 py-4 border-b border-white/5 hover:bg-white/3 transition-colors"
              >
                {/* Position */}
                <div className="col-span-1">
                  <span className="text-lg">
                    {i < 3 ? MEDALS[i] : <span className="text-white/30 font-mono text-sm">{i + 1}</span>}
                  </span>
                </div>

                {/* Name */}
                <div className="col-span-4">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-sm font-semibold"
                    style={i < 3 ? { background: mc.bg, border: `1px solid ${mc.border}`, color: mc.text } : { color: 'white' }}
                  >
                    {cong.nome}
                  </div>
                </div>

                {/* Participants */}
                <div className="col-span-2 text-center hidden sm:block">
                  <span className="text-white font-bold">{cong.participantes}</span>
                </div>

                {/* Horarios */}
                <div className="col-span-2 text-center hidden sm:block">
                  <span className="text-kerigma-light font-bold">{cong.horarios}</span>
                </div>

                {/* Bar + % */}
                <div className="col-span-5 sm:col-span-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, #0057FF, #FF6A00)` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${barWidth}%` }}
                        transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                      />
                    </div>
                    <span className="text-white/60 text-xs w-10 text-right">{cong.percentual}%</span>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {congregacoes.length === 0 && (
            <div className="py-12 text-center text-white/40">
              Nenhuma congregação cadastrada ainda.
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
