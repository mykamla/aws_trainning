# aws_trainning

Dépôt de quiz / trainers interactifs AWS. **Une dossier par sujet de test** sous `tests/`.

## Layout

```
tests/
  aws-lambda/     # Quiz interactif AWS Lambda (React + Vite)
```

D’autres sujets (ex. IAM, S3) pourront être ajoutés plus tard, chacun dans son propre dossier `tests/<sujet>/`.

## AWS Lambda Prep

Quiz complet (home → module → question → feedback → résultats), calqué sur le flux du trainer OCP interactif.

```bash
cd tests/aws-lambda/web
npm install
npm run dev
```

Détails : [tests/aws-lambda/README.md](tests/aws-lambda/README.md).
