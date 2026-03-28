export type ExecutionStatus = 'success' | 'error' | 'pending' | 'retry' | 'paused';
export type DeliveryChannel = 'telegram' | 'spaces';

export interface KPI {
  label: string;
  value: string | number;
  change?: number;
  unit?: string;
}

export interface Schedule {
  id: string;
  site: string;
  job: string;
  cron: string;
  timezone: string;
  nextRun: string;
  lastRun: string;
  status: ExecutionStatus;
  destinations: DeliveryChannel[];
  ga4PropertyId: string;
  active: boolean;
}

export interface Execution {
  id: string;
  runId: string;
  site: string;
  job: string;
  startedAt: string;
  finishedAt: string | null;
  durationMs: number | null;
  status: ExecutionStatus;
  recordsIn: number | null;
  recordsOut: number | null;
  errorsCount: number;
  file: string | null;
  step: string;
}

export interface Delivery {
  id: string;
  runId: string;
  site: string;
  channel: DeliveryChannel;
  sentAt: string | null;
  status: ExecutionStatus;
  recipient: string;
  artifact: string | null;
  retries: number;
  error: string | null;
}

export interface SiteConfig {
  id: string;
  name: string;
  domain: string;
  ga4PropertyId: string;
  cronSchedule: string;
  cronTz: string;
  doSpacesBucket: string;
  doSpacesRegion: string;
  telegramChatId: string;
  spacesWebhook: string;
  pdfMaxRows: number;
  status: 'connected' | 'error' | 'disconnected';
  lastSync: string;
}

export interface CityMetric {
  city: string;
  state: string;
  activeUsers: number;
  sessions: number;
  engagedSessions: number;
  engagementRate: number;
  avgEngagementTime: number;
  newUsers: number;
  eventsPerSession: number;
  revenue: number | null;
}

export const kpis: KPI[] = [
  { label: 'Jobs Hoje', value: 12, change: 2 },
  { label: 'Sucesso 24h', value: '92%', change: 3 },
  { label: 'Erros Críticos', value: 1, change: -2 },
  { label: 'Tempo Médio', value: '4.2s' },
  { label: 'Entregas Telegram', value: 8, change: 1 },
  { label: 'Entregas Spaces', value: 4 },
];

export const schedules: Schedule[] = [
  {
    id: 'sch-001', site: 'perrengue.com.br', job: 'GA4 Cidades Mensal',
    cron: '0 6 * * *', timezone: 'America/Sao_Paulo',
    nextRun: '2026-03-29T06:00:00', lastRun: '2026-03-28T06:00:12',
    status: 'success', destinations: ['telegram', 'spaces'],
    ga4PropertyId: '345678901', active: true,
  },
  {
    id: 'sch-002', site: 'perrengue.com.br', job: 'GA4 Reprocesso Diário',
    cron: '0 12 * * *', timezone: 'America/Sao_Paulo',
    nextRun: '2026-03-28T12:00:00', lastRun: '2026-03-27T12:00:45',
    status: 'success', destinations: ['telegram'],
    ga4PropertyId: '345678901', active: true,
  },
  {
    id: 'sch-003', site: 'lojadopepe.com.br', job: 'GA4 Cidades Mensal',
    cron: '0 6 1 * *', timezone: 'America/Sao_Paulo',
    nextRun: '2026-04-01T06:00:00', lastRun: '2026-03-01T06:02:33',
    status: 'error', destinations: ['spaces'],
    ga4PropertyId: '456789012', active: true,
  },
  {
    id: 'sch-004', site: 'outrosite.com', job: 'GA4 Semanal',
    cron: '0 7 * * 1', timezone: 'America/Sao_Paulo',
    nextRun: '2026-03-31T07:00:00', lastRun: '2026-03-24T07:01:10',
    status: 'success', destinations: ['telegram'],
    ga4PropertyId: '567890123', active: false,
  },
];

export const executions: Execution[] = [
  {
    id: 'ex-001', runId: 'run-20260328-001', site: 'perrengue.com.br',
    job: 'GA4 Cidades Mensal', startedAt: '2026-03-28T06:00:00',
    finishedAt: '2026-03-28T06:00:12', durationMs: 12340,
    status: 'success', recordsIn: 142, recordsOut: 142, errorsCount: 0,
    file: 'perrengue_cidades_202603.csv', step: 'publish',
  },
  {
    id: 'ex-002', runId: 'run-20260327-002', site: 'perrengue.com.br',
    job: 'GA4 Reprocesso Diário', startedAt: '2026-03-27T12:00:00',
    finishedAt: '2026-03-27T12:00:45', durationMs: 45200,
    status: 'success', recordsIn: 89, recordsOut: 89, errorsCount: 0,
    file: 'perrengue_reprocesso_20260327.csv', step: 'publish',
  },
  {
    id: 'ex-003', runId: 'run-20260328-003', site: 'lojadopepe.com.br',
    job: 'GA4 Cidades Mensal', startedAt: '2026-03-28T06:00:00',
    finishedAt: '2026-03-28T06:00:08', durationMs: 8100,
    status: 'error', recordsIn: 0, recordsOut: 0, errorsCount: 1,
    file: null, step: 'extract',
  },
  {
    id: 'ex-004', runId: 'run-20260327-004', site: 'perrengue.com.br',
    job: 'GA4 Cidades Mensal', startedAt: '2026-03-27T06:00:00',
    finishedAt: '2026-03-27T06:00:15', durationMs: 15600,
    status: 'success', recordsIn: 140, recordsOut: 140, errorsCount: 0,
    file: 'perrengue_cidades_202603_v2.csv', step: 'publish',
  },
  {
    id: 'ex-005', runId: 'run-20260326-005', site: 'perrengue.com.br',
    job: 'GA4 Cidades Mensal', startedAt: '2026-03-26T06:00:00',
    finishedAt: null, durationMs: null,
    status: 'pending', recordsIn: null, recordsOut: null, errorsCount: 0,
    file: null, step: 'extract',
  },
];

export const deliveries: Delivery[] = [
  {
    id: 'del-001', runId: 'run-20260328-001', site: 'perrengue.com.br',
    channel: 'telegram', sentAt: '2026-03-28T06:00:14', status: 'success',
    recipient: '@perrengue_reports', artifact: 'perrengue_cidades_202603.csv',
    retries: 0, error: null,
  },
  {
    id: 'del-002', runId: 'run-20260328-001', site: 'perrengue.com.br',
    channel: 'spaces', sentAt: '2026-03-28T06:00:16', status: 'success',
    recipient: 'GA4 Reports Space', artifact: 'perrengue_cidades_202603.csv',
    retries: 0, error: null,
  },
  {
    id: 'del-003', runId: 'run-20260328-003', site: 'lojadopepe.com.br',
    channel: 'spaces', sentAt: null, status: 'error',
    recipient: 'Loja Reports', artifact: null,
    retries: 2, error: 'Falha no GA4 (credencial expirada)',
  },
  {
    id: 'del-004', runId: 'run-20260327-002', site: 'perrengue.com.br',
    channel: 'telegram', sentAt: '2026-03-27T12:00:48', status: 'success',
    recipient: '@perrengue_reports', artifact: 'perrengue_reprocesso_20260327.csv',
    retries: 0, error: null,
  },
];

export const sites: SiteConfig[] = [
  {
    id: 'site-001', name: 'Perrengue', domain: 'perrengue.com.br',
    ga4PropertyId: '345678901', cronSchedule: '0 6 * * *', cronTz: 'America/Sao_Paulo',
    doSpacesBucket: 'perrengue-reports', doSpacesRegion: 'nyc3',
    telegramChatId: '-1001234567890', spacesWebhook: 'https://chat.googleapis.com/v1/spaces/...',
    pdfMaxRows: 50, status: 'connected', lastSync: '2026-03-28T06:00:14',
  },
  {
    id: 'site-002', name: 'Loja do Pepê', domain: 'lojadopepe.com.br',
    ga4PropertyId: '456789012', cronSchedule: '0 6 1 * *', cronTz: 'America/Sao_Paulo',
    doSpacesBucket: 'pepe-reports', doSpacesRegion: 'nyc3',
    telegramChatId: '-1009876543210', spacesWebhook: '',
    pdfMaxRows: 100, status: 'error', lastSync: '2026-03-01T06:02:33',
  },
  {
    id: 'site-003', name: 'Outro Site', domain: 'outrosite.com',
    ga4PropertyId: '567890123', cronSchedule: '0 7 * * 1', cronTz: 'America/Sao_Paulo',
    doSpacesBucket: 'outro-reports', doSpacesRegion: 'sfo3',
    telegramChatId: '', spacesWebhook: 'https://chat.googleapis.com/v1/spaces/...',
    pdfMaxRows: 30, status: 'disconnected', lastSync: '2026-03-24T07:01:10',
  },
];

export const cityMetrics: CityMetric[] = [
  { city: 'São Paulo', state: 'SP', activeUsers: 12450, sessions: 18200, engagedSessions: 14560, engagementRate: 0.80, avgEngagementTime: 145, newUsers: 3200, eventsPerSession: 4.2, revenue: 45200 },
  { city: 'Rio de Janeiro', state: 'RJ', activeUsers: 8320, sessions: 12100, engagedSessions: 8470, engagementRate: 0.70, avgEngagementTime: 120, newUsers: 2100, eventsPerSession: 3.8, revenue: 28900 },
  { city: 'Belo Horizonte', state: 'MG', activeUsers: 4510, sessions: 6800, engagedSessions: 5100, engagementRate: 0.75, avgEngagementTime: 132, newUsers: 1200, eventsPerSession: 3.5, revenue: 15600 },
  { city: 'Curitiba', state: 'PR', activeUsers: 3890, sessions: 5600, engagedSessions: 4480, engagementRate: 0.80, avgEngagementTime: 155, newUsers: 980, eventsPerSession: 4.0, revenue: 12300 },
  { city: 'Porto Alegre', state: 'RS', activeUsers: 3200, sessions: 4900, engagedSessions: 3430, engagementRate: 0.70, avgEngagementTime: 110, newUsers: 850, eventsPerSession: 3.2, revenue: 9800 },
  { city: 'Salvador', state: 'BA', activeUsers: 2800, sessions: 4200, engagedSessions: 2940, engagementRate: 0.70, avgEngagementTime: 98, newUsers: 720, eventsPerSession: 3.0, revenue: 7600 },
  { city: 'Brasília', state: 'DF', activeUsers: 2650, sessions: 3900, engagedSessions: 3120, engagementRate: 0.80, avgEngagementTime: 140, newUsers: 680, eventsPerSession: 3.9, revenue: 11200 },
  { city: 'Fortaleza', state: 'CE', activeUsers: 2100, sessions: 3200, engagedSessions: 2240, engagementRate: 0.70, avgEngagementTime: 95, newUsers: 560, eventsPerSession: 2.8, revenue: 5400 },
  { city: 'Recife', state: 'PE', activeUsers: 1950, sessions: 2900, engagedSessions: 2030, engagementRate: 0.70, avgEngagementTime: 88, newUsers: 520, eventsPerSession: 2.9, revenue: 4800 },
  { city: 'Goiânia', state: 'GO', activeUsers: 1600, sessions: 2400, engagedSessions: 1920, engagementRate: 0.80, avgEngagementTime: 130, newUsers: 410, eventsPerSession: 3.6, revenue: 6200 },
];
