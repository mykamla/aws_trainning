import { Link } from 'react-router-dom'
import { COURSE_INTRO, COURSE_SECTIONS } from '../data/course'
import { MODULE_COUNT } from '../types/quiz'

export function CoursePage() {
  return (
    <div className="stack course-page">
      <div className="session-top">
        <div className="meta-row">
          <Link to="/" className="btn btn-ghost" style={{ paddingLeft: 0 }}>
            ← Accueil
          </Link>
          <span className="pill">Cours · {COURSE_SECTIONS.length} sections</span>
        </div>
      </div>

      <header className="hero-home" style={{ paddingTop: '0.35rem' }}>
        <div className="brand-mark" style={{ marginBottom: '0.75rem' }}>
          <span className="logo">λ</span>
          <span className="brand" style={{ fontSize: '1.2rem' }}>
            AWS Lambda Prep
          </span>
        </div>
        <h1 className="brand">{COURSE_INTRO.title}</h1>
        <p className="tagline">{COURSE_INTRO.subtitle}</p>
        <div className="actions">
          <a className="btn btn-secondary" href="#course-toc">
            Sommaire
          </a>
          <Link className="btn btn-primary" to="/day/1">
            Passer au quiz · Module 1
          </Link>
        </div>
      </header>

      <nav id="course-toc" className="card-panel course-toc" aria-label="Sommaire du cours">
        <h2 style={{ fontSize: '1.1rem' }}>Sommaire</h2>
        <ol className="course-toc-list">
          {COURSE_SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>
                <span className="muted" style={{ fontWeight: 600 }}>
                  {s.moduleHint}
                </span>{' '}
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {COURSE_SECTIONS.map((section) => (
        <section key={section.id} id={section.id} className="card-panel course-section">
          <div className="meta-row" style={{ marginBottom: '0.35rem' }}>
            <span className="pill">{section.moduleHint}</span>
          </div>
          <h2 style={{ fontSize: '1.25rem' }}>{section.title}</h2>
          <p className="course-lead">{section.lead}</p>
          <ul className="course-points">
            {section.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          {section.remember ? (
            <p className="course-remember">
              <strong>À retenir : </strong>
              {section.remember}
            </p>
          ) : null}
        </section>
      ))}

      <section className="card-panel" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Prêt pour le quiz ?</h2>
        <p>
          {MODULE_COUNT} modules · questions à choix multiples avec explications après chaque
          réponse.
        </p>
        <div className="actions" style={{ justifyContent: 'center' }}>
          <Link className="btn btn-primary" to="/day/1">
            Commencer le module 1
          </Link>
          <Link className="btn btn-secondary" to="/">
            Retour à l’accueil
          </Link>
        </div>
      </section>
    </div>
  )
}
