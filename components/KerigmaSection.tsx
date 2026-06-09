'use client';

import { motion } from 'framer-motion';

const MINISTRIES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 3 C8 3, 3 10, 3 16 C3 22, 8 29, 16 29 C24 29, 29 22, 29 16" stroke="#0057FF" strokeWidth="2" strokeLinecap="round"/>
        <path d="M22 8 L29 3 M29 3 L24 10 M29 3 L22 10" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="16" cy="16" r="4" fill="rgba(0,87,255,0.3)" stroke="#4DA6FF" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Evangelismo',
    desc: 'Anunciando as boas novas a cada pessoa que encontramos.',
    color: '#0057FF',
    bg: 'rgba(0,87,255,0.12)',
    border: 'rgba(0,87,255,0.25)',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 10 L8 22 M8 16 L20 16 M20 10 L20 22" stroke="#4DA6FF" strokeWidth="2" strokeLinecap="round"/>
        <rect x="4" y="6" width="24" height="20" rx="3" stroke="#0057FF" strokeWidth="1.5" fill="rgba(0,87,255,0.1)"/>
        <path d="M12 20 L16 16 L20 18" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Discipulado',
    desc: 'Crescendo juntos na fé e no conhecimento da Palavra.',
    color: '#4DA6FF',
    bg: 'rgba(77,166,255,0.12)',
    border: 'rgba(77,166,255,0.25)',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 6 C12 6, 8 9, 8 13 C8 20, 16 26, 16 26 C16 26, 24 20, 24 13 C24 9, 20 6, 16 6 Z" fill="rgba(255,106,0,0.2)" stroke="#FF6A00" strokeWidth="1.5"/>
        <path d="M12 13 L15 16 L20 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Acolhimento',
    desc: 'Recebendo cada pessoa com amor e cuidado genuíno.',
    color: '#FF6A00',
    bg: 'rgba(255,106,0,0.12)',
    border: 'rgba(255,106,0,0.25)',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="12" cy="12" r="5" stroke="#4DA6FF" strokeWidth="1.5" fill="rgba(77,166,255,0.15)"/>
        <circle cx="22" cy="20" r="5" stroke="#FF6A00" strokeWidth="1.5" fill="rgba(255,106,0,0.15)"/>
        <path d="M12 17 L12 20 M22 15 L22 12" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        <path d="M14 20 L20 20" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2"/>
      </svg>
    ),
    title: 'Visitação',
    desc: 'Indo até as pessoas com amor e serviço concreto.',
    color: '#4DA6FF',
    bg: 'rgba(77,166,255,0.12)',
    border: 'rgba(77,166,255,0.25)',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 26 L12 14 L18 20 L24 10 L28 16" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="6" cy="26" r="2" fill="#0057FF"/>
        <circle cx="12" cy="14" r="2" fill="#0057FF"/>
        <circle cx="18" cy="20" r="2" fill="#FF6A00"/>
        <circle cx="24" cy="10" r="2" fill="#0057FF"/>
        <circle cx="28" cy="16" r="2" fill="#FF6A00"/>
      </svg>
    ),
    title: 'Ação Social',
    desc: 'Sendo a mão de Deus na prática através do serviço.',
    color: '#FF6A00',
    bg: 'rgba(255,106,0,0.12)',
    border: 'rgba(255,106,0,0.25)',
  },
];

export default function KerigmaSection() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 glass-blue rounded-full px-4 py-2 mb-4">
            <span className="text-kerigma-blue text-xs font-bold tracking-wider uppercase">Projeto Kerigma</span>
          </div>
          <h2 className="section-title gradient-text mb-3">Além da Oração</h2>
          <p className="text-white/50 max-w-lg mx-auto leading-relaxed">
            &ldquo;A oração nos move. O evangelismo nos envia.&rdquo;
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['Anunciar', 'Amar', 'Acolher', 'Cuidar'].map((word, i) => (
              <span
                key={word}
                className="text-sm px-4 py-1.5 rounded-full font-medium"
                style={{
                  background: i % 2 === 0 ? 'rgba(0,87,255,0.15)' : 'rgba(255,106,0,0.15)',
                  border: `1px solid ${i % 2 === 0 ? 'rgba(0,87,255,0.3)' : 'rgba(255,106,0,0.3)'}`,
                  color: i % 2 === 0 ? '#4DA6FF' : '#FF8C40',
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {MINISTRIES.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group card-hover rounded-2xl p-5 text-center cursor-pointer"
              style={{ background: m.bg, border: `1px solid ${m.border}`, backdropFilter: 'blur(12px)' }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${m.color}15, transparent)` }}
              />
              <div className="relative">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: m.bg, border: `1px solid ${m.border}` }}
                >
                  {m.icon}
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{m.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-10"
        >
          <div
            className="inline-block glass rounded-2xl p-6 max-w-lg mx-auto"
            style={{ border: '1px solid rgba(0,87,255,0.2)' }}
          >
            <p className="text-white/70 text-sm leading-relaxed">
              O Projeto Kerigma é um movimento de evangelização, discipulado e acolhimento
              da{' '}
              <span className="text-kerigma-light font-semibold">
                Assembleia de Deus Jardim Del Rey
              </span>
              . Juntos somos a rede que pesca almas para o Reino.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
