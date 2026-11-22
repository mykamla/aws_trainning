# CLF-C02 Study Tools (miroir)

Miroir en lecture seule des outils d’étude HTML de
[TushaeBXN/aws-clf-c02-study](https://github.com/TushaeBXN/aws-clf-c02-study)
(cheat sheets, mock exams, drills). Aucune modification du dépôt upstream.

## URL publique

https://mykamla.github.io/aws_trainning/clf-c02/

## Comment le miroir est maintenu

**Clone à chaque déploiement Pages** (pas de copie vendue dans ce dépôt) :

1. Le workflow [`.github/workflows/deploy-pages.yml`](../../.github/workflows/deploy-pages.yml)
   build le quiz Lambda comme d’habitude.
2. Il clone ensuite `TushaeBXN/aws-clf-c02-study` (`--depth 1`) en lecture seule.
3. Le contenu HTML est copié sous `dist/clf-c02/` avant l’upload de l’artefact Pages.

Pour rafraîchir le miroir après un changement upstream : push sur `main` ou
*Actions → Deploy GitHub Pages → Run workflow*.

## Contenu local

Ce dossier ne contient que cette doc. Les fichiers HTML ne sont pas versionnés ici
afin d’éviter de diverger de l’upstream et de rester entièrement côté `mykamla`.

## Attribution

Contenu original © [Tushae Thomas (Brian Thomas)](https://github.com/TushaeBXN) —
Per Scholas / AWS re/Start. Voir le README upstream pour le détail des outils.
