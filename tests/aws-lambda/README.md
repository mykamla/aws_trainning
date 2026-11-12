# AWS Lambda Prep

Quiz interactif (React + Vite) pour pratiquer **AWS Lambda** — modèle d’exécution, cold starts, concurrence, triggers, IAM/VPC, packaging, retries et observabilité.

Interface en **français**. Progression persistée en `localStorage`.

## Lancer en local

```bash
cd tests/aws-lambda/web
npm install
npm run dev
```

Ouvrez l’URL affichée (souvent `http://localhost:5173/`).

### Build

```bash
cd tests/aws-lambda/web
npm run build
npm run preview
```

## Parcours

12 modules (~128 questions), dont 2 examens blancs mixtes (modules 11–12).

| Modules | Thèmes |
|--------:|--------|
| 1–2 | Exécution, cold starts |
| 3 | Concurrence (reserved / provisioned) |
| 4–6 | Triggers HTTP, événements, SQS/streams |
| 7–8 | IAM, VPC, config/layers, packaging, versions |
| 9–10 | Perf/prix, retries/DLQ, logs/X-Ray |
| 11–12 | Examens blancs |
