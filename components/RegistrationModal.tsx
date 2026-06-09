'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Clock, User, Phone, Send, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import type { HorarioSlot, FormInscricao } from '@/types';
import { AREAS_INTERESSE } from '@/types';

const schema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  telefone: z.string().min(10, 'Telefone inválido').max(15),
  horario_id: z.string().min(1, 'Horário obrigatório'),
  pedido_oracao: z.string().optional(),
  presencial: z.boolean().default(false),
  areas_interesse: z.array(z.string()).default([]),
});

interface RegistrationModalProps {
  slot: HorarioSlot | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RegistrationModal({ slot, onClose, onSuccess }: RegistrationModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormInscricao>({
    resolver: zodResolver(schema),
    defaultValues: { presencial: false, areas_interesse: [] },
  });

  const areasWatch = watch('areas_interesse') ?? [];

  useEffect(() => {
    if (slot) {
      reset({ horario_id: slot.id, presencial: false, areas_interesse: [] });
    }
  }, [slot, reset]);

  function toggleArea(value: string) {
    const current = areasWatch;
    if (current.includes(value)) {
      setValue('areas_interesse', current.filter((a) => a !== value));
    } else {
      setValue('areas_interesse', [...current, value]);
    }
  }

  async function onSubmit(data: FormInscricao) {
    try {
      const res = await fetch('/api/inscricoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erro ao realizar inscrição');
      }

      toast.success(`🙏 ${data.nome}, seu horário ${slot?.hora} foi confirmado!`, {
        description: 'Que Deus abençoe sua intercessão.',
        duration: 5000,
      });

      onSuccess();
      onClose();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Erro ao realizar inscrição');
    }
  }

  return (
    <AnimatePresence>
      {slot && (
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
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="glass rounded-3xl w-full max-w-md overflow-hidden"
            style={{
              border: '1px solid rgba(0,87,255,0.2)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,87,255,0.08)',
            }}
          >
            {/* Header */}
            <div
              className="relative p-6 pb-5"
              style={{ background: 'linear-gradient(135deg, rgba(0,87,255,0.18), rgba(0,26,78,0.5))' }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                <X size={15} />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl glass-blue flex items-center justify-center">
                  <Clock size={22} className="text-kerigma-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Assumir Horário de Oração</h3>
                  <p className="text-white/50 text-sm">Junte-se à corrente de intercessão</p>
                </div>
              </div>

              <div className="mt-4 glass-blue rounded-2xl px-4 py-3 inline-flex items-center gap-3">
                <span className="text-kerigma-light font-black text-3xl tracking-tight">{slot.hora}</span>
                <div>
                  <div className="text-white/80 text-xs font-medium">Horário selecionado</div>
                  <div className="text-white/40 text-xs">30 minutos de intercessão</div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">
                  <User size={11} className="inline mr-1.5 text-kerigma-blue" />
                  Nome Completo *
                </label>
                <input
                  {...register('nome')}
                  placeholder="Seu nome completo"
                  autoFocus
                  className="kerigma-input w-full rounded-xl px-4 py-3 text-sm"
                />
                {errors.nome && <p className="text-red-400 text-xs mt-1">{errors.nome.message}</p>}
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">
                  <Phone size={11} className="inline mr-1.5 text-kerigma-blue" />
                  Telefone / WhatsApp *
                </label>
                <input
                  {...register('telefone')}
                  placeholder="(41) 99999-9999"
                  type="tel"
                  className="kerigma-input w-full rounded-xl px-4 py-3 text-sm"
                />
                {errors.telefone && <p className="text-red-400 text-xs mt-1">{errors.telefone.message}</p>}
              </div>

              {/* Presencial */}
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  <MapPin size={11} className="inline mr-1.5 text-kerigma-blue" />
                  Participarei presencialmente?
                </label>
                <div className="flex gap-3">
                  {[
                    { value: true, label: 'Sim, estarei presente' },
                    { value: false, label: 'Orarei de casa' },
                  ].map(({ value, label }) => {
                    const isSelected = watch('presencial') === value;
                    return (
                      <button
                        key={String(value)}
                        type="button"
                        onClick={() => setValue('presencial', value)}
                        className="flex-1 py-2.5 rounded-xl text-xs font-medium transition-all duration-200"
                        style={{
                          background: isSelected ? (value ? 'rgba(0,87,255,0.25)' : 'rgba(255,106,0,0.2)') : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${isSelected ? (value ? 'rgba(0,87,255,0.5)' : 'rgba(255,106,0,0.4)') : 'rgba(255,255,255,0.1)'}`,
                          color: isSelected ? (value ? '#4DA6FF' : '#FF8C40') : 'rgba(255,255,255,0.4)',
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Áreas de interesse */}
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Área de Interesse
                  <span className="text-white/30 ml-1">(opcional)</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {AREAS_INTERESSE.map(({ value, label, icon }) => {
                    const selected = areasWatch.includes(value);
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => toggleArea(value)}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all duration-200"
                        style={{
                          background: selected ? 'rgba(0,87,255,0.2)' : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${selected ? 'rgba(0,87,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                          color: selected ? '#4DA6FF' : 'rgba(255,255,255,0.5)',
                        }}
                      >
                        <span>{icon}</span>
                        <span className="font-medium">{label}</span>
                        {selected && <span className="ml-auto text-kerigma-blue text-xs">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pedido de oração */}
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">
                  Pedido de Oração
                  <span className="text-white/30 ml-1">(opcional)</span>
                </label>
                <textarea
                  {...register('pedido_oracao')}
                  placeholder="Compartilhe um pedido de oração com a intercessão..."
                  rows={3}
                  className="kerigma-input w-full rounded-xl px-4 py-3 text-sm resize-none"
                />
                <p className="text-white/20 text-xs mt-1">Seu pedido será incluído na corrente de oração.</p>
              </div>

              {/* Submit */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full rounded-2xl py-4 font-bold text-base tracking-wide flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Confirmando...
                    </>
                  ) : (
                    <>
                      <Send size={17} />
                      ASSUMIR HORÁRIO {slot.hora}
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-white/25 mt-3">
                  Após confirmar, você receberá uma mensagem no WhatsApp. 🙏
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
