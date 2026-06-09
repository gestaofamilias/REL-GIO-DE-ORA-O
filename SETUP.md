# KERIGMA 24H — Guia de Instalação

## 1. Pré-requisitos
- Node.js 20+
- npm ou yarn
- Conta no Supabase (gratuita)

## 2. Instalar dependências
```bash
npm install
```

## 3. Configurar Supabase
1. Acesse https://supabase.com e crie um projeto
2. Vá em **SQL Editor** e execute o conteúdo de `supabase/schema.sql`
3. Copie `.env.local.example` para `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
4. Preencha as variáveis:
   - `NEXT_PUBLIC_SUPABASE_URL` → URL do seu projeto Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Chave anon/pública
   - `SUPABASE_SERVICE_ROLE_KEY` → Chave service_role (Settings > API)

## 4. Rodar em desenvolvimento
```bash
npm run dev
```
Acesse: http://localhost:3000

## 5. Painel Administrativo
Acesse: http://localhost:3000/admin
Senha padrão: `kerigma2026`

Para alterar, defina `NEXT_PUBLIC_ADMIN_PASSWORD` no `.env.local`.

## 6. Deploy (Vercel)
```bash
npm run build
vercel --prod
```
Ou conecte o repositório diretamente na Vercel e configure as variáveis de ambiente.

## Estrutura de Pastas
```
app/                  → Páginas Next.js (App Router)
  page.tsx            → Página principal (relógio de oração)
  admin/page.tsx      → Painel administrativo
  api/                → API Routes
    inscricoes/       → CRUD de inscrições
    horarios/         → Horários e status
    stats/            → Estatísticas gerais
    congregacoes/     → CRUD de congregações
components/           → Componentes React
  Background.tsx      → Fundo animado com partículas
  Header.tsx          → Cabeçalho com barra de progresso
  HeroSection.tsx     → Cards de estatísticas animados
  PrayerClock.tsx     → Relógio circular SVG (feature principal)
  RegistrationModal.tsx → Modal de inscrição
  UrgencyPanel.tsx    → Painel de horários urgentes
  CoverageChart.tsx   → Gráficos de cobertura (Chart.js)
  IntercessorWall.tsx → Mural de intercessores
  CongregationRanking.tsx → Ranking de congregações
  KerigmaSection.tsx  → Seção sobre o Projeto Kerigma
  ImpactMap.tsx       → Mapa de impacto animado
  Gamification.tsx    → Sistema de badges/conquistas
lib/
  supabase.ts         → Cliente Supabase
  utils.ts            → Utilitários (SVG, WhatsApp, etc.)
  database.types.ts   → Tipos TypeScript do banco
types/index.ts        → Tipos globais da aplicação
supabase/schema.sql   → Schema completo do banco de dados
```

## Identidade Visual
- Azul Kerigma: `#0057FF`
- Laranja Kerigma: `#FF6A00`
- Azul Profundo: `#003083`
- Azul Claro: `#4DA6FF`
- Fundo escuro: `#000D2E`
