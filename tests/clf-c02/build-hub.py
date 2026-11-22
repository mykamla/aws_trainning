#!/usr/bin/env python3
"""Build a French hub index for the CLF-C02 Pages mirror.

Runs after the read-only upstream clone. Replaces index.html with a hub that
only links to files that actually exist (upstream index links several missing
pages; under GitHub Pages those 404s fall through to the Lambda SPA and look
broken / empty). Does not modify the upstream repository.
"""

from __future__ import annotations

import html
import sys
from pathlib import Path

# Known tools: path → (French title, badge, short description, category)
CATALOG: dict[str, tuple[str, str, str, str]] = {
    "master-cheat-sheet.html": (
        "Master Cheat Sheet",
        "RÉFÉRENCE",
        "Aide-mémoire complet (4 domaines, onglets, IAM, CAF, 7 Rs, pièges d’examen).",
        "reference",
    ),
    "countdown-plan.html": (
        "Plan 7 jours / jour J",
        "PLAN",
        "Planning de révision, sujets prioritaires et checklist du jour d’examen.",
        "reference",
    ),
    "clf-c02-mock-exam.html": (
        "Mock exam complet (70 Q)",
        "EXAMEN",
        "Examen blanc pondéré CLF-C02, timer 90 min, score et analyse par domaine.",
        "exams",
    ),
    "full-exam.html": (
        "Examen format officiel (65 Q)",
        "EXAMEN",
        "Mock au format officiel : 65 questions, timer 90 minutes.",
        "exams",
    ),
    "practice-exam.html": (
        "Practice exam (50 Q)",
        "EXAMEN",
        "50 questions scénario avec timer — entraînement rapide.",
        "exams",
    ),
    "master-cheat-sheet-test.html": (
        "Test du cheat sheet (50 Q)",
        "EXAMEN",
        "50 questions tirées du cheat sheet — noms de services complets comme à l’examen.",
        "exams",
    ),
    "domain3-phase-diagnostic.html": (
        "Diagnostic Domaine 3 · Technology",
        "DIAGNOSTIC",
        "38 questions sur Cloud Technology & Services (8 task statements).",
        "diagnostics",
    ),
    "domain4-billing-diagnostic.html": (
        "Diagnostic Domaine 4 · Billing",
        "DIAGNOSTIC",
        "36 questions Billing, Pricing & Support (3 task statements).",
        "diagnostics",
    ),
    "AWS_CCP_keyword-match-drill-v2.html": (
        "Keyword Match Drill v2",
        "DRILL",
        "65 phrases-déclencheurs → services. Idéal pour mémoriser vite (proche flashcards).",
        "drills",
    ),
    "blind-spot-drill.html": (
        "Blind Spot Drill",
        "DRILL",
        "44 questions sur Shared Responsibility, SELECT TWO, confusions de services, stockage.",
        "drills",
    ),
}

SECTIONS = [
    ("reference", "Référence (pas de QCM)"),
    ("exams", "Examens & questions (c’est ici les QCM)"),
    ("diagnostics", "Diagnostics par domaine"),
    ("drills", "Drills ciblés (style flashcards)"),
]

BADGE_CLASS = {
    "RÉFÉRENCE": "b-ref",
    "PLAN": "b-plan",
    "EXAMEN": "b-test",
    "DIAGNOSTIC": "b-drill",
    "DRILL": "b-drill",
}


def build(dest: Path) -> None:
    existing = {p.name for p in dest.glob("*.html")}
    # Keep original hub for debugging / comparison
    upstream_index = dest / "index.html"
    if upstream_index.exists():
        upstream_index.replace(dest / "index.upstream.html")

    sections_html: list[str] = []
    for key, label in SECTIONS:
        cards: list[str] = []
        for name, (title, badge, desc, cat) in CATALOG.items():
            if cat != key or name not in existing:
                continue
            bc = BADGE_CLASS.get(badge, "b-ref")
            cards.append(
                f"""    <a class="tool-card" href="{html.escape(name)}">
      <div class="tc-top"><div class="tc-title">{html.escape(title)}</div><span class="tc-badge {bc}">{html.escape(badge)}</span></div>
      <div class="tc-desc">{html.escape(desc)}</div>
      <div class="tc-meta">{html.escape(name)}</div>
    </a>"""
            )
        if not cards:
            continue
        sections_html.append(
            f'  <div class="section-label">{html.escape(label)}</div>\n'
            f'  <div class="tools-grid">\n' + "\n".join(cards) + "\n  </div>"
        )

    # Any unexpected HTML tools not in catalog
    known = set(CATALOG) | {"index.html", "index.upstream.html"}
    extras = sorted(existing - known)
    if extras:
        cards = []
        for name in extras:
            cards.append(
                f"""    <a class="tool-card" href="{html.escape(name)}">
      <div class="tc-top"><div class="tc-title">{html.escape(name)}</div><span class="tc-badge b-ref">AUTRE</span></div>
      <div class="tc-desc">Outil présent dans le miroir upstream.</div>
      <div class="tc-meta">{html.escape(name)}</div>
    </a>"""
            )
        sections_html.append(
            '  <div class="section-label">Autres fichiers</div>\n'
            '  <div class="tools-grid">\n' + "\n".join(cards) + "\n  </div>"
        )

    page = f"""<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CLF-C02 · Outils d’étude (miroir)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root{{--bg:#090d16;--surface:#101726;--surface2:#1a2333;--border:rgba(255,255,255,0.06);--text:#f1f5f9;--muted:#8ea0bf;--hint:#475569;--accent:#ff9900;--blue:#38bdf8;--green:#34d399;--red:#f87171;--purple:#a78bfa;--mono:'Space Mono',monospace;--sans:'DM Sans',sans-serif;--radius:10px;--radius-lg:14px}}
*{{box-sizing:border-box;margin:0;padding:0}}
body{{background:var(--bg);color:var(--text);font-family:var(--sans);font-size:15px;line-height:1.6;min-height:100vh;padding-bottom:4rem}}
header{{border-bottom:1px solid var(--border);padding:16px 24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px}}
.logo{{font-family:var(--mono);font-size:13px;color:var(--accent)}}.logo span{{color:var(--muted)}}
.hero{{max-width:860px;margin:0 auto;padding:2.5rem 24px 1.5rem}}
.hero h1{{font-family:var(--mono);font-size:clamp(1.35rem,3.5vw,2rem);font-weight:700;line-height:1.25;margin-bottom:.75rem}}
.hero h1 em{{font-style:normal;color:var(--accent)}}
.hero p{{color:var(--muted);font-size:.95rem;max-width:640px;margin-bottom:1rem}}
.nav-tip{{background:rgba(56,189,248,.08);border:1px solid rgba(56,189,248,.28);border-radius:var(--radius-lg);padding:1rem 1.2rem;margin:0 0 1.25rem;color:var(--muted);font-size:.9rem}}
.nav-tip strong{{color:var(--blue)}}
.nav-tip ol{{margin:.6rem 0 0 1.1rem}}
.nav-tip li{{margin:.25rem 0}}
.main{{max-width:860px;margin:0 auto;padding:0 24px}}
.section-label{{font-family:var(--mono);font-size:.7rem;text-transform:uppercase;letter-spacing:.12em;color:var(--muted);margin:2rem 0 1rem;padding-bottom:.5rem;border-bottom:1px solid var(--border)}}
.tools-grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}}
.tool-card{{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.1rem 1.2rem;text-decoration:none;color:var(--text);transition:border-color .2s,background .2s;display:flex;flex-direction:column;gap:.5rem}}
.tool-card:hover{{border-color:var(--accent);background:var(--surface2)}}
.tc-top{{display:flex;justify-content:space-between;align-items:flex-start;gap:.5rem}}
.tc-title{{font-size:.95rem;font-weight:600;line-height:1.3}}
.tc-badge{{font-family:var(--mono);font-size:.62rem;padding:.2rem .55rem;border-radius:4px;white-space:nowrap;flex-shrink:0}}
.b-ref{{background:rgba(167,139,250,.12);border:1px solid rgba(167,139,250,.28);color:var(--purple)}}
.b-test{{background:rgba(255,153,0,.12);border:1px solid rgba(255,153,0,.28);color:var(--accent)}}
.b-drill{{background:rgba(248,113,113,.12);border:1px solid rgba(248,113,113,.28);color:var(--red)}}
.b-plan{{background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.28);color:var(--green)}}
.tc-desc{{font-size:.82rem;color:var(--muted);line-height:1.5}}
.tc-meta{{font-family:var(--mono);font-size:.65rem;color:var(--hint)}}
.attrib{{margin-top:2.5rem;font-size:.8rem;color:var(--hint)}}
.attrib a{{color:var(--blue)}}
footer{{border-top:1px solid var(--border);padding:1.2rem 24px;text-align:center;font-family:var(--mono);font-size:.65rem;color:var(--hint);margin-top:3rem}}
</style>
</head>
<body>
<header>
  <div class="logo">CLF-C02<span> · Miroir mykamla</span></div>
  <div class="logo"><a href="/aws_trainning/" style="color:var(--muted);text-decoration:none">← Quiz Lambda</a></div>
</header>

<div class="hero">
  <h1>Outils d’étude <em>CLF-C02</em></h1>
  <p>Miroir en lecture seule de TushaeBXN/aws-clf-c02-study. Pas de flashcards séparées : les <strong style="color:var(--text)">questions</strong> sont dans les examens et drills ci-dessous.</p>
  <div class="nav-tip">
    <strong>Comment explorer</strong>
    <ol>
      <li>Pour des <strong>questions / QCM</strong> → section « Examens » (mock exam, practice, full exam) ou « Drills ».</li>
      <li>Pour un style <strong>flashcards</strong> → <em>Keyword Match Drill</em> (phrases → services).</li>
      <li>Pour réviser sans timer → <em>Master Cheat Sheet</em>.</li>
      <li>Seuls les fichiers réellement présents sont listés (les liens cassés de l’index upstream sont filtrés).</li>
    </ol>
  </div>
</div>

<div class="main">
{chr(10).join(sections_html)}

  <p class="attrib">Contenu original © <a href="https://github.com/TushaeBXN/aws-clf-c02-study">TushaeBXN/aws-clf-c02-study</a> — miroir Pages sans modification de l’upstream. Index upstream conservé : <a href="index.upstream.html">index.upstream.html</a>.</p>
</div>

<footer>mykamla/aws_trainning · /clf-c02/ · miroir lecture seule</footer>
</body>
</html>
"""
    (dest / "index.html").write_text(page, encoding="utf-8")
    print(f"Wrote French hub → {dest / 'index.html'} ({len(existing)} html files scanned)")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <mirror-dest-dir>", file=sys.stderr)
        sys.exit(2)
    target = Path(sys.argv[1])
    if not target.is_dir():
        print(f"Not a directory: {target}", file=sys.stderr)
        sys.exit(1)
    build(target)
