'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sparkles, Plus, X, Send } from 'lucide-react';
import { toast } from 'sonner';
import type { Gratidao, FormGratidao } from '@/types';

const schema = z.object({
  nome: z.string().min(2, 'Informe seu nome'),
  texto: z.string().min(10, 'Conte o que Deus fez (mínimo 10 caracteres)').max(300),
});

const TESTIMONIES_EXAMPLES = [
  'Deus restaurou meu casamento.',
  'Consegui um emprego novo.',
  'Meu filho voltou para a igreja.',
  'Recebi cura da minha doença.',
  'Minha família encontrou paz.',
];

interface AddGratidaoModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

function AddGratidaoModal({ onClose, onSuccess }: AddGratidaoModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormGratidao>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormGratidao) {
    try {
      const res = await fetch('/api/gratidoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success('🌟 Gloria a Deus! Seu testemunho foi compartilhado.', { duration: 4000 });
      onSuccess();
      onClose();
    } catch {
      toast.error('Erro ao enviar. Tente novamente.');
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        className="glass rounded-3xl w-full max-w-md overflow-hidden"
        style={{ border: '1px solid rgba(255,106,0,0.2)', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
      >
        <div className="relative p-6 pb-4" style={{ background: 'linear-gradient(135deg, rgba(255,106,0,0.12), rgba(0,26,78,0.4))' }}>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-white/50 hover:text-white">
            <X size={15} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl glass-orange flex items-center justify-center">
              <Sparkles size={20} className="text-kerigma-orange" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Compartilhar Testemunho</h3>
              <p className="text-white/40 text-xs mt-0.5">Glorifique a Deus pelo que Ele fez</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="text-sm text-white/60 mb-1.5 block">Seu nome</label>
            <input {...register('nome')} placeholder="Seu nome" className="kerigma-input w-full rounded-xl px-4 py-2.5 text-sm" />
            {errors.nome && <p className="text-red-400 text-xs mt-1">{errors.nome.message}</p>}
          </div>
          <div>
            <label className="text-sm text-white/60 mb-1.5 block">O que Deus fez por você?</label>
            <textarea
              {...register('texto')}
              placeholder="Ex: Deus restaurou meu casamento. Que glória!"
              rows={4}
              className="kerigma-input w-full rounded-xl px-4 py-3 text-sm resize-none"
            />
            {errors.texto && <p className="text-red-400 text-xs mt-1">{errors.texto.message}</p>}
            {/* Suggestions */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {TESTIMONIES_EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  className="text-xs px-2.5 py-1 rounded-full glass text-white/30 hover:text-white/60 transition-colors border border-white/8"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl py-4 font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #FF6A00, #FF3B30)', color: 'white' }}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <><Send size={16} /> Compartilhar Testemunho</>
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

interface GratitudeWallProps {
  gratidoes: Gratidao[];
  onRefresh: () => void;
}

export default function GratitudeWall({ gratidoes, onRefresh }: GratitudeWallProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 glass-orange rounded-full px-3 py-1.5 mb-3">
              <Sparkles size={12} className="text-kerigma-orange" />
              <span className="text-kerigma-orange text-xs font-bold tracking-wider uppercase">Glória a Deus</span>
            </div>
            <h2 className="section-title gradient-text">Mural de Gratidão</h2>
            <p className="text-white/40 text-sm mt-1 max-w-md">
              Respostas de oração da nossa comunidade. Compartilhe o que Deus fez por você.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold flex-shrink-0 transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, rgba(255,106,0,0.2), rgba(255,59,48,0.1))', border: '1px solid rgba(255,106,0,0.3)', color: '#FF8C40' }}
          >
            <Plus size={16} />
            Compartilhar Testemunho
          </button>
        </div>

        {/* Cards */}
        {gratidoes.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center">
            <div className="text-4xl mb-3">✨</div>
            <p className="text-white/50">Aguardando os primeiros testemunhos.</p>
            <p className="text-white/30 text-sm mt-1">Deus está trabalhando! Compartilhe o que Ele fez.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gratidoes.map((g, i) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative rounded-2xl p-5 card-hover overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,106,0,0.1), rgba(255,159,10,0.06))',
                  border: '1px solid rgba(255,106,0,0.2)',
                }}
              >
                {/* Glow spot */}
                <div className="absolute -top-8 -right-8 w-24 h-24 blur-3xl rounded-full bg-kerigma-orange/10 pointer-events-none" />
                <div className="relative">
                  <div className="text-2xl mb-3">✨</div>
                  <p className="text-white/80 text-sm leading-relaxed italic mb-3">
                    &ldquo;{g.texto}&rdquo;
                  </p>
                  <div className="flex items-center gap-2 mt-auto">
                    <div className="w-6 h-6 rounded-full bg-kerigma-orange/20 border border-kerigma-orange/30 flex items-center justify-center text-xs font-bold text-kerigma-orange">
                      {g.nome[0]?.toUpperCase()}
                    </div>
                    <span className="text-white/40 text-xs">{g.nome}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-white/20 text-xs italic mt-6"
        >
          &ldquo;Dai graças em tudo, porque esta é a vontade de Deus em Cristo Jesus para convosco.&rdquo; — 1 Tessalonicenses 5:18
        </motion.p>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <AddGratidaoModal onClose={() => setShowModal(false)} onSuccess={onRefresh} />
        )}
      </AnimatePresence>
    </section>
  );
}
