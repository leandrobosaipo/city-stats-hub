import { StatusBadge } from "@/components/StatusBadge";
import { executions } from "@/data/mock-data";
import { FileText, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Historico() {
  const sorted = [...executions].sort((a, b) => b.startedAt.localeCompare(a.startedAt));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Histórico de Execuções</h2>
        <p className="text-sm text-muted-foreground">Logs por run com status, duração e artefatos</p>
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-x-auto">
        <table className="table-operational">
          <thead>
            <tr>
              <th>Run ID</th>
              <th>Site</th>
              <th>Job</th>
              <th>Step</th>
              <th>Início</th>
              <th>Duração</th>
              <th className="text-right">In</th>
              <th className="text-right">Out</th>
              <th className="text-right">Erros</th>
              <th>Status</th>
              <th>Arquivo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(ex => (
              <tr key={ex.id}>
                <td><code className="text-xs bg-muted px-1.5 py-0.5 rounded">{ex.runId}</code></td>
                <td className="font-medium">{ex.site}</td>
                <td className="text-sm">{ex.job}</td>
                <td><span className="status-badge bg-muted text-muted-foreground">{ex.step}</span></td>
                <td className="text-sm whitespace-nowrap">
                  {new Date(ex.startedAt).toLocaleDateString('pt-BR')}{' '}
                  {new Date(ex.startedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </td>
                <td className="font-mono text-sm">{ex.durationMs ? `${(ex.durationMs / 1000).toFixed(1)}s` : '—'}</td>
                <td className="text-right font-mono">{ex.recordsIn ?? '—'}</td>
                <td className="text-right font-mono">{ex.recordsOut ?? '—'}</td>
                <td className="text-right font-mono">{ex.errorsCount > 0 ? <span className="text-status-error font-semibold">{ex.errorsCount}</span> : '0'}</td>
                <td><StatusBadge status={ex.status} /></td>
                <td className="text-xs">{ex.file ? <span className="flex items-center gap-1"><FileText className="h-3 w-3 text-muted-foreground" />{ex.file}</span> : '—'}</td>
                <td>
                  <Button variant="ghost" size="icon" className="h-7 w-7" title="Retentar">
                    <RotateCcw className="h-3.5 w-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
