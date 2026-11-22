# CLF-C02 Study Tools (miroir)

Miroir en lecture seule des outils HTML de
[TushaeBXN/aws-clf-c02-study](https://github.com/TushaeBXN/aws-clf-c02-study).
Aucune modification du dépôt upstream.

## URL publique

https://mykamla.github.io/aws_trainning/clf-c02/

## Navigation (pas de flashcards séparées)

L’upstream **n’a pas** de paquet « flashcards ». Les questions sont dans les examens / drills.

| Besoin | Où cliquer / URL |
|--------|------------------|
| Hub (FR) | [/clf-c02/](https://mykamla.github.io/aws_trainning/clf-c02/) |
| Questions — mock 70 Q | [/clf-c02/clf-c02-mock-exam.html](https://mykamla.github.io/aws_trainning/clf-c02/clf-c02-mock-exam.html) |
| Questions — 65 Q officiel | [/clf-c02/full-exam.html](https://mykamla.github.io/aws_trainning/clf-c02/full-exam.html) |
| Questions — practice 50 Q | [/clf-c02/practice-exam.html](https://mykamla.github.io/aws_trainning/clf-c02/practice-exam.html) |
| Questions — test cheat sheet | [/clf-c02/master-cheat-sheet-test.html](https://mykamla.github.io/aws_trainning/clf-c02/master-cheat-sheet-test.html) |
| Style flashcards (keywords) | [/clf-c02/AWS_CCP_keyword-match-drill-v2.html](https://mykamla.github.io/aws_trainning/clf-c02/AWS_CCP_keyword-match-drill-v2.html) |
| Blind spots | [/clf-c02/blind-spot-drill.html](https://mykamla.github.io/aws_trainning/clf-c02/blind-spot-drill.html) |
| Cheat sheet | [/clf-c02/master-cheat-sheet.html](https://mykamla.github.io/aws_trainning/clf-c02/master-cheat-sheet.html) |
| Plan 7 jours | [/clf-c02/countdown-plan.html](https://mykamla.github.io/aws_trainning/clf-c02/countdown-plan.html) |
| Diag. domaine 3 | [/clf-c02/domain3-phase-diagnostic.html](https://mykamla.github.io/aws_trainning/clf-c02/domain3-phase-diagnostic.html) |
| Diag. domaine 4 | [/clf-c02/domain4-billing-diagnostic.html](https://mykamla.github.io/aws_trainning/clf-c02/domain4-billing-diagnostic.html) |

## Comment le miroir est maintenu

1. Le workflow clone `TushaeBXN/aws-clf-c02-study` (`--depth 1`) en lecture seule.
2. Copie sous `dist/clf-c02/`.
3. `tests/clf-c02/build-hub.py` remplace `index.html` par un **hub français** qui ne liste que les fichiers réellement présents (l’index upstream pointe vers plusieurs pages absentes ; sous Pages ces 404 affichaient le quiz Lambda SPA).
4. L’index upstream est conservé en `index.upstream.html`.

## Attribution

Contenu original © [Tushae Thomas (Brian Thomas)](https://github.com/TushaeBXN) — Per Scholas / AWS re/Start.
