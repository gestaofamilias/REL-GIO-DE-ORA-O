'use client';

import { motion } from 'framer-motion';

interface HeaderProps {
  percentual: number;
  horariosCobertos: number;
  totalHorarios: number;
}

export default function Header({ percentual, horariosCobertos, totalHorarios }: HeaderProps) {
  return (
    <header className="relative w-full pt-8 pb-4 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Top bar — logo + nav */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-kerigma-blue/30 rounded-xl scale-150" />
              <div className="relative w-11 h-11 rounded-2xl glass flex items-center justify-center border border-kerigma-blue/30">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path
                    d="M3 13 C6 8, 11 5, 15 6 C19 7, 22 10, 22 13 C22 16, 19 19, 15 20 C11 21, 6 18, 3 13 Z"
                    fill="url(#fishG)"
                  />
                  <circle cx="17" cy="11" r="1.2" fill="white" opacity="0.9" />
                  <path d="M20 9 L24 6 M20 17 L24 20 M21 13 L25 13" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="fishG" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#0057FF" />
                      <stop offset="100%" stopColor="#4DA6FF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div>
              <div className="font-black text-white text-lg tracking-tight leading-none">KERIGMA</div>
              <div className="text-kerigma-blue text-xs font-bold tracking-[0.3em]">24H</div>
            </div>
          </div>

          {/* Right: admin link */}
          <a
            href="/admin"
            className="text-xs text-white/25 hover:text-white/50 transition-colors"
          >
            Admin
          </a>
        </motion.div>

        {/* Progress strip */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between text-xs text-white/40 mb-1.5">
            <span>Cobertura de Oração</span>
            <span className="text-kerigma-light font-semibold">
              {horariosCobertos} de {totalHorarios} horários cobertos
            </span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${percentual}%` }}
              transition={{ duration: 2, delay: 0.6, ease: 'easeOut' }}
            />
          </div>
          <div className="flex items-center justify-end mt-1">
            <span className="text-kerigma-light font-bold text-sm">{percentual}% do relógio coberto</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
