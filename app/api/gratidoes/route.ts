import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export async function GET() {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from('gratidoes')
    .select('*')
    .eq('aprovado', true)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const supabase = getServiceClient();
  const body = await req.json();
  const { nome, texto } = body;

  if (!nome || !texto) return NextResponse.json({ error: 'Campos obrigatórios' }, { status: 400 });

  const { data, error } = await supabase
    .from('gratidoes')
    .insert({ nome, texto, aprovado: true })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const supabase = getServiceClient();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 });

  const { error } = await supabase.from('gratidoes').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
