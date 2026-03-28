import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { KPI } from "@/data/mock-data";

export function KpiCard({ kpi }: { kpi: KPI }) {
  return (
    <div className="kpi-card">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{kpi.label}</p>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-2xl font-bold text-foreground">{kpi.value}</span>
        {kpi.change != null && (
          <span className={cn(
            "flex items-center gap-0.5 text-xs font-medium",
            kpi.change > 0 ? "text-status-success" : kpi.change < 0 ? "text-status-error" : "text-muted-foreground"
          )}>
            {kpi.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {kpi.change > 0 ? '+' : ''}{kpi.change}
          </span>
        )}
      </div>
    </div>
  );
}
