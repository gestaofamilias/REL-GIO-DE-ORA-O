import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export type ModoRelogio = 'clock' | 'grid';

// In-memory fallback when Supabase is unavailable
let memoryConfig: { modo_relogio: ModoRelogio } = { modo_relogio: 'clock' };

export async function GET() {
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('configuracoes')
      .select('valor')
      .eq('chave', 'modo_relogio')
      .single();

    if (!error && data) {
      return NextResponse.json({ modo_relogio: data.valor as ModoRelogio });
    }
  } catch {
    // Supabase unavailable — use memory
  }
  return NextResponse.json(memoryConfig);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const modo = body.modo_relogio as ModoRelogio;

  if (modo !== 'clock' && modo !== 'grid') {
    return NextResponse.json({ error: 'Modo inválido' }, { status: 400 });
  }

  memoryConfig.modo_relogio = modo;

  try {
    const supabase = getServiceClient();
    await supabase
      .from('configuracoes')
      .upsert({ chave: 'modo_relogio', valor: modo }, { onConflict: 'chave' });
  } catch {
    // Persist only in memory if Supabase unavailable
  }

  return NextResponse.json({ modo_relogio: modo });
}
