export interface KpiIndicador {
  id: string;
  label: string;
  valor: string;
  delta: string;
}

export interface PontoEvolucaoCusto {
  mes: string;
  mesAnterior: number;
  mesAtual: number;
}

export interface PontoAvancoPorObra {
  nomeObra: string;
  previsto: number;
  realizado: number;
}

export interface PontoIndicadorObra {
  mes: string;
  acabamento: number;
  estrutura: number;
  fundacao: number;
}

export interface MaterialCritico {
  rank: number;
  nome: string;
  estoquePercent: number;
  usoPercent: number;
}

export interface DashboardData {
  kpis: KpiIndicador[];
  evolucaoCusto: PontoEvolucaoCusto[];
  avancoPorObra: PontoAvancoPorObra[];
  indicadoresObra: PontoIndicadorObra[];
  materiaisCriticos: MaterialCritico[];
}
