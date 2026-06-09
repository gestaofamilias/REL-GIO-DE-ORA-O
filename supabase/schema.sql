-- ============================================================
-- KERIGMA 24H — Schema v2 (Foco no intercessor individual)
-- ============================================================
create extension if not exists "uuid-ossp";

-- ============================================================
-- EVENTOS
-- ============================================================
create table if not exists eventos (
  id uuid primary key default uuid_generate_v4(),
  nome text not null,
  data date not null,
  descricao text,
  ativo boolean default true,
  created_at timestamptz default now()
);

insert into eventos (nome, data, descricao, ativo) values
  ('Noite do Reencontro 2026', '2026-08-30', 'Vigília de oração — KERIGMA 24H', true)
on conflict do nothing;

-- ============================================================
-- HORÁRIOS (48 slots de 30 min)
-- ============================================================
create table if not exists horarios (
  id uuid primary key default uuid_generate_v4(),
  hora text not null unique,
  status text not null default 'disponivel'
    check (status in ('disponivel', 'coberto', 'urgente')),
  evento_id uuid references eventos(id) on delete set null,
  created_at timestamptz default now()
);

do $$
declare h int; m int; hora_str text; eid uuid;
begin
  select id into eid from eventos where ativo = true limit 1;
  for h in 0..23 loop
    for m in 0..1 loop
      hora_str := lpad(h::text,2,'0') || ':' || case when m=0 then '00' else '30' end;
      insert into horarios (hora, status, evento_id) values (hora_str, 'disponivel', eid)
      on conflict (hora) do nothing;
    end loop;
  end loop;
end $$;

-- ============================================================
-- INSCRIÇÕES (sem congregacao_id)
-- ============================================================
create table if not exists inscricoes (
  id uuid primary key default uuid_generate_v4(),
  nome text not null,
  telefone text not null,
  horario_id uuid not null references horarios(id) on delete restrict,
  pedido_oracao text,
  presencial boolean default false,
  areas_interesse text[] default '{}',
  badge text check (badge in ('pescador_iniciante','intercessor_fiel','lancador_redes','evangelista','discipulador')),
  created_at timestamptz default now()
);

-- ============================================================
-- PEDIDOS DE ORAÇÃO
-- ============================================================
create table if not exists pedidos_oracao (
  id uuid primary key default uuid_generate_v4(),
  nome text not null,
  categoria text not null
    check (categoria in ('familia','saude','vida_espiritual','trabalho','evangelismo','outros')),
  descricao text not null,
  aprovado boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
-- MURAL DE GRATIDÃO
-- ============================================================
create table if not exists gratidoes (
  id uuid primary key default uuid_generate_v4(),
  nome text not null,
  texto text not null,
  aprovado boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
-- RLS POLICIES
-- ============================================================
alter table horarios enable row level security;
alter table inscricoes enable row level security;
alter table eventos enable row level security;
alter table pedidos_oracao enable row level security;
alter table gratidoes enable row level security;

create policy "public_read_horarios"   on horarios      for select using (true);
create policy "public_read_eventos"    on eventos       for select using (true);
create policy "public_read_inscricoes" on inscricoes    for select using (true);
create policy "public_insert_inscricoes" on inscricoes  for insert with check (true);
create policy "public_insert_pedidos"  on pedidos_oracao for insert with check (true);
create policy "public_read_pedidos"    on pedidos_oracao for select using (aprovado = true);
create policy "public_insert_gratidoes" on gratidoes    for insert with check (true);
create policy "public_read_gratidoes"  on gratidoes     for select using (aprovado = true);

-- ============================================================
-- TRIGGER: auto-update horario status
-- ============================================================
create or replace function update_horario_status()
returns trigger as $$
begin
  if TG_OP = 'INSERT' then
    update horarios set status = 'coberto' where id = NEW.horario_id;
  elsif TG_OP = 'DELETE' then
    if not exists (select 1 from inscricoes where horario_id = OLD.horario_id) then
      update horarios set status = 'disponivel' where id = OLD.horario_id;
    end if;
  end if;
  return null;
end;
$$ language plpgsql;

create or replace trigger trg_update_horario
after insert or delete on inscricoes
for each row execute function update_horario_status();

-- ============================================================
-- CONFIGURACOES (modo_relogio, etc.)
-- ============================================================
create table if not exists configuracoes (
  chave text primary key,
  valor text not null,
  updated_at timestamptz default now()
);

insert into configuracoes (chave, valor) values ('modo_relogio', 'clock')
on conflict do nothing;

alter table configuracoes enable row level security;
-- Somente service_role pode ler/escrever configurações
create policy "service_only_configuracoes" on configuracoes
  using (false);

-- ============================================================
-- INDEXES
-- ============================================================
create index if not exists idx_inscricoes_horario  on inscricoes(horario_id);
create index if not exists idx_inscricoes_telefone on inscricoes(telefone);
create index if not exists idx_horarios_status     on horarios(status);
create index if not exists idx_pedidos_aprovado    on pedidos_oracao(aprovado);
create index if not exists idx_gratidoes_aprovado  on gratidoes(aprovado);
