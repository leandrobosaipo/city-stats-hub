import { cn } from "@/lib/utils";
import type { ExecutionStatus } from "@/data/mock-data";

const statusConfig: Record<ExecutionStatus, { label: string; className: string; icon: string }> = {
  success: { label: 'Sucesso', className: 'bg-status-success-bg text-status-success-foreground', icon: '✅' },
  error: { label: 'Erro', className: 'bg-status-error-bg text-status-error-foreground', icon: '❌' },
  pending: { label: 'Pendente', className: 'bg-status-warning-bg text-status-warning-foreground', icon: '🟡' },
  retry: { label: 'Retry', className: 'bg-status-warning-bg text-status-warning-foreground', icon: '🔄' },
  paused: { label: 'Pausado', className: 'bg-status-pending-bg text-status-pending-foreground', icon: '⏸️' },
};

export function StatusBadge({ status, showIcon = true }: { status: ExecutionStatus; showIcon?: boolean }) {
  const config = statusConfig[status];
  return (
    <span className={cn("status-badge", config.className)}>
      {showIcon && <span>{config.icon}</span>}
      {config.label}
    </span>
  );
}
