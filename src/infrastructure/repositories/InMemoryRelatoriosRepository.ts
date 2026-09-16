import type { IRelatoriosRepository } from '../../domain/repositories/IRelatoriosRepository';
import type { RelatoriosData } from '../../types/relatorios';
import { fetchRelatoriosData } from '../../mocks/relatorios';

export class InMemoryRelatoriosRepository implements IRelatoriosRepository {
  getRelatoriosData(): Promise<RelatoriosData> {
    return fetchRelatoriosData();
  }
}
