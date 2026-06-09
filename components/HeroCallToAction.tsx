'use client';

import { motion } from 'framer-motion';
import { Heart, MapPin, Globe, Instagram, Facebook, Youtube } from 'lucide-react';

interface HeroCallToActionProps {
  onAssumirHorario: () => void;
  percentual: number;
  totalInscritos: number;
}

// ── Ministry pillar SVG icons ─────────────────────────────────────
function FishSVG() {
  return (
    <svg width="32" height="22" viewBox="0 0 42 28" fill="none">
      <path d="M3 14 C8 6 17 3 24 6 C30 9 36 14 36 14 C36 14 30 19 24 22 C17 25 8 22 3 14Z"
        stroke="currentColor" strokeWidth="2" />
      <path d="M33 7 L40 3 M33 21 L40 25 M36 14 L42 14"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HeartSVG() {
  return (
    <svg width="28" height="26" viewBox="0 0 28 26" fill="none">
      <path d="M14 24 C14 24 1 15 1 8 C1 4 4 1 8 1 C10.5 1 12.5 2.5 14 5 C15.5 2.5 17.5 1 20 1 C24 1 27 4 27 8 C27 15 14 24 14 24Z"
        stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function HandsSVG() {
  return (
    <svg width="28" height="30" viewBox="0 0 34 38" fill="none">
      <path d="M8 22 L8 10 C8 8 10 6 12 8 L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 20 L12 7 C12 5 14.5 4 16 6.5 L16 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 20 L16 7 C16 5 18.5 4 20 6.5 L20 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 22 L20 10 C20 8 22 7 24 9 L24 22 L24 26 C24 30 20 34 16 34 L12 34 C8 34 6 30 6 26 L6 22 Z"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PeopleSVG() {
  return (
    <svg width="34" height="28" viewBox="0 0 42 34" fill="none">
      <circle cx="14" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="28" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M1 30 C1 21 7 17 14 17 C21 17 27 21 27 30"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M27 17 C34 17 41 21 41 30"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function AnchorSVG() {
  return (
    <svg width="24" height="30" viewBox="0 0 28 38" fill="none">
      <circle cx="14" cy="6" r="5" stroke="currentColor" strokeWidth="2" />
      <line x1="14" y1="11" x2="14" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 15 L23 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 34 C4 27 8 25 14 25 C20 25 24 27 24 34"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const PILLARS = [
  { label: 'Evangelismo', icon: <FishSVG /> },
  { label: 'Amor',        icon: <HeartSVG /> },
  { label: 'Cuidado',     icon: <HandsSVG /> },
  { label: 'Acolhimento', icon: <PeopleSVG /> },
  { label: 'Salvação',    icon: <AnchorSVG /> },
];

// ── Praying silhouette SVG ────────────────────────────────────────
function PrayingSilhouette() {
  return (
    <svg viewBox="0 0 240 400" className="h-full w-auto" preserveAspectRatio="xMidYMax meet">
      {/* Head */}
      <ellipse cx="120" cy="58" rx="30" ry="36" fill="white" opacity="0.15" />
      {/* Neck */}
      <rect x="110" y="90" width="20" height="18" rx="4" fill="white" opacity="0.12" />
      {/* Torso leaning forward */}
      <path d="M120 108 C95 115 68 138 55 172 L48 300 L82 300 L88 230 L100 230 L100 300 L140 300 L140 230 L152 230 L158 300 L192 300 L185 172 C172 138 145 115 120 108 Z"
        fill="white" opacity="0.11" />
      {/* Left arm */}
      <path d="M98 155 C80 148 58 148 46 162 C35 176 46 194 62 193 C78 192 94 177 104 166 Z"
        fill="white" opacity="0.14" />
      {/* Right arm */}
      <path d="M142 155 C160 148 182 148 194 162 C205 176 194 194 178 193 C162 192 146 177 136 166 Z"
        fill="white" opacity="0.14" />
      {/* Clasped hands */}
      <ellipse cx="120" cy="200" rx="32" ry="20" fill="white" opacity="0.14" />
      {/* Shadow at base */}
      <ellipse cx="120" cy="360" rx="55" ry="12" fill="white" opacity="0.05" />
    </svg>
  );
}

export default function HeroCallToAction({ onAssumirHorario, percentual, totalInscritos }: HeroCallToActionProps) {
  return (
    <section className="relative w-full overflow-hidden">

      {/* ── Background gradient ─────────────────────────────── */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(125deg, #000D2E 0%, #001A4E 30%, #002B6B 60%, #003DA8 100%)' }} />

      {/* Center glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 55% 45%, rgba(77,166,255,0.22) 0%, transparent 62%)' }} />

      {/* ── Praying silhouette — left ───────────────────────── */}
      <div className="absolute left-0 bottom-0 h-[90%] w-56 md:w-72 pointer-events-none select-none">
        <PrayingSilhouette />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, transparent 60%, rgba(0,13,46,0.6) 100%)' }} />
      </div>

      {/* ── Ghost clock face — right bg ─────────────────────── */}
      <div className="absolute right-[10%] top-[10%] w-72 h-72 pointer-events-none select-none">
        <svg viewBox="0 0 300 300" className="w-full h-full opacity-[0.07]">
          <circle cx="150" cy="150" r="140" fill="none" stroke="white" strokeWidth="1.5" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 - 90) * Math.PI / 180;
            return <line key={i}
              x1={150 + 118 * Math.cos(a)} y1={150 + 118 * Math.sin(a)}
              x2={150 + 136 * Math.cos(a)} y2={150 + 136 * Math.sin(a)}
              stroke="white" strokeWidth="3" />;
          })}
          {Array.from({ length: 60 }).map((_, i) => {
            if (i % 5 === 0) return null;
            const a = (i * 6 - 90) * Math.PI / 180;
            return <line key={i}
              x1={150 + 129 * Math.cos(a)} y1={150 + 129 * Math.sin(a)}
              x2={150 + 136 * Math.cos(a)} y2={150 + 136 * Math.sin(a)}
              stroke="white" strokeWidth="1" />;
          })}
        </svg>
      </div>

      {/* ── Orange clock hands ──────────────────────────────── */}
      <div className="absolute pointer-events-none select-none"
        style={{ right: '-2%', top: '8%', width: '22vw', minWidth: 180, maxWidth: 280 }}>
        <svg viewBox="0 0 300 300" className="w-full h-auto drop-shadow-lg">
          {/* Hour hand ~1 o'clock */}
          <line x1="150" y1="150" x2="208" y2="68"
            stroke="#FF6A00" strokeWidth="10" strokeLinecap="round" />
          {/* Minute hand ~3 o'clock */}
          <line x1="150" y1="150" x2="252" y2="142"
            stroke="#FF6A00" strokeWidth="6" strokeLinecap="round" />
          {/* Center */}
          <circle cx="150" cy="150" r="11" fill="#FF6A00" />
          <circle cx="150" cy="150" r="5"  fill="white" opacity="0.85" />
        </svg>
      </div>

      {/* ── Orange brush stroke — top right ─────────────────── */}
      <div className="absolute top-0 right-0 w-72 md:w-96 pointer-events-none select-none">
        <svg viewBox="0 0 380 155" className="w-full h-auto">
          <path d="M35 22 C80 6 155 16 230 11 C270 8 320 16 375 30 C345 48 272 42 200 53 C128 64 42 52 35 22Z"
            fill="#FF6A00" />
          <path d="M60 72 C105 54 190 64 268 59 C305 57 350 65 372 78 C342 96 258 89 188 100 C115 111 42 97 60 72Z"
            fill="#FF6A00" opacity="0.72" />
        </svg>
      </div>

      {/* ── Script text — top right ──────────────────────────── */}
      <div className="absolute top-4 right-4 z-20 text-right pointer-events-none select-none">
        <p className="text-white/80 italic leading-snug text-base md:text-lg"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic' }}>
          Anunciar. Amar.<br />Acolher. Cuidar.
        </p>
      </div>

      {/* ── Blue brush stroke — bottom right ────────────────── */}
      <div className="absolute bottom-[56px] right-0 w-60 md:w-80 pointer-events-none select-none">
        <svg viewBox="0 0 320 110" className="w-full h-auto">
          <path d="M5 55 C45 35 120 46 200 41 C238 39 278 48 315 60 C282 78 200 72 135 82 C68 92 0 76 5 55Z"
            fill="#0057FF" opacity="0.9" />
        </svg>
      </div>

      {/* ── Boat illustration — bottom right ────────────────── */}
      <div className="absolute bottom-[56px] right-5 w-28 md:w-36 pointer-events-none select-none opacity-75">
        <svg viewBox="0 0 130 95" className="w-full h-auto">
          <line x1="65" y1="4" x2="65" y2="46" stroke="#FF6A00" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="49" y1="19" x2="81" y2="19" stroke="#FF6A00" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M22 58 C22 53 32 49 65 49 C98 49 108 53 108 58 L98 76 C84 84 46 84 32 76Z"
            fill="none" stroke="#FF6A00" strokeWidth="2" />
          <path d="M4 83 C18 77 33 89 49 82 C65 75 80 87 96 81 C110 76 120 84 128 80"
            fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" />
          <path d="M14 33 C17 30 20 31 23 28" fill="none" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M29 26 C32 23 35 24 38 21" fill="none" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 sm:px-10">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="pt-7 pb-3"
        >
          <div className="inline-flex flex-col items-center gap-0.5">
            <span className="font-black text-white tracking-[0.15em]"
              style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>
              K<span style={{ color: '#FF6A00' }}>E</span>RIGMA
            </span>
            <span className="text-white/50 uppercase tracking-[0.38em]"
              style={{ fontSize: '0.6rem' }}>
              Assembleia de Deus Jardim Del Rey
            </span>
          </div>
        </motion.div>

        {/* Big title */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15 }}
          className="mb-4"
        >
          <h1 className="font-black leading-[0.88] tracking-tight">
            <span className="block text-white" style={{ fontSize: 'clamp(3.2rem, 12vw, 7.5rem)' }}>
              RELÓGIO
            </span>
            <span className="block" style={{ fontSize: 'clamp(3.2rem, 12vw, 7.5rem)', color: '#FF6A00' }}>
              DE ORAÇÃO
            </span>
          </h1>
        </motion.div>

        {/* 24h badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
          className="flex justify-center mb-5"
        >
          <span
            className="px-7 py-2.5 rounded-full font-bold text-white uppercase"
            style={{
              background: 'rgba(0,9,32,0.88)',
              border: '1px solid rgba(255,255,255,0.2)',
              letterSpacing: '0.28em',
              fontSize: '0.78rem',
            }}
          >
            24 Horas de Intercessão Contínua
          </span>
        </motion.div>

        {/* Live counter */}
        {totalInscritos > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex justify-center gap-2 items-center mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/55 text-sm">
              <span className="text-white font-bold">{totalInscritos}</span> pessoas orando ·{' '}
              <span className="font-bold" style={{ color: '#FF6A00' }}>{percentual}%</span> coberto
            </span>
          </motion.div>
        )}

        {/* Bible verse */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.52 }}
          className="mb-6 max-w-md mx-auto"
        >
          <span className="text-5xl text-white/20 font-serif leading-none block -mb-3">"</span>
          <p className="text-white/62 text-base md:text-lg">
            Portanto, ide e fazei discípulos de todas as nações...
          </p>
          <p className="font-bold mt-1.5 text-sm" style={{ color: '#FF6A00' }}>Mateus 28:19</p>
        </motion.div>

        {/* Ministry pillars */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex justify-center items-end gap-5 sm:gap-10 pb-5 border-b border-white/10 overflow-x-auto"
        >
          {PILLARS.map(({ label, icon }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 text-white/55 flex-shrink-0">
              {icon}
              <span className="uppercase text-center"
                style={{ fontSize: '0.58rem', letterSpacing: '0.25em' }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Orange CTA strip ─────────────────────────────────── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={onAssumirHorario}
        className="relative z-10 w-full flex items-center justify-center gap-3 py-4 sm:py-5 cursor-pointer"
        style={{ background: '#FF6A00' }}
        whileHover={{ filter: 'brightness(1.09)' }}
        whileTap={{ scale: 0.995 }}
      >
        <Heart size={18} className="text-white fill-white flex-shrink-0" />
        <span
          className="text-white font-black uppercase text-center"
          style={{ fontSize: 'clamp(0.8rem, 2.8vw, 1.2rem)', letterSpacing: '0.12em' }}
        >
          Cada Horário Importa. Cada Oração Transforma.
        </span>
      </motion.button>

      {/* ── Footer bar ───────────────────────────────────────── */}
      <div
        className="relative z-10 w-full py-2.5 px-5 flex flex-wrap items-center justify-between gap-2 text-white/40"
        style={{ background: 'rgba(0,4,18,0.85)', fontSize: '0.68rem' }}
      >
        <div className="flex items-center gap-1.5">
          <MapPin size={10} />
          <span>Assembleia de Deus Jardim Del Rey · São José dos Pinhais - PR</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Globe size={10} />
            <span>projetokerigma.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Instagram size={10} />
            <Facebook size={10} />
            <Youtube size={10} />
            <span>/projetokerigma</span>
          </div>
        </div>
      </div>

    </section>
  );
}
