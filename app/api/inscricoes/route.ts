import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const supabase = getServiceClient();
  const { searchParams } = new URL(req.url);
  const horarioId = searchParams.get('horario_id');

  let query = supabase
    .from('inscricoes')
    .select(`*, horario:horarios(id, hora, status)`)
    .order('created_at', { ascending: false });

  if (horarioId) query = query.eq('horario_id', horarioId);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const supabase = getServiceClient();
  const body = await req.json();
  const { nome, telefone, horario_id, pedido_oracao, presencial, areas_interesse } = body;

  if (!nome || !telefone || !horario_id) {
    return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
  }

  const { data: horario } = await supabase.from('horarios').select('status').eq('id', horario_id).single();
  if (horario?.status === 'coberto') {
    return NextResponse.json({ error: 'Este horário já está coberto' }, { status: 409 });
  }

  const { count } = await supabase
    .from('inscricoes')
    .select('id', { count: 'exact', head: true })
    .eq('telefone', telefone);

  let badge: string | null = null;
  if ((count ?? 0) === 0) badge = 'pescador_iniciante';
  else if ((count ?? 0) >= 2) badge = 'intercessor_fiel';

  const { data: inscricao, error } = await supabase
    .from('inscricoes')
    .insert({
      nome,
      telefone,
      horario_id,
      pedido_oracao: pedido_oracao || null,
      presencial: presencial ?? false,
      areas_interesse: areas_interesse ?? [],
      badge,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from('horarios').update({ status: 'coberto' }).eq('id', horario_id);

  return NextResponse.json({ inscricao, badge }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const supabase = getServiceClient();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 });

  const { data: inscricao } = await supabase.from('inscricoes').select('horario_id').eq('id', id).single();
  const { error } = await supabase.from('inscricoes').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (inscricao?.horario_id) {
    const { count } = await supabase
      .from('inscricoes')
      .select('id', { count: 'exact', head: true })
      .eq('horario_id', inscricao.horario_id);
    if ((count ?? 0) === 0) {
      await supabase.from('horarios').update({ status: 'disponivel' }).eq('id', inscricao.horario_id);
    }
  }

  return NextResponse.json({ success: true });
}
