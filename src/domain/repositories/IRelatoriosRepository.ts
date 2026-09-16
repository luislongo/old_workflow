import type { RelatoriosData } from '../../types/relatorios';

export interface IRelatoriosRepository {
  getRelatoriosData(): Promise<RelatoriosData>;
}
