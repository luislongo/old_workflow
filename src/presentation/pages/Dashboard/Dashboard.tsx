import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  BarChart,
  LineChart,
  ContentGrid,
  ContentRow,
  GraphCard,
  InfoCard,
  ProgressBar,
  ProgressChip,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
  TableRowCell,
  IconApartment,
  IconAttachMoney,
  IconCheckCircle,
  IconTrendingUp,
  IconVisibility,
  IconSyncAlt,
  type InfoCardColor,
  type DataVizColor,
} from "@luislongo/ds-core";
import type { DashboardData } from "../../../domain/Dashboard";
import { useContainer } from "../../hooks/useContainer";

const KPI_META: Record<string, { color: InfoCardColor; icon: React.ReactNode }> = {
  "obras-ativas": { color: "red", icon: <IconApartment /> },
  "custo-total": { color: "cyan", icon: <IconAttachMoney /> },
  "etapas-concluidas": { color: "purple", icon: <IconCheckCircle /> },
  "orcamento-livre": { color: "amber", icon: <IconTrendingUp /> },
  "equipes-campo": { color: "lime", icon: <IconVisibility /> },
  "progresso-geral": { color: "slate", icon: <IconSyncAlt /> },
};

const DATAVIZ_COLORS: DataVizColor[] = ["blue", "green", "purple", "orange"];

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "empty" }
  | { status: "ready"; data: DashboardData };

export function Dashboard() {
  const { getDashboardData } = useContainer();
  const navigate = useNavigate();
  const [state, setState] = useState<State>({ status: "loading" });

  function load() {
    setState({ status: "loading" });
    getDashboardData
      .execute()
      .then((data) => {
        if (data.kpis.length === 0) {
          setState({ status: "empty" });
        } else {
          setState({ status: "ready", data });
        }
      })
      .catch(() => setState({ status: "error" }));
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="flex flex-col gap-800 w-full">
      <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>

      {state.status === "loading" && (
        <div className="flex flex-col gap-800">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-400">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 rounded-200 bg-neutral-100 animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-800">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-72 rounded-200 bg-neutral-100 animate-pulse" />
            ))}
          </div>
        </div>
      )}

      {state.status === "error" && (
        <div className="flex flex-col items-center gap-400 py-800">
          <p className="text-neutral-700">Não foi possível carregar o dashboard.</p>
          <button
            type="button"
            onClick={load}
            className="px-600 py-300 bg-primary-500 text-white rounded-100 text-sm font-medium hover:bg-primary-400 cursor-pointer"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {state.status === "empty" && (
        <div className="flex flex-col items-center gap-400 py-800">
          <h2 className="text-xl font-semibold text-neutral-900">Nenhuma obra cadastrada</h2>
          <p className="text-sm text-neutral-500 text-center max-w-sm">
            Cadastre seu primeiro empreendimento para começar a acompanhar os indicadores.
          </p>
          <button
            type="button"
            onClick={() => navigate("/empreendimento")}
            className="px-600 py-300 bg-primary-500 text-white rounded-100 text-sm font-medium hover:bg-primary-400 cursor-pointer"
          >
            Cadastrar empreendimento
          </button>
        </div>
      )}

      {state.status === "ready" && (
        <>
          <ContentRow>
            {state.data.kpis.map((kpi) => {
              const meta = KPI_META[kpi.id];
              return (
                <InfoCard
                  key={kpi.id}
                  color={meta?.color}
                  icon={meta?.icon}
                  mainValue={kpi.valor}
                  description={kpi.label}
                  subtitles={kpi.delta}
                />
              );
            })}
          </ContentRow>

          <ContentGrid>
            <GraphCard titulo="Evolução do Custo">
              {state.data.evolucaoCusto.length > 0 ? (
                <AreaChart
                  data={state.data.evolucaoCusto.map((p) => ({
                    name: p.mes,
                    mesAnterior: p.mesAnterior,
                    mesAtual: p.mesAtual,
                  }))}
                  series={[
                    { key: "mesAnterior", name: "Mês Anterior" },
                    { key: "mesAtual", name: "Mês Atual" },
                  ]}
                />
              ) : (
                <EmptyCard />
              )}
            </GraphCard>

            <GraphCard titulo="Avanço por Obra">
              {state.data.avancoPorObra.length > 0 ? (
                <BarChart
                  data={state.data.avancoPorObra.map((p) => ({
                    name: p.nomeObra,
                    previsto: p.previsto,
                    realizado: p.realizado,
                  }))}
                  series={[
                    { key: "previsto", name: "Previsto" },
                    { key: "realizado", name: "Realizado" },
                  ]}
                />
              ) : (
                <EmptyCard />
              )}
            </GraphCard>

            <GraphCard titulo="Indicadores de Obra">
              {state.data.indicadoresObra.length > 0 ? (
                <LineChart
                  data={state.data.indicadoresObra.map((p) => ({
                    name: p.mes,
                    acabamento: p.acabamento,
                    estrutura: p.estrutura,
                    fundacao: p.fundacao,
                  }))}
                  series={[
                    { key: "acabamento", name: "Acabamento" },
                    { key: "estrutura", name: "Estrutura" },
                    { key: "fundacao", name: "Fundação" },
                  ]}
                />
              ) : (
                <EmptyCard />
              )}
            </GraphCard>

            <GraphCard titulo="Materiais Críticos">
              {state.data.materiaisCriticos.length > 0 ? (
                <div className="flex flex-col">
                  <TableHeaderRow>
                    <TableHeaderCell>#</TableHeaderCell>
                    <TableHeaderCell>Material</TableHeaderCell>
                    <TableHeaderCell>Estoque</TableHeaderCell>
                    <TableHeaderCell>Uso</TableHeaderCell>
                  </TableHeaderRow>
                  {state.data.materiaisCriticos.map((m, i) => {
                    const color = DATAVIZ_COLORS[i % DATAVIZ_COLORS.length];
                    return (
                      <TableRow key={m.rank}>
                        <TableRowCell>
                          {String(m.rank).padStart(2, "0")}
                        </TableRowCell>
                        <TableRowCell>{m.nome}</TableRowCell>
                        <TableRowCell>
                          <ProgressBar value={m.estoquePercent} color={color} />
                        </TableRowCell>
                        <TableRowCell alignment="right">
                          <ProgressChip
                            value={`${m.usoPercent}%`}
                            color={color}
                          />
                        </TableRowCell>
                      </TableRow>
                    );
                  })}
                </div>
              ) : (
                <EmptyCard />
              )}
            </GraphCard>
          </ContentGrid>
        </>
      )}
    </div>
  );
}

function EmptyCard() {
  return (
    <div className="flex items-center justify-center h-40 text-sm text-neutral-500">
      Sem dados disponíveis
    </div>
  );
}
