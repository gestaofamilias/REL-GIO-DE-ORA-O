export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      congregacoes: {
        Row: {
          id: string;
          nome: string;
          cidade: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          nome: string;
          cidade?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          cidade?: string | null;
        };
      };
      horarios: {
        Row: {
          id: string;
          hora: string;
          status: 'disponivel' | 'coberto' | 'urgente';
          evento_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          hora: string;
          status?: 'disponivel' | 'coberto' | 'urgente';
          evento_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          hora?: string;
          status?: 'disponivel' | 'coberto' | 'urgente';
          evento_id?: string | null;
        };
      };
      inscricoes: {
        Row: {
          id: string;
          nome: string;
          telefone: string;
          congregacao_id: string;
          horario_id: string;
          pedido_oracao: string | null;
          kerigma_membro: boolean;
          treinamento: boolean;
          visitas: boolean;
          badge: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          nome: string;
          telefone: string;
          congregacao_id: string;
          horario_id: string;
          pedido_oracao?: string | null;
          kerigma_membro?: boolean;
          treinamento?: boolean;
          visitas?: boolean;
          badge?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          telefone?: string;
          congregacao_id?: string;
          horario_id?: string;
          pedido_oracao?: string | null;
          kerigma_membro?: boolean;
          treinamento?: boolean;
          visitas?: boolean;
          badge?: string | null;
        };
      };
      eventos: {
        Row: {
          id: string;
          nome: string;
          data: string;
          descricao: string | null;
          ativo: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          nome: string;
          data: string;
          descricao?: string | null;
          ativo?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          data?: string;
          descricao?: string | null;
          ativo?: boolean;
        };
      };
    };
  };
}
