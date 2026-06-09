import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export async function GET() {
  const supabase = getServiceClient();

  const [inscricoesRes, horariosRes] = await Promise.all([
    supabase.from('inscricoes').select('id', { count: 'exact', head: true }),
    supabase.from('horarios').select('id, status'),
  ]);

  const totalParticipantes = inscricoesRes.count ?? 0;
  const horarios = horariosRes.data ?? [];
  const totalHorarios = horarios.length;
  const horariosCobertos = horarios.filter((h: { status: string }) => h.status === 'coberto').length;
  const horariosDisponiveis = horarios.filter((h: { status: string }) => h.status !== 'coberto').length;
  const percentualCobertura = totalHorarios > 0 ? Math.round((horariosCobertos / totalHorarios) * 100) : 0;

  return NextResponse.json({
    stats: {
      total_participantes: totalParticipantes,
      horarios_cobertos: horariosCobertos,
      horarios_disponiveis: horariosDisponiveis,
      percentual_cobertura: percentualCobertura,
      total_horarios: totalHorarios,
    },
  });
}
