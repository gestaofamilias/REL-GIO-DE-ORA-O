import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export async function GET() {
  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from('horarios')
    .select(`
      *,
      inscricoes(
        id, nome, badge,
        congregacao:congregacoes(id, nome)
      )
    `)
    .order('hora', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data ?? []);
}

export async function PATCH(req: NextRequest) {
  const supabase = getServiceClient();
  const body = await req.json();
  const { id, status } = body;

  if (!id || !status) return NextResponse.json({ error: 'id e status obrigatórios' }, { status: 400 });

  const { data, error } = await supabase
    .from('horarios')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
