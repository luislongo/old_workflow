export interface Obra {
  id: string;
  nome: string;
  tipo: 'Residencial' | 'Comercial' | 'Loteamento' | 'Industrial' | 'Institucional';
  percentualConcluido: number;
  orcamento: number;
  status: 'Em andamento' | 'Concluída' | 'Atrasada' | 'Não iniciada';
  dataInicio: Date;
}

export interface LancamentoFinanceiro {
  id: string;
  descricao: string;
  tipo: 'Receita' | 'Despesa';
  data: Date;
  valor: number;
  metodo: 'Transferência' | 'Boleto' | 'PIX' | 'Débito Automático' | 'Cartão';
  status: 'Confirmado' | 'Pago' | 'Pendente' | 'Vencido';
}

export interface RelatoriosData {
  obras: Obra[];
  lancamentos: LancamentoFinanceiro[];
}
