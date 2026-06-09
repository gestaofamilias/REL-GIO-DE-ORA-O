export type SlotStatus = 'disponivel' | 'coberto' | 'urgente' | 'selecionado';

export interface HorarioSlot {
  id: string;
  hora: string;
  status: SlotStatus;
  inscricoes?: Inscricao[];
  inscricoes_count?: number;
}

export interface Inscricao {
  id: string;
  nome: string;
  telefone: string;
  horario_id: string;
  horario?: HorarioSlot;
  pedido_oracao?: string;
  presencial: boolean;
  areas_interesse: string[];
  badge?: Badge;
  created_at: string;
}

export type Badge =
  | 'pescador_iniciante'
  | 'intercessor_fiel'
  | 'lancador_redes'
  | 'evangelista'
  | 'discipulador';

export const BADGE_CONFIG: Record<Badge, { label: string; emoji: string; desc: string }> = {
  pescador_iniciante: { label: 'Primeiro Passo', emoji: '🙏', desc: 'Assumiu seu primeiro horário' },
  intercessor_fiel: { label: 'Intercessor Fiel', emoji: '✨', desc: '3+ horários assumidos' },
  lancador_redes: { label: 'Lançador de Redes', emoji: '🌊', desc: 'Trouxe alguém para orar' },
  evangelista: { label: 'Evangelista', emoji: '✝️', desc: 'Participou do evangelismo' },
  discipulador: { label: 'Discipulador', emoji: '📖', desc: 'Concluiu o treinamento' },
};

export const AREAS_INTERESSE = [
  { value: 'oracao', label: 'Oração', icon: '🙏' },
  { value: 'evangelismo', label: 'Evangelismo', icon: '✝️' },
  { value: 'visitacao', label: 'Visitação', icon: '🏠' },
  { value: 'discipulado', label: 'Discipulado', icon: '📖' },
] as const;

export type AreaInteresse = (typeof AREAS_INTERESSE)[number]['value'];

export interface Stats {
  total_participantes: number;
  horarios_cobertos: number;
  horarios_disponiveis: number;
  percentual_cobertura: number;
  total_horarios: number;
}

export interface PedidoOracao {
  id: string;
  nome: string;
  categoria: CategoriaOracao;
  descricao: string;
  aprovado: boolean;
  created_at: string;
}

export type CategoriaOracao =
  | 'familia'
  | 'saude'
  | 'vida_espiritual'
  | 'trabalho'
  | 'evangelismo'
  | 'outros';

export const CATEGORIAS_ORACAO: Record<CategoriaOracao, { label: string; icon: string; color: string }> = {
  familia: { label: 'Família', icon: '👨‍👩‍👧', color: '#FF9F0A' },
  saude: { label: 'Saúde', icon: '💙', color: '#30D158' },
  vida_espiritual: { label: 'Vida Espiritual', icon: '✨', color: '#0057FF' },
  trabalho: { label: 'Trabalho', icon: '🤝', color: '#4DA6FF' },
  evangelismo: { label: 'Evangelismo', icon: '✝️', color: '#FF6A00' },
  outros: { label: 'Outros', icon: '🙏', color: '#BF5AF2' },
};

export interface Gratidao {
  id: string;
  nome: string;
  texto: string;
  aprovado: boolean;
  created_at: string;
}

export interface FormInscricao {
  nome: string;
  telefone: string;
  horario_id: string;
  pedido_oracao?: string;
  presencial: boolean;
  areas_interesse: string[];
}

export interface FormPedidoOracao {
  nome: string;
  categoria: CategoriaOracao;
  descricao: string;
}

export interface FormGratidao {
  nome: string;
  texto: string;
}
