import { useEffect, useMemo, useState } from 'react';
import {
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
  TableRowCell,
} from '@luislongo/ds-core';
import type { LancamentoFinanceiro, Obra } from '../../../types/relatorios';
import { useContainer } from '../../hooks/useContainer';

type Tab = 'obras' | 'financeiro';

function firstDayOfMonth(): Date {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function lastDayOfMonth(): Date {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

function dateToInput(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function inputToDate(s: string): Date {
  const [y, m, day] = s.split('-').map(Number);
  return new Date(y, m - 1, day);
}

function dayTs(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

function dayEndTs(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999).getTime();
}

const fmtOrcamento = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const fmtValor = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const fmtData = new Intl.DateTimeFormat('pt-BR');

function triggerCSVDownload(rows: string[][], filename: string) {
  const BOM = '﻿';
  const content = BOM + rows.map((r) => r.join(';')).join('\n');
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function Relatorios() {
  const { getRelatoriosData } = useContainer();

  const [ready, setReady] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('obras');
  const [busca, setBusca] = useState('');
  const [dataInicio, setDataInicio] = useState<Date>(firstDayOfMonth);
  const [dataFim, setDataFim] = useState<Date>(lastDayOfMonth);
  const [obras, setObras] = useState<Obra[]>([]);
  const [lancamentos, setLancamentos] = useState<LancamentoFinanceiro[]>([]);

  useEffect(() => {
    getRelatoriosData.execute().then((data) => {
      setObras(data.obras);
      setLancamentos(data.lancamentos);
      setReady(true);
    });
  }, []);

  function handleTabChange(tab: Tab) {
    setActiveTab(tab);
    setBusca('');
  }

  const filteredObras = useMemo(() => {
    const start = dayTs(dataInicio);
    const end = dayEndTs(dataFim);
    const q = busca.toLowerCase();
    return obras.filter((o) => {
      const t = dayTs(o.dataInicio);
      if (t < start || t > end) return false;
      if (!q) return true;
      return (
        o.nome.toLowerCase().includes(q) ||
        o.tipo.toLowerCase().includes(q) ||
        o.status.toLowerCase().includes(q)
      );
    });
  }, [obras, dataInicio, dataFim, busca]);

  const filteredLancamentos = useMemo(() => {
    const start = dayTs(dataInicio);
    const end = dayEndTs(dataFim);
    const q = busca.toLowerCase();
    return lancamentos.filter((l) => {
      const t = dayTs(l.data);
      if (t < start || t > end) return false;
      if (!q) return true;
      return (
        l.descricao.toLowerCase().includes(q) ||
        l.tipo.toLowerCase().includes(q) ||
        l.metodo.toLowerCase().includes(q) ||
        l.status.toLowerCase().includes(q)
      );
    });
  }, [lancamentos, dataInicio, dataFim, busca]);

  function handleExport() {
    if (activeTab === 'obras') {
      const headers = ['#', 'Obra', 'Tipo', '% Concluído', 'Orçamento', 'Status'];
      const rows = filteredObras.map((o, i) => [
        String(i + 1).padStart(2, '0'),
        o.nome,
        o.tipo,
        `${o.percentualConcluido}%`,
        fmtOrcamento.format(o.orcamento),
        o.status,
      ]);
      triggerCSVDownload([headers, ...rows], 'relatorio-obras');
    } else {
      const headers = ['#', 'Descrição', 'Tipo', 'Data', 'Valor', 'Método', 'Status'];
      const rows = filteredLancamentos.map((l, i) => [
        String(i + 1).padStart(2, '0'),
        l.descricao,
        l.tipo,
        fmtData.format(l.data),
        fmtValor.format(l.valor),
        l.metodo,
        l.status,
      ]);
      triggerCSVDownload([headers, ...rows], 'relatorio-financeiro');
    }
  }

  return (
    <div className="flex flex-col gap-800 w-full">
      <h1 className="text-2xl font-semibold text-neutral-900">Relatórios</h1>

      {/* Tabs */}
      <div className="flex border-b border-neutral-200">
        <TabButton
          label="Obras"
          active={activeTab === 'obras'}
          onClick={() => handleTabChange('obras')}
        />
        <TabButton
          label="Financeiro"
          active={activeTab === 'financeiro'}
          onClick={() => handleTabChange('financeiro')}
        />
        <TabButton label="Externo" active={false} disabled />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-400">
        {/* Search */}
        <div className="flex items-center gap-200 border border-neutral-200 rounded-200 px-300 py-[9px] bg-white lg:w-[530px]">
          <SearchIcon />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder={activeTab === 'obras' ? 'Buscar obras...' : 'Buscar lançamentos...'}
            aria-label={activeTab === 'obras' ? 'Buscar obras' : 'Buscar lançamentos'}
            className="flex-1 border-none outline-none text-sm text-neutral-800 placeholder:text-neutral-400 bg-transparent"
          />
        </div>

        {/* Date range + Export */}
        <div className="flex flex-col gap-200">
          <div className="flex items-end gap-200">
            <DateField label="Data Início" value={dataInicio} onChange={setDataInicio} />
            <span className="text-neutral-400 pb-[10px] text-sm select-none">—</span>
            <DateField label="Data Fim" value={dataFim} onChange={setDataFim} />
          </div>
          {/* Export button: below date range on mobile, hidden on desktop */}
          <div className="flex justify-end lg:hidden">
            <ExportButton onClick={handleExport} />
          </div>
        </div>

        {/* Export button: visible on desktop */}
        <div className="hidden lg:flex items-end pb-[1px]">
          <ExportButton onClick={handleExport} />
        </div>
      </div>

      {/* Table */}
      {ready ? (
        <div className="overflow-x-auto">
          {activeTab === 'obras' ? (
            <ObrasTable obras={filteredObras} />
          ) : (
            <LancamentosTable lancamentos={filteredLancamentos} />
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-200">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 rounded-200 bg-neutral-100 animate-pulse" />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

function TabButton({
  label,
  active,
  disabled,
  onClick,
}: {
  label: string;
  active: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        'relative px-400 pb-300 pt-200 text-sm font-medium transition-colors',
        active
          ? 'text-primary-500'
          : disabled
          ? 'text-neutral-300 cursor-not-allowed'
          : 'text-neutral-500 hover:text-neutral-700 cursor-pointer',
      ].join(' ')}
    >
      {label}
      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-500 rounded-t-full" />
      )}
    </button>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Date;
  onChange: (d: Date) => void;
}) {
  return (
    <div className="flex flex-col gap-050">
      <span className="text-xs text-neutral-500">{label}</span>
      <div className="flex items-center gap-200 border border-neutral-200 rounded-200 px-300 py-[9px] bg-white">
        <CalendarIcon />
        <input
          type="date"
          value={dateToInput(value)}
          onChange={(e) => {
            if (e.target.value) onChange(inputToDate(e.target.value));
          }}
          className="border-none outline-none text-sm text-neutral-800 bg-transparent"
        />
      </div>
    </div>
  );
}

function ExportButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Exportar dados como CSV"
      className="flex items-center gap-200 px-300 py-[9px] text-sm text-neutral-600 hover:text-neutral-900 cursor-pointer transition-colors"
    >
      <ExportIcon />
      Exportar
    </button>
  );
}

function ObrasTable({ obras }: { obras: Obra[] }) {
  return (
    <div className="flex flex-col min-w-[640px]">
      <TableHeaderRow>
        <TableHeaderCell>#</TableHeaderCell>
        <TableHeaderCell>Obra</TableHeaderCell>
        <TableHeaderCell>Tipo</TableHeaderCell>
        <TableHeaderCell>% Concluído</TableHeaderCell>
        <TableHeaderCell>Orçamento</TableHeaderCell>
        <TableHeaderCell>Status</TableHeaderCell>
      </TableHeaderRow>
      {obras.map((o, i) => (
        <TableRow key={o.id}>
          <TableRowCell>{String(i + 1).padStart(2, '0')}</TableRowCell>
          <TableRowCell>{o.nome}</TableRowCell>
          <TableRowCell>{o.tipo}</TableRowCell>
          <TableRowCell>{o.percentualConcluido}%</TableRowCell>
          <TableRowCell>{fmtOrcamento.format(o.orcamento)}</TableRowCell>
          <TableRowCell>{o.status}</TableRowCell>
        </TableRow>
      ))}
    </div>
  );
}

function LancamentosTable({ lancamentos }: { lancamentos: LancamentoFinanceiro[] }) {
  return (
    <div className="flex flex-col min-w-[800px]">
      <TableHeaderRow>
        <TableHeaderCell>#</TableHeaderCell>
        <TableHeaderCell>Descrição</TableHeaderCell>
        <TableHeaderCell>Tipo</TableHeaderCell>
        <TableHeaderCell>Data</TableHeaderCell>
        <TableHeaderCell>Valor</TableHeaderCell>
        <TableHeaderCell>Método</TableHeaderCell>
        <TableHeaderCell>Status</TableHeaderCell>
      </TableHeaderRow>
      {lancamentos.map((l, i) => (
        <TableRow key={l.id}>
          <TableRowCell>{String(i + 1).padStart(2, '0')}</TableRowCell>
          <TableRowCell>{l.descricao}</TableRowCell>
          <TableRowCell>{l.tipo}</TableRowCell>
          <TableRowCell>{fmtData.format(l.data)}</TableRowCell>
          <TableRowCell>{fmtValor.format(l.valor)}</TableRowCell>
          <TableRowCell>{l.metodo}</TableRowCell>
          <TableRowCell>{l.status}</TableRowCell>
        </TableRow>
      ))}
    </div>
  );
}

// ── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-neutral-400 shrink-0"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-neutral-400 shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
