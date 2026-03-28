import { StatusBadge } from "@/components/StatusBadge";
import { deliveries } from "@/data/mock-data";
import { RotateCcw, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Entregas() {
  const sorted = [...deliveries].sort((a, b) => {
    if (!a.sentAt) return -1;
    if (!b.sentAt) return 1;
    return b.sentAt.localeCompare(a.sentAt);
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Entregas</h2>
        <p className="text-sm text-muted-foreground">Status de envio por Telegram e Google Spaces</p>
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-x-auto">
        <table className="table-operational">
          <thead>
            <tr>
              <th>Run ID</th>
              <th>Site</th>
              <th>Canal</th>
              <th>Destino</th>
              <th>Enviado em</th>
              <th>Status</th>
              <th>Artefato</th>
              <th className="text-right">Retries</th>
              <th>Erro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(d => (
              <tr key={d.id}>
                <td><code className="text-xs bg-muted px-1.5 py-0.5 rounded">{d.runId}</code></td>
                <td className="font-medium">{d.site}</td>
                <td>
                  <span className="status-badge bg-muted text-muted-foreground">
                    {d.channel === 'telegram' ? '📱 Telegram' : '💬 Spaces'}
                  </span>
                </td>
                <td className="text-sm">{d.recipient}</td>
                <td className="text-sm whitespace-nowrap">
                  {d.sentAt ? `${new Date(d.sentAt).toLocaleDateString('pt-BR')} ${new Date(d.sentAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}` : '—'}
                </td>
                <td><StatusBadge status={d.status} /></td>
                <td className="text-xs">{d.artifact ?? '—'}</td>
                <td className="text-right font-mono">{d.retries}</td>
                <td className="text-xs text-status-error max-w-[200px] truncate">{d.error ?? '—'}</td>
                <td>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" title="Retentar">
                      <RotateCcw className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" title="Deep link">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
