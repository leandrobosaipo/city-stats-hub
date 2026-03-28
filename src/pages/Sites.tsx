import { sites } from "@/data/mock-data";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const statusIcon = {
  connected: <CheckCircle className="h-4 w-4 text-status-success" />,
  error: <XCircle className="h-4 w-4 text-status-error" />,
  disconnected: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
};

function ConfigField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      <code className="text-sm bg-muted px-2 py-1 rounded break-all">{value || '—'}</code>
    </div>
  );
}

export default function Sites() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Sites</h2>
        <p className="text-sm text-muted-foreground">Configurações de integração por site</p>
      </div>

      <Accordion type="multiple" className="space-y-3">
        {sites.map(site => (
          <AccordionItem key={site.id} value={site.id} className="bg-card border rounded-lg shadow-sm px-4">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3 text-left">
                {statusIcon[site.status]}
                <div>
                  <p className="font-semibold text-foreground">{site.name}</p>
                  <p className="text-xs text-muted-foreground">{site.domain} · GA4 {site.ga4PropertyId}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                <ConfigField label="GA4 Property ID" value={site.ga4PropertyId} />
                <ConfigField label="CRON_SCHEDULE" value={site.cronSchedule} />
                <ConfigField label="CRON_TZ" value={site.cronTz} />
                <ConfigField label="DO_SPACES_BUCKET" value={site.doSpacesBucket} />
                <ConfigField label="DO_SPACES_REGION" value={site.doSpacesRegion} />
                <ConfigField label="Telegram Chat ID" value={site.telegramChatId} />
                <ConfigField label="Spaces Webhook" value={site.spacesWebhook} />
                <ConfigField label="PDF_MAX_ROWS" value={String(site.pdfMaxRows)} />
                <ConfigField label="Última Sincronização" value={new Date(site.lastSync).toLocaleString('pt-BR')} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
