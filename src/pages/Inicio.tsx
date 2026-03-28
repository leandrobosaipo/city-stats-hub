import { KpiCard } from "@/components/KpiCard";
import { StatusBadge } from "@/components/StatusBadge";
import { kpis, executions, schedules, cityMetrics } from "@/data/mock-data";
import { ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

function exportCSV() {
  const headers = ['Cidade', 'Estado', 'Usuários Ativos', 'Sessões', 'Sessões Engajadas', 'Taxa Engajamento', 'Tempo Médio (s)', 'Novos Usuários'];
  const rows = cityMetrics.map(c => [c.city, c.state, c.activeUsers, c.sessions, c.engagedSessions, (c.engagementRate * 100).toFixed(1) + '%', c.avgEngagementTime, c.newUsers].join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'ga4_cidades.csv'; a.click();
  URL.revokeObjectURL(url);
}

export default function Inicio() {
  const nextSchedules = schedules.filter(s => s.active).sort((a, b) => a.nextRun.localeCompare(b.nextRun)).slice(0, 3);
  const recentExecs = [...executions].sort((a, b) => b.startedAt.localeCompare(a.startedAt)).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Visão Geral</h2>
          <p className="text-sm text-muted-foreground">Dashboard operacional — GA4 por cidade</p>
        </div>
        <Button variant="outline" size="sm" onClick={exportCSV} className="gap-1.5">
          <Download className="h-3.5 w-3.5" />
          Exportar CSV
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map(k => <KpiCard key={k.label} kpi={k} />)}
      </div>

      {/* Two columns */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent executions */}
        <div className="bg-card rounded-lg border shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-sm font-semibold text-foreground">Últimas Execuções</h3>
            <a href="/historico" className="text-xs text-primary flex items-center gap-0.5 hover:underline">
              Ver todas <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
          <div className="divide-y">
            {recentExecs.map(ex => (
              <div key={ex.id} className="px-4 py-3 flex items-center justify-between text-sm">
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{ex.site}</p>
                  <p className="text-xs text-muted-foreground">{ex.job} · {ex.runId}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {ex.durationMs && (
                    <span className="text-xs text-muted-foreground">{(ex.durationMs / 1000).toFixed(1)}s</span>
                  )}
                  <StatusBadge status={ex.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next schedules */}
        <div className="bg-card rounded-lg border shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-sm font-semibold text-foreground">Próximos Agendamentos</h3>
            <a href="/agendamentos" className="text-xs text-primary flex items-center gap-0.5 hover:underline">
              Ver todos <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
          <div className="divide-y">
            {nextSchedules.map(s => (
              <div key={s.id} className="px-4 py-3 flex items-center justify-between text-sm">
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{s.site}</p>
                  <p className="text-xs text-muted-foreground">{s.job} · <code className="text-[10px] bg-muted px-1 rounded">{s.cron}</code></p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-medium text-foreground">
                    {new Date(s.nextRun).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {new Date(s.nextRun).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* City ranking */}
      <div className="bg-card rounded-lg border shadow-sm">
        <div className="px-4 py-3 border-b">
          <h3 className="text-sm font-semibold text-foreground">Ranking de Cidades — Top 10</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table-operational">
            <thead>
              <tr>
                <th>#</th>
                <th>Cidade</th>
                <th>UF</th>
                <th className="text-right">Usuários Ativos</th>
                <th className="text-right">Sessões</th>
                <th className="text-right">Taxa Engaj.</th>
                <th className="text-right">Tempo Médio</th>
                <th className="text-right">Novos Usuários</th>
                <th className="text-right">Eventos/Sessão</th>
              </tr>
            </thead>
            <tbody>
              {cityMetrics.map((c, i) => (
                <tr key={c.city}>
                  <td className="text-muted-foreground font-mono text-xs">{i + 1}</td>
                  <td className="font-medium">{c.city}</td>
                  <td className="text-muted-foreground">{c.state}</td>
                  <td className="text-right font-mono">{c.activeUsers.toLocaleString('pt-BR')}</td>
                  <td className="text-right font-mono">{c.sessions.toLocaleString('pt-BR')}</td>
                  <td className="text-right font-mono">{(c.engagementRate * 100).toFixed(0)}%</td>
                  <td className="text-right font-mono">{c.avgEngagementTime}s</td>
                  <td className="text-right font-mono">{c.newUsers.toLocaleString('pt-BR')}</td>
                  <td className="text-right font-mono">{c.eventsPerSession}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
