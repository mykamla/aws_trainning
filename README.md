# aws_trainning

Dépôt de quiz / trainers interactifs AWS. **Un dossier par sujet de test** sous `tests/`.

## Layout

```
tests/
  aws-lambda/     # Quiz interactif AWS Lambda (React + Vite)
```

D’autres sujets (ex. IAM, S3) pourront être ajoutés plus tard, chacun dans son propre dossier `tests/<sujet>/`.

## AWS Lambda Prep

Quiz complet (home → module → question → feedback → résultats), calqué sur le flux du trainer OCP interactif.

**URL publique (GitHub Pages) :** https://mykamla.github.io/aws_trainning/

> Après le premier merge sur `main`, activez Pages si besoin : *Settings → Pages → Source = GitHub Actions*.

### Lancer en local

```bash
cd tests/aws-lambda/web
npm install
npm run dev
```

Ouvrez l’URL affichée (souvent `http://localhost:5173/aws_trainning/`).

Détails : [tests/aws-lambda/README.md](tests/aws-lambda/README.md).
