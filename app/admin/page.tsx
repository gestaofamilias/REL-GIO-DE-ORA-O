'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock, LayoutDashboard, Users, Clock, BookOpen, Sparkles,
  Download, Trash2, MessageSquare, RefreshCw, LogOut, Eye, EyeOff,
  AlertCircle, Search, X, CheckCircle2, Target, LayoutGrid, CircleDot
} from 'lucide-react';

type ModoRelogio = 'clock' | 'grid';
import { toast } from 'sonner';
import { sendWhatsApp, generateWhatsAppMessage } from '@/lib/utils';
import type { Inscricao, HorarioSlot, Stats, PedidoOracao, Gratidao } from '@/types';
import { CATEGORIAS_ORACAO } from '@/types';
import Background from '@/components/Background';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'kerigma2026';

// ─── Login ────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) { sessionStorage.setItem('kerigma_admin', '1'); onLogin(); }
    else setError('Senha incorreta.');
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-3xl p-8 w-full max-w-sm"
        style={{ border: '1px solid rgba(0,87,255,0.25)', boxShadow: '0 25px 80px rgba(0,0,0,0.6)' }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl glass-blue flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-kerigma-blue" />
          </div>
          <h1 className="text-2xl font-black text-white">Painel Administrativo</h1>
          <p className="text-white/40 text-sm mt-1">KERIGMA 24H — Relógio de Oração</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha de acesso"
              className="kerigma-input w-full rounded-xl px-4 py-3 pr-10 text-sm"
              autoFocus
            />
            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && (
            <p className="text-red-400 text-sm flex items-center gap-1">
              <AlertCircle size={14} />{error}
            </p>
          )}
          <button type="submit" className="btn-primary w-full rounded-xl py-3 font-bold text-sm">
            Acessar Painel
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────
type Tab = 'overview' | 'inscricoes' | 'horarios' | 'pedidos' | 'gratidoes';

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('overview');
  const [inscricoes, setInscricoes] = useState<Inscricao[]>([]);
  const [horarios, setHorarios] = useState<HorarioSlot[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [pedidos, setPedidos] = useState<PedidoOracao[]>([]);
  const [gratidoes, setGratidoes] = useState<Gratidao[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modo, setModo] = useState<ModoRelogio>('clock');
  const [savingModo, setSavingModo] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [i, h, s, p, g, c] = await Promise.all([
        fetch('/api/inscricoes').then((r) => r.json()),
        fetch('/api/horarios').then((r) => r.json()),
        fetch('/api/stats').then((r) => r.json()),
        fetch('/api/pedidos').then((r) => r.json()),
        fetch('/api/gratidoes').then((r) => r.json()),
        fetch('/api/config').then((r) => r.json()),
      ]);
      if (Array.isArray(i)) setInscricoes(i);
      if (Array.isArray(h)) setHorarios(h);
      if (s?.stats) setStats(s.stats);
      if (Array.isArray(p)) setPedidos(p);
      if (Array.isArray(g)) setGratidoes(g);
      if (c?.modo_relogio) setModo(c.modo_relogio as ModoRelogio);
    } catch { toast.error('Erro ao carregar dados'); }
    finally { setLoading(false); }
  }, []);

  async function changeModo(novoModo: ModoRelogio) {
    setSavingModo(true);
    try {
      const res = await fetch('/api/config', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modo_relogio: novoModo }),
      });
      if (res.ok) {
        setModo(novoModo);
        toast.success(`Modo alterado para ${novoModo === 'clock' ? 'Relógio Circular' : 'Grade de Horários'}`);
      }
    } catch { toast.error('Erro ao salvar modo'); }
    finally { setSavingModo(false); }
  }

  useEffect(() => { fetchAll(); }, [fetchAll]);

  async function deleteInscricao(id: string) {
    if (!confirm('Excluir esta inscrição?')) return;
    const res = await fetch(`/api/inscricoes?id=${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Inscrição excluída'); fetchAll(); }
    else toast.error('Erro ao excluir');
  }

  async function deletePedido(id: string) {
    if (!confirm('Ocultar este pedido?')) return;
    const res = await fetch(`/api/pedidos?id=${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Pedido removido'); fetchAll(); }
  }

  async function deleteGratidao(id: string) {
    if (!confirm('Remover este testemunho?')) return;
    const res = await fetch(`/api/gratidoes?id=${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Testemunho removido'); fetchAll(); }
  }

  async function toggleUrgente(id: string, current: string) {
    const newStatus = current === 'urgente' ? 'disponivel' : 'urgente';
    const res = await fetch('/api/horarios', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus }),
    });
    if (res.ok) { toast.success(`Marcado como ${newStatus}`); fetchAll(); }
  }

  function exportCSV() {
    const headers = ['Nome', 'Telefone', 'Horário', 'Presencial', 'Áreas', 'Badge', 'Data'];
    const rows = inscricoes.map((i) => [
      i.nome, i.telefone,
      i.horario?.hora ?? '',
      i.presencial ? 'Sim' : 'Não',
      (i.areas_interesse ?? []).join(';'),
      i.badge ?? '',
      new Date(i.created_at).toLocaleDateString('pt-BR'),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `kerigma-inscricoes-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  }

  const TABS = [
    { key: 'overview' as Tab, label: 'Visão Geral', icon: LayoutDashboard },
    { key: 'inscricoes' as Tab, label: 'Inscrições', icon: Users },
    { key: 'horarios' as Tab, label: 'Horários', icon: Clock },
    { key: 'pedidos' as Tab, label: 'Pedidos', icon: BookOpen },
    { key: 'gratidoes' as Tab, label: 'Testemunhos', icon: Sparkles },
  ];

  const filtered = inscricoes.filter((i) =>
    i.nome.toLowerCase().includes(search.toLowerCase()) ||
    i.telefone.includes(search)
  );

  return (
    <div className="min-h-screen">
      {/* Topbar */}
      <div className="sticky top-0 z-40 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black gradient-text">KERIGMA</span>
            <span className="text-white/30 text-sm hidden sm:inline">Painel Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchAll} disabled={loading}
              className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white">
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            </button>
            <button onClick={onLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl glass text-white/60 hover:text-white text-sm">
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pb-0 flex gap-0.5 overflow-x-auto">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium rounded-t-xl whitespace-nowrap transition-all ${
                tab === key
                  ? 'bg-kerigma-blue/20 text-kerigma-light border-t border-x border-kerigma-blue/30'
                  : 'text-white/40 hover:text-white/70'
              }`}>
              <Icon size={13} />{label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ── Overview ── */}
        {tab === 'overview' && stats && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Visão Geral</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Pessoas Orando', value: stats.total_participantes, color: '#0057FF', icon: Users },
                { label: 'Horários Cobertos', value: stats.horarios_cobertos, color: '#34C759', icon: CheckCircle2 },
                { label: 'Disponíveis', value: stats.horarios_disponiveis, color: '#FF6A00', icon: Clock },
                { label: 'Cobertura', value: `${stats.percentual_cobertura}%`, color: '#4DA6FF', icon: Target },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.label} className="glass rounded-2xl p-5" style={{ border: `1px solid ${m.color}25` }}>
                    <Icon size={18} style={{ color: m.color }} className="mb-2" />
                    <div className="text-3xl font-black text-white">{m.value}</div>
                    <div className="text-sm mt-1" style={{ color: m.color }}>{m.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass rounded-2xl p-5">
                <h3 className="text-white/60 font-medium text-sm mb-3">Pedidos de Oração</h3>
                <div className="text-3xl font-black text-kerigma-light mb-1">{pedidos.length}</div>
                <div className="text-white/40 text-sm">pedidos recebidos</div>
              </div>
              <div className="glass rounded-2xl p-5">
                <h3 className="text-white/60 font-medium text-sm mb-3">Testemunhos de Gratidão</h3>
                <div className="text-3xl font-black text-kerigma-orange mb-1">{gratidoes.length}</div>
                <div className="text-white/40 text-sm">respostas compartilhadas</div>
              </div>
            </div>

            {/* ── Modo de exibição do Relógio ── */}
            <div className="glass rounded-2xl p-6" style={{ border: '1px solid rgba(0,87,255,0.2)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl glass-blue flex items-center justify-center">
                  <CircleDot size={16} className="text-kerigma-light" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Modo de Exibição do Relógio</h3>
                  <p className="text-white/40 text-xs">Escolha como os membros veem e selecionam os horários</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {([
                  {
                    key: 'clock' as ModoRelogio,
                    icon: CircleDot,
                    title: 'Relógio Circular',
                    desc: 'Visualização em formato de relógio SVG 24h com arcos coloridos',
                  },
                  {
                    key: 'grid' as ModoRelogio,
                    icon: LayoutGrid,
                    title: 'Grade de Horários',
                    desc: 'Cards organizados por período: Madrugada, Manhã, Tarde, Noite',
                  },
                ] as { key: ModoRelogio; icon: typeof CircleDot; title: string; desc: string }[]).map(({ key, icon: Icon, title, desc }) => {
                  const active = modo === key;
                  return (
                    <button
                      key={key}
                      onClick={() => !active && changeModo(key)}
                      disabled={savingModo || active}
                      className={`relative rounded-2xl p-4 text-left transition-all duration-200 border ${
                        active
                          ? 'bg-kerigma-blue/20 border-kerigma-blue/50'
                          : 'glass border-white/10 hover:border-kerigma-blue/30'
                      }`}
                    >
                      {active && (
                        <span className="absolute top-3 right-3 text-xs font-bold text-kerigma-light bg-kerigma-blue/30 px-2 py-0.5 rounded-full">
                          Ativo
                        </span>
                      )}
                      <Icon size={22} className={`mb-2 ${active ? 'text-kerigma-light' : 'text-white/40'}`} />
                      <div className={`font-bold text-sm mb-1 ${active ? 'text-white' : 'text-white/60'}`}>{title}</div>
                      <div className="text-xs text-white/30 leading-relaxed">{desc}</div>
                    </button>
                  );
                })}
              </div>
              {savingModo && (
                <p className="text-xs text-kerigma-light/60 mt-3 flex items-center gap-1">
                  <RefreshCw size={11} className="animate-spin" /> Salvando…
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* ── Inscrições ── */}
        {tab === 'inscricoes' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-2xl font-bold text-white">
                Inscrições <span className="text-white/30 font-normal text-lg">({filtered.length})</span>
              </h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar..." className="kerigma-input rounded-xl pl-8 pr-4 py-2 text-sm w-44" />
                  {search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40"><X size={12} /></button>}
                </div>
                <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-xl btn-blue text-sm font-medium">
                  <Download size={14} /> CSV
                </button>
              </div>
            </div>

            <div className="glass rounded-2xl overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10">
                    {['Nome', 'Telefone', 'Horário', 'Presencial', 'Áreas', 'Ações'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-white/30 text-xs font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((i) => (
                    <tr key={i.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="px-4 py-3 text-white font-medium">{i.nome}</td>
                      <td className="px-4 py-3 text-white/50 font-mono text-xs">{i.telefone}</td>
                      <td className="px-4 py-3">
                        <span className="font-mono font-bold text-kerigma-light">{i.horario?.hora ?? '-'}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${i.presencial ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'}`}>
                          {i.presencial ? 'Sim' : 'Não'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/40 text-xs">{(i.areas_interesse ?? []).join(', ') || '-'}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => {
                            const msg = generateWhatsAppMessage(i.nome, i.horario?.hora ?? '', '30/08/2026');
                            sendWhatsApp(i.telefone, msg);
                          }} className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 hover:bg-green-500/30">
                            <MessageSquare size={12} />
                          </button>
                          <button onClick={() => deleteInscricao(i.id)}
                            className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-500/30">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={6} className="px-4 py-10 text-center text-white/30">Nenhuma inscrição.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* ── Horários ── */}
        {tab === 'horarios' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Horários</h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {horarios.map((slot) => (
                <div key={slot.id} className="rounded-xl p-2 text-center"
                  style={{
                    background: slot.status === 'coberto' ? 'rgba(0,87,255,0.18)' : slot.status === 'urgente' ? 'rgba(255,59,48,0.18)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${slot.status === 'coberto' ? 'rgba(0,87,255,0.35)' : slot.status === 'urgente' ? 'rgba(255,59,48,0.35)' : 'rgba(255,255,255,0.08)'}`,
                  }}
                >
                  <div className="font-mono font-bold text-white text-xs">{slot.hora}</div>
                  <div className="text-xs mt-0.5" style={{ color: slot.status === 'coberto' ? '#4DA6FF' : slot.status === 'urgente' ? '#FF6B6B' : 'rgba(255,255,255,0.2)' }}>
                    {slot.status === 'coberto' ? '✓' : slot.status === 'urgente' ? '🔥' : '○'}
                  </div>
                  {slot.status !== 'coberto' && (
                    <button onClick={() => toggleUrgente(slot.id, slot.status)}
                      className="text-xs text-white/20 hover:text-yellow-400 mt-0.5 transition-colors">
                      {slot.status === 'urgente' ? '↩' : '⚠'}
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-4 text-sm text-white/50">
              <span>✓ Coberto: {horarios.filter((h) => h.status === 'coberto').length}</span>
              <span>🔥 Urgente: {horarios.filter((h) => h.status === 'urgente').length}</span>
              <span>○ Disponível: {horarios.filter((h) => h.status === 'disponivel').length}</span>
            </div>
          </motion.div>
        )}

        {/* ── Pedidos de Oração ── */}
        {tab === 'pedidos' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Pedidos de Oração <span className="text-white/30 font-normal text-lg">({pedidos.length})</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {pedidos.map((p) => {
                const cat = CATEGORIAS_ORACAO[p.categoria];
                return (
                  <div key={p.id} className="glass rounded-2xl p-4 relative" style={{ border: `1px solid ${cat.color}20` }}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{cat.icon}</span>
                        <span className="text-xs font-bold" style={{ color: cat.color }}>{cat.label}</span>
                      </div>
                      <button onClick={() => deletePedido(p.id)}
                        className="w-7 h-7 rounded-lg bg-red-500/15 border border-red-500/25 flex items-center justify-center text-red-400 hover:bg-red-500/25 flex-shrink-0">
                        <Trash2 size={11} />
                      </button>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed mb-2">{p.descricao}</p>
                    <p className="text-white/30 text-xs">{p.nome}</p>
                  </div>
                );
              })}
              {pedidos.length === 0 && (
                <div className="col-span-3 glass rounded-2xl p-10 text-center text-white/40">Nenhum pedido recebido.</div>
              )}
            </div>
          </motion.div>
        )}

        {/* ── Testemunhos ── */}
        {tab === 'gratidoes' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Testemunhos de Gratidão <span className="text-white/30 font-normal text-lg">({gratidoes.length})</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {gratidoes.map((g) => (
                <div key={g.id} className="glass rounded-2xl p-4 relative"
                  style={{ background: 'rgba(255,106,0,0.07)', border: '1px solid rgba(255,106,0,0.18)' }}>
                  <button onClick={() => deleteGratidao(g.id)}
                    className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-red-500/15 border border-red-500/25 flex items-center justify-center text-red-400 hover:bg-red-500/25">
                    <Trash2 size={11} />
                  </button>
                  <div className="text-xl mb-2">✨</div>
                  <p className="text-white/75 text-sm italic leading-relaxed mb-2">&ldquo;{g.texto}&rdquo;</p>
                  <p className="text-white/30 text-xs">{g.nome}</p>
                </div>
              ))}
              {gratidoes.length === 0 && (
                <div className="col-span-3 glass rounded-2xl p-10 text-center text-white/40">Nenhum testemunho recebido.</div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('kerigma_admin') === '1') setAuthenticated(true);
  }, []);

  return (
    <main className="relative min-h-screen">
      <Background />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!authenticated ? (
            <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoginScreen onLogin={() => setAuthenticated(true)} />
            </motion.div>
          ) : (
            <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AdminDashboard onLogout={() => { sessionStorage.removeItem('kerigma_admin'); setAuthenticated(false); }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
