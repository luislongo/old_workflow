import { faker } from '@faker-js/faker/locale/pt_BR';
import type { LancamentoFinanceiro, Obra, RelatoriosData } from '../types/relatorios';

const mockObra = (): Obra => ({
  id: faker.string.uuid(),
  nome: faker.company.name(),
  tipo: faker.helpers.arrayElement(['Residencial', 'Comercial', 'Loteamento', 'Industrial', 'Institucional']),
  percentualConcluido: faker.number.int({ min: 0, max: 100 }),
  orcamento: faker.number.int({ min: 500_000, max: 25_000_000 }),
  status: faker.helpers.arrayElement(['Em andamento', 'Concluída', 'Atrasada', 'Não iniciada']),
  dataInicio: faker.date.between({ from: '2024-01-01', to: '2026-01-01' }),
});

const mockLancamento = (): LancamentoFinanceiro => ({
  id: faker.string.uuid(),
  descricao: faker.finance.transactionDescription(),
  tipo: faker.helpers.arrayElement(['Receita', 'Despesa']),
  data: faker.date.between({ from: '2026-01-01', to: '2026-12-31' }),
  valor: faker.number.int({ min: 5_000, max: 700_000 }),
  metodo: faker.helpers.arrayElement(['Transferência', 'Boleto', 'PIX', 'Débito Automático', 'Cartão']),
  status: faker.helpers.arrayElement(['Confirmado', 'Pago', 'Pendente', 'Vencido']),
});

const mockObras: Obra[] = Array.from({ length: 10 }, mockObra);
const mockLancamentos: LancamentoFinanceiro[] = Array.from({ length: 10 }, mockLancamento);

export function fetchRelatoriosData(): Promise<RelatoriosData> {
  return Promise.resolve({ obras: mockObras, lancamentos: mockLancamentos });
}
