'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BookOpen, Plus, X, Send } from 'lucide-react';
import { toast } from 'sonner';
import type { PedidoOracao, CategoriaOracao, FormPedidoOracao } from '@/types';
import { CATEGORIAS_ORACAO } from '@/types';

const schema = z.object({
  nome: z.string().min(2, 'Informe pelo menos seu primeiro nome'),
  categoria: z.enum(['familia', 'saude', 'vida_espiritual', 'trabalho', 'evangelismo', 'outros']),
  descricao: z.string().min(10, 'Descreva seu pedido (mínimo 10 caracteres)').max(400),
});

interface PrayerRequestsSectionProps {
  pedidos: PedidoOracao[];
  onRefresh: () => void;
}

function PedidoCard({ pedido, index }: { pedido: PedidoOracao; index: number }) {
  const cat = CATEGORIAS_ORACAO[pedido.categoria];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="glass rounded-2xl p-4 card-hover"
      style={{ border: `1px solid ${cat.color}25` }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 mt-0.5"
          style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}30` }}
        >
          {cat.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-semibold" style={{ color: cat.color }}>{cat.label}</span>
            <span className="text-white/25 text-xs">{pedido.nome}</span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">{pedido.descricao}</p>
        </div>
      </div>
    </motion.div>
  );
}

function AddPedidoModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormPedidoOracao>({
    resolver: zodResolver(schema),
    defaultValues: { categoria: 'familia' },
  });

  const catWatch = watch('categoria');

  async function onSubmit(data: FormPedidoOracao) {
    try {
      const res = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Erro ao enviar pedido');
      toast.success('🙏 Pedido enviado! Estará na corrente de oração.', { duration: 4000 });
      onSuccess();
      onClose();
    } catch {
      toast.error('Erro ao enviar pedido');
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
        style={{ border: '1px solid rgba(0,87,255,0.2)', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
      >
        {/* Header */}
        <div className="relative p-6 pb-4" style={{ background: 'linear-gradient(135deg, rgba(0,87,255,0.15), rgba(0,26,78,0.4))' }}>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-white/50 hover:text-white">
            <X size={15} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl glass-blue flex items-center justify-center">
              <BookOpen size={20} className="text-kerigma-blue" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Compartilhar Pedido de Oração</h3>
              <p className="text-white/40 text-xs mt-0.5">Sua necessidade será apresentada em oração</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Nome */}
          <div>
            <label className="text-sm text-white/60 mb-1.5 block">Seu nome (ou anônimo)</label>
            <input {...register('nome')} placeholder="Primeiro nome ou 'Anônimo'" className="kerigma-input w-full rounded-xl px-4 py-2.5 text-sm" />
            {errors.nome && <p className="text-red-400 text-xs mt-1">{errors.nome.message}</p>}
          </div>

          {/* Categoria */}
          <div>
            <label className="text-sm text-white/60 mb-2 block">Categoria</label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.entries(CATEGORIAS_ORACAO) as [CategoriaOracao, typeof CATEGORIAS_ORACAO[CategoriaOracao]][]).map(([key, cat]) => {
                const sel = catWatch === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setValue('categoria', key)}
                    className="flex flex-col items-center gap-1 py-2.5 rounded-xl text-xs font-medium transition-all"
                    style={{
                      background: sel ? `${cat.color}20` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${sel ? cat.color + '50' : 'rgba(255,255,255,0.08)'}`,
                      color: sel ? cat.color : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    <span className="text-lg">{cat.icon}</span>
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="text-sm text-white/60 mb-1.5 block">Pedido de oração</label>
            <textarea
              {...register('descricao')}
              placeholder="Compartilhe sua necessidade. Os intercessores estarão orando por você..."
              rows={4}
              className="kerigma-input w-full rounded-xl px-4 py-3 text-sm resize-none"
            />
            {errors.descricao && <p className="text-red-400 text-xs mt-1">{errors.descricao.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full rounded-2xl py-4 font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <><Send size={16} /> Enviar Pedido</>
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function PrayerRequestsSection({ pedidos, onRefresh }: PrayerRequestsSectionProps) {
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
            <div className="inline-flex items-center gap-2 glass-blue rounded-full px-3 py-1.5 mb-3">
              <BookOpen size={12} className="text-kerigma-blue" />
              <span className="text-kerigma-light text-xs font-bold tracking-wider uppercase">Corrente de Oração</span>
            </div>
            <h2 className="section-title gradient-text-blue">Pedidos de Oração</h2>
            <p className="text-white/40 text-sm mt-1 max-w-md">
              Compartilhe sua necessidade. Os intercessores do Relógio de Oração estarão apresentando seu pedido a Deus.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl btn-blue text-sm font-semibold flex-shrink-0"
          >
            <Plus size={16} />
            Enviar Pedido
          </button>
        </div>

        {/* Grid */}
        {pedidos.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center">
            <div className="text-4xl mb-3">🙏</div>
            <p className="text-white/50">Nenhum pedido ainda. Seja o primeiro a compartilhar.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pedidos.map((p, i) => (
              <PedidoCard key={p.id} pedido={p} index={i} />
            ))}
          </div>
        )}

        {/* Scripture */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-white/20 text-xs italic mt-6"
        >
          &ldquo;Não andeis ansiosos por coisa alguma; antes em tudo apresentai as vossas petições a Deus.&rdquo; — Filipenses 4:6
        </motion.p>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <AddPedidoModal onClose={() => setShowModal(false)} onSuccess={onRefresh} />
        )}
      </AnimatePresence>
    </section>
  );
}
