# aws_trainning

Dépôt de quiz / trainers interactifs AWS. **Un dossier par sujet de test** sous `tests/`.

## Layout

```
tests/
  aws-lambda/     # Quiz interactif AWS Lambda (React + Vite)
  clf-c02/        # Miroir Pages des outils HTML CLF-C02 (upstream externe)
```

D’autres sujets (ex. IAM, S3) pourront être ajoutés plus tard, chacun dans son propre dossier `tests/<sujet>/`.

## AWS Lambda Prep

Quiz complet (home → module → question → feedback → résultats), calqué sur le flux du trainer OCP interactif.

**URL publique (GitHub Pages) :** https://mykamla.github.io/aws_trainning/  
**Cours d’intro :** https://mykamla.github.io/aws_trainning/course

### Lancer en local

```bash
cd tests/aws-lambda/web
npm install
npm run dev
```

Ouvrez l’URL affichée (souvent `http://localhost:5173/aws_trainning/`).

Détails : [tests/aws-lambda/README.md](tests/aws-lambda/README.md).

## CLF-C02 Study Tools (miroir)

Outils HTML libres de [TushaeBXN/aws-clf-c02-study](https://github.com/TushaeBXN/aws-clf-c02-study)
servis sous ce dépôt **sans modifier l’upstream**.

**URL publique :** https://mykamla.github.io/aws_trainning/clf-c02/

Le workflow Pages clone l’upstream en lecture seule, puis génère un **hub français**
(`tests/clf-c02/build-hub.py`) qui ne liste que les outils réellement présents
(pas de flashcards séparées — les QCM sont dans les examens / drills).
Détails & URLs : [tests/clf-c02/README.md](tests/clf-c02/README.md).

### Activer Pages (obligatoire, une fois)

Sans cette étape le site répond **404** et le job `deploy` du workflow échoue avec *Failed to create deployment*.

1. Ouvrir https://github.com/mykamla/aws_trainning/settings/pages  
2. **Source** = **GitHub Actions** (pas « Deploy from a branch »)  
3. Relancer le workflow : *Actions → Deploy GitHub Pages → Re-run failed jobs*  
   (ou *Run workflow* / nouveau push sur `main`)

