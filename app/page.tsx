'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import Background from '@/components/Background';
import Header from '@/components/Header';
import HeroCallToAction from '@/components/HeroCallToAction';
import HeroSection from '@/components/HeroSection';
import RegistrationModal from '@/components/RegistrationModal';
import UrgencyPanel from '@/components/UrgencyPanel';
import IntercessorWall from '@/components/IntercessorWall';
import KerigmaSection from '@/components/KerigmaSection';
import ImpactMap from '@/components/ImpactMap';
import PrayerRequestsSection from '@/components/PrayerRequestsSection';
import GratitudeWall from '@/components/GratitudeWall';
import type { HorarioSlot, Inscricao, Stats, PedidoOracao, Gratidao } from '@/types';
import { HORAS_DO_DIA } from '@/lib/utils';

/* SSR desabilitado para componentes com SVG de ponto-flutuante ou canvas */
const PrayerClock = dynamic(() => import('@/components/PrayerClock'), { ssr: false });
const CoverageChart = dynamic(() => import('@/components/CoverageChart'), { ssr: false });

const INITIAL_STATS: Stats = {
  total_participantes: 0,
  horarios_cobertos: 0,
  horarios_disponiveis: 48,
  percentual_cobertura: 0,
  total_horarios: 48,
};

function buildDemoSlots(): HorarioSlot[] {
  const slots = HORAS_DO_DIA.map((hora, i) => ({
    id: `slot-${i}`,
    hora,
    status: 'disponivel' as const,
    inscricoes: [],
    inscricoes_count: 0,
  }));
  const covered = [0, 1, 2, 6, 7, 8, 12, 13, 18, 19, 24, 25, 30, 36, 42];
  const urgent = [3, 9, 27];
  covered.forEach((i) => { if (slots[i]) (slots[i] as HorarioSlot).status = 'coberto'; });
  urgent.forEach((i) => { if (slots[i]) (slots[i] as HorarioSlot).status = 'urgente'; });
  return slots;
}

const DEMO_INSCRITOS: Inscricao[] = [
  { id: 'a1', nome: 'Carlos Henrique', telefone: '', horario_id: 'slot-0', horario: { id: 'slot-0', hora: '00:00', status: 'coberto' }, presencial: true, areas_interesse: ['oracao'], created_at: '' },
  { id: 'a2', nome: 'Bruna Santos', telefone: '', horario_id: 'slot-1', horario: { id: 'slot-1', hora: '00:30', status: 'coberto' }, presencial: false, areas_interesse: ['discipulado'], created_at: '' },
  { id: 'a3', nome: 'João Pedro', telefone: '', horario_id: 'slot-2', horario: { id: 'slot-2', hora: '01:00', status: 'coberto' }, presencial: true, areas_interesse: ['evangelismo'], created_at: '' },
  { id: 'a4', nome: 'Vivian Alves', telefone: '', horario_id: 'slot-6', horario: { id: 'slot-6', hora: '03:00', status: 'coberto' }, presencial: false, areas_interesse: ['visitacao'], created_at: '' },
  { id: 'a5', nome: 'Marcos Lima', telefone: '', horario_id: 'slot-7', horario: { id: 'slot-7', hora: '03:30', status: 'coberto' }, presencial: true, areas_interesse: ['oracao'], created_at: '' },
  { id: 'a6', nome: 'Ana Clara', telefone: '', horario_id: 'slot-8', horario: { id: 'slot-8', hora: '04:00', status: 'coberto' }, presencial: false, areas_interesse: ['discipulado'], created_at: '' },
  { id: 'a7', nome: 'Renata Pereira', telefone: '', horario_id: 'slot-12', horario: { id: 'slot-12', hora: '06:00', status: 'coberto' }, presencial: true, areas_interesse: ['oracao'], created_at: '' },
  { id: 'a8', nome: 'Felipe Costa', telefone: '', horario_id: 'slot-13', horario: { id: 'slot-13', hora: '06:30', status: 'coberto' }, presencial: true, areas_interesse: ['evangelismo'], created_at: '' },
];

export default function HomePage() {
  const [slots, setSlots] = useState<HorarioSlot[]>(buildDemoSlots);
  const [inscricoes, setInscricoes] = useState<Inscricao[]>(DEMO_INSCRITOS);
  const [stats, setStats] = useState<Stats>({ ...INITIAL_STATS, horarios_cobertos: 15, horarios_disponiveis: 33, percentual_cobertura: 31, total_participantes: 8 });
  const [pedidos, setPedidos] = useState<PedidoOracao[]>([]);
  const [gratidoes, setGratidoes] = useState<Gratidao[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<HorarioSlot | null>(null);
  const clockRef = useRef<HTMLElement | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [horariosRes, statsRes, inscricoesRes, pedidosRes, gratidoesRes] = await Promise.allSettled([
        fetch('/api/horarios').then((r) => r.json()),
        fetch('/api/stats').then((r) => r.json()),
        fetch('/api/inscricoes').then((r) => r.json()),
        fetch('/api/pedidos').then((r) => r.json()),
        fetch('/api/gratidoes').then((r) => r.json()),
      ]);

      if (horariosRes.status === 'fulfilled' && Array.isArray(horariosRes.value) && horariosRes.value.length > 0) {
        setSlots(horariosRes.value);
      }
      if (statsRes.status === 'fulfilled' && statsRes.value?.stats) {
        setStats(statsRes.value.stats);
      }
      if (inscricoesRes.status === 'fulfilled' && Array.isArray(inscricoesRes.value) && inscricoesRes.value.length > 0) {
        setInscricoes(inscricoesRes.value);
      }
      if (pedidosRes.status === 'fulfilled' && Array.isArray(pedidosRes.value)) {
        setPedidos(pedidosRes.value);
      }
      if (gratidoesRes.status === 'fulfilled' && Array.isArray(gratidoesRes.value)) {
        setGratidoes(gratidoesRes.value);
      }
    } catch {
      // Keep demo data on API error
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const horariosCobertos = slots.filter((s) => s.status === 'coberto').length;
  const percentual = Math.round((horariosCobertos / Math.max(slots.length, 1)) * 100);

  function scrollToClock() {
    document.getElementById('relogio')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <main className="relative min-h-screen">
      <Background />

      <div className="relative z-10">
        {/* Compact header with logo + progress */}
        <Header
          percentual={percentual}
          horariosCobertos={horariosCobertos}
          totalHorarios={slots.length}
        />

        {/* Hero CTA */}
        <HeroCallToAction
          onAssumirHorario={scrollToClock}
          percentual={percentual}
          totalInscritos={stats.total_participantes}
        />

        {/* Stats cards */}
        <HeroSection
          stats={{ ...stats, horarios_cobertos: horariosCobertos, percentual_cobertura: percentual }}
        />

        {/* Urgency panel */}
        <UrgencyPanel slots={slots} onSelectSlot={setSelectedSlot} />

        {/* The clock — main feature */}
        <section id="relogio" ref={clockRef}>
          <PrayerClock slots={slots} onSelectSlot={setSelectedSlot} />
        </section>

        {/* Intercessor Wall — people praying */}
        <IntercessorWall inscricoes={inscricoes} />

        {/* Prayer Requests */}
        <PrayerRequestsSection pedidos={pedidos} onRefresh={fetchData} />

        {/* Gratitude Wall */}
        <GratitudeWall gratidoes={gratidoes} onRefresh={fetchData} />

        {/* Coverage Charts */}
        <CoverageChart slots={slots} />

        {/* Kerigma Section */}
        <KerigmaSection />

        {/* Impact */}
        <ImpactMap stats={{
          total_participantes: stats.total_participantes,
          horarios_cobertos: horariosCobertos,
          horarios_disponiveis: slots.length - horariosCobertos,
          percentual_cobertura: percentual,
          total_horarios: slots.length,
        }} />

        {/* Footer */}
        <footer className="py-14 px-6 text-center border-t border-white/5">
          <div className="max-w-xl mx-auto">
            {/* Fish SVG */}
            <svg className="mx-auto mb-4 opacity-20" width="40" height="20" viewBox="0 0 40 20">
              <path d="M2 10 C6 4, 12 2, 18 4 C24 6, 28 10, 28 10 C28 10, 24 14, 18 16 C12 18, 6 16, 2 10 Z" fill="#0057FF" />
              <path d="M26 6 L33 2 M26 14 L33 18 M28 10 L35 10" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" />
            </svg>

            <p className="text-xl font-black gradient-text mb-1">KERIGMA 24H</p>
            <p className="text-white/30 text-sm mb-4">Relógio de Oração — 24 horas de intercessão contínua</p>
            <p className="text-white/20 text-xs">
              Assembleia de Deus Jardim Del Rey · São José dos Pinhais, PR
            </p>
            <p className="text-white/15 text-xs mt-2 italic">
              &ldquo;Anunciar. Amar. Acolher. Cuidar.&rdquo;
            </p>
          </div>
        </footer>
      </div>

      {/* Registration Modal — no congregation field */}
      <RegistrationModal
        slot={selectedSlot}
        onClose={() => setSelectedSlot(null)}
        onSuccess={fetchData}
      />
    </main>
  );
}
