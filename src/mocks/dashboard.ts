import type { DashboardData } from "../domain/Dashboard";

const DASHBOARD_DATA: DashboardData = {
  kpis: [
    { id: "obras-ativas", label: "Obras Ativas", valor: "12", delta: "+2 este mês" },
    { id: "custo-total", label: "Custo Total", valor: "R$8.2M", delta: "+12% vs. orçado" },
    { id: "etapas-concluidas", label: "Etapas Concluídas", valor: "47", delta: "+5 esta semana" },
    { id: "orcamento-livre", label: "Orçamento Livre", valor: "R$3.1M", delta: "-8% vs. planejado" },
    { id: "equipes-campo", label: "Equipes em Campo", valor: "86", delta: "+10 vs. semana ant." },
    { id: "progresso-geral", label: "Progresso Geral", valor: "72%", delta: "+4% esta semana" },
  ],
  evolucaoCusto: [
    { mes: "Jan", mesAnterior: 150, mesAtual: 360 },
    { mes: "Fev", mesAnterior: 210, mesAtual: 295 },
    { mes: "Mar", mesAnterior: 190, mesAtual: 330 },
    { mes: "Abr", mesAnterior: 80, mesAtual: 260 },
    { mes: "Mai", mesAnterior: 85, mesAtual: 260 },
    { mes: "Jun", mesAnterior: 120, mesAtual: 340 },
    { mes: "Jul", mesAnterior: 130, mesAtual: 290 },
    { mes: "Ago", mesAnterior: 120, mesAtual: 270 },
    { mes: "Set", mesAnterior: 115, mesAtual: 200 },
    { mes: "Out", mesAnterior: 115, mesAtual: 390 },
    { mes: "Nov", mesAnterior: 200, mesAtual: 205 },
    { mes: "Dez", mesAnterior: 205, mesAtual: 390 },
  ],
  avancoPorObra: [
    { nomeObra: "Res. Aurora", previsto: 12000, realizado: 10500 },
    { nomeObra: "Ed. Central", previsto: 16000, realizado: 10000 },
    { nomeObra: "Cond. Parque", previsto: 5500, realizado: 21000 },
    { nomeObra: "Torre Norte", previsto: 15000, realizado: 5500 },
    { nomeObra: "Vila Verde", previsto: 11000, realizado: 10500 },
    { nomeObra: "Lot. Sol", previsto: 16000, realizado: 10000 },
    { nomeObra: "Pq. Industrial", previsto: 20000, realizado: 9500 },
  ],
  indicadoresObra: [
    { mes: "Jan", acabamento: 320, estrutura: 280, fundacao: 310 },
    { mes: "Fev", acabamento: 310, estrutura: 295, fundacao: 330 },
    { mes: "Mar", acabamento: 260, estrutura: 310, fundacao: 350 },
    { mes: "Abr", acabamento: 220, estrutura: 340, fundacao: 360 },
    { mes: "Mai", acabamento: 200, estrutura: 350, fundacao: 340 },
    { mes: "Jun", acabamento: 240, estrutura: 330, fundacao: 310 },
    { mes: "Jul", acabamento: 300, estrutura: 300, fundacao: 270 },
    { mes: "Ago", acabamento: 340, estrutura: 260, fundacao: 230 },
    { mes: "Set", acabamento: 310, estrutura: 220, fundacao: 200 },
    { mes: "Out", acabamento: 260, estrutura: 210, fundacao: 210 },
    { mes: "Nov", acabamento: 220, estrutura: 230, fundacao: 240 },
    { mes: "Dez", acabamento: 200, estrutura: 260, fundacao: 260 },
  ],
  materiaisCriticos: [
    { rank: 1, nome: "Cimento CP-II", estoquePercent: 82, usoPercent: 82 },
    { rank: 2, nome: "Aço CA-50 (vergalhão)", estoquePercent: 64, usoPercent: 64 },
    { rank: 3, nome: "Concreto Usinado", estoquePercent: 41, usoPercent: 41 },
    { rank: 4, nome: "Blocos Cerâmicos", estoquePercent: 73, usoPercent: 73 },
  ],
};

export function fetchDashboardData(): Promise<DashboardData> {
  return Promise.resolve(DASHBOARD_DATA);
}
