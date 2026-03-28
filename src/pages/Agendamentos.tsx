import { StatusBadge } from "@/components/StatusBadge";
import { schedules } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Play, Pause, Copy, RotateCcw } from "lucide-react";

export default function Agendamentos() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Agendamentos</h2>
        <p className="text-sm text-muted-foreground">Gerencie jobs recorrentes de extração GA4</p>
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-x-auto">
        <table className="table-operational">
          <thead>
            <tr>
              <th>Site</th>
              <th>Job</th>
              <th>Cron</th>
              <th>Timezone</th>
              <th>Próximo Run</th>
              <th>Último Run</th>
              <th>Status</th>
              <th>Destinos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map(s => (
              <tr key={s.id} className={!s.active ? 'opacity-50' : ''}>
                <td className="font-medium">{s.site}</td>
                <td>{s.job}</td>
                <td><code className="text-xs bg-muted px-1.5 py-0.5 rounded">{s.cron}</code></td>
                <td className="text-xs text-muted-foreground">{s.timezone}</td>
                <td className="text-sm">{new Date(s.nextRun).toLocaleDateString('pt-BR')} {new Date(s.nextRun).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</td>
                <td className="text-sm">{new Date(s.lastRun).toLocaleDateString('pt-BR')} {new Date(s.lastRun).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</td>
                <td><StatusBadge status={s.active ? s.status : 'paused'} /></td>
                <td>
                  <div className="flex gap-1">
                    {s.destinations.map(d => (
                      <span key={d} className="status-badge bg-muted text-muted-foreground">{d === 'telegram' ? '📱 TG' : '💬 Spaces'}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" title="Executar agora">
                      <Play className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" title={s.active ? 'Pausar' : 'Reativar'}>
                      {s.active ? <Pause className="h-3.5 w-3.5" /> : <RotateCcw className="h-3.5 w-3.5" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" title="Duplicar">
                      <Copy className="h-3.5 w-3.5" />
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
