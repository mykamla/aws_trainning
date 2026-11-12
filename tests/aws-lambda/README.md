# AWS Lambda Prep

Quiz interactif (React + Vite) pour pratiquer **AWS Lambda** — modèle d’exécution, cold starts, concurrence, triggers, IAM/VPC, packaging, retries et observabilité.

Interface en **français**. Progression persistée en `localStorage`.

## Live (GitHub Pages)

**https://mykamla.github.io/aws_trainning/**

Déploiement automatique via `.github/workflows/deploy-pages.yml` à chaque push sur `main` (build de `tests/aws-lambda/web`, artefact `dist`, copie `404.html` pour le SPA).

### Si vous voyez un 404

1. Vérifier *Settings → Pages → Source = GitHub Actions* :  
   https://github.com/mykamla/aws_trainning/settings/pages  
2. Relancer *Actions → Deploy GitHub Pages* (Re-run failed jobs).  
3. Attendre le job `deploy` en vert, puis recharger l’URL ci-dessus.

Le build CI a déjà été validé (`npm run build`, `base: '/aws_trainning/'`, artefact `tests/aws-lambda/web/dist`). Le blocage restant est uniquement l’activation Pages côté réglages du dépôt.

## Lancer en local

```bash
cd tests/aws-lambda/web
npm install
npm run dev
```

Ouvrez l’URL affichée (souvent `http://localhost:5173/aws_trainning/`).

### Sur téléphone (même Wi‑Fi)

```bash
cd tests/aws-lambda/web
npm run dev -- --host
```

### Build

```bash
cd tests/aws-lambda/web
npm run build
npm run preview
```

`vite.config.ts` utilise `base: '/aws_trainning/'` pour Pages.

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
