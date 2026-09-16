import type { IRelatoriosRepository } from '../../domain/repositories/IRelatoriosRepository';
import type { RelatoriosData } from '../../types/relatorios';

export class GetRelatoriosData {
  private readonly repository: IRelatoriosRepository;

  constructor(repository: IRelatoriosRepository) {
    this.repository = repository;
  }

  execute(): Promise<RelatoriosData> {
    return this.repository.getRelatoriosData();
  }
}
