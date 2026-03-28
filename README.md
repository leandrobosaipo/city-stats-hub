# City Stats Hub

Dashboard operacional para monitoramento de geração de relatórios GA4 (Projeto Perrengue), com controle de:

- Agendamentos (`cron`, timezone, janela)
- Execuções (`run_id`, duração, status)
- Entregas (`Telegram`/`Spaces`)
- Configurações por site
- Ranking de cidades e KPIs (mock)

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra em `http://localhost:8080`.

## Build

```bash
npm run build
npm run preview
```

## Publicação (GitHub Pages)

Este repositório tem GitHub Actions configurado para publicar automaticamente em cada `push` na branch `main`.

URL provável da publicação:

```
https://leandrobosaipo.github.io/city-stats-hub/
```

### Pré-requisitos para publicação funcionar

1. No GitHub, abra **Settings → Pages**
2. Em **Build and deployment**, escolha **Source: GitHub Actions**
3. Push na branch `main`
4. Esperar action `deploy-pages` concluir

## Observações

- O app está pronto para evolução com backend/API para substituir os dados mockados por:
  - `runs` reais
  - leitura de `run-*.jsonl`
  - parsing de `outputs/*.csv`
  - status de delivery de Telegram/Spaces
