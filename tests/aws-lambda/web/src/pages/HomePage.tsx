import { Link } from 'react-router-dom'
import { DayList } from '../components/DayList'
import { ProgressBar } from '../components/ProgressBar'
import { getQuestionCounts } from '../data/questions'
import { useProgress } from '../hooks/useProgress'
import { overallStats, weakTopics } from '../lib/scoring'
import { MODULE_COUNT } from '../types/quiz'

export function HomePage() {
  const { progress, resetAll } = useProgress()
  const counts = getQuestionCounts()
  const stats = overallStats(progress, counts)
  const weak = weakTopics(progress)
  const continueDay = progress.lastActiveDay

  return (
    <div className="stack">
      <header className="hero-home">
        <div className="brand-mark" style={{ marginBottom: '1rem' }}>
          <span className="logo">λ</span>
          <span className="brand" style={{ fontSize: '1.35rem' }}>
            AWS Lambda Prep
          </span>
        </div>
        <h1 className="brand">AWS Lambda Prep</h1>
        <p className="tagline">
          Quiz interactif en français — modèle d’exécution, triggers, IAM, packaging, retries et
          observabilité, un module à la fois.
        </p>
        <div className="actions">
          {continueDay ? (
            <Link className="btn btn-primary" to={`/day/${continueDay}`}>
              Continuer · Module {continueDay}
            </Link>
          ) : (
            <Link className="btn btn-primary" to="/day/1">
              Commencer le module 1
            </Link>
          )}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              if (confirm('Réinitialiser toute la progression locale ?')) resetAll()
            }}
          >
            Réinitialiser
          </button>
        </div>
      </header>

      <section className="card-panel">
        <h2 style={{ fontSize: '1.15rem' }}>Progression globale</h2>
        <ProgressBar
          value={stats.answered}
          max={stats.totalAvailable}
          label={`${stats.answered}/${stats.totalAvailable} questions`}
        />
        <p style={{ marginTop: '0.75rem', marginBottom: 0 }}>
          {stats.daysCompleted}/{MODULE_COUNT} modules terminés · précision {stats.accuracy}%
        </p>
      </section>

      {weak.length > 0 ? (
        <section className="card-panel">
          <h2 style={{ fontSize: '1.15rem' }}>Points faibles</h2>
          <p>D’après vos réponses, renforcez :</p>
          <div className="weak-list">
            {weak.slice(0, 5).map((w) => (
              <span key={w.topic} className="weak-chip">
                {w.label} · {w.accuracy}%
              </span>
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <h2 style={{ fontSize: '1.25rem' }}>Parcours {MODULE_COUNT} modules</h2>
        <p>
          Environ 10 questions par module. Les modules 11–12 sont des examens blancs mixtes.
        </p>
        <DayList progress={progress} questionCounts={counts} />
      </section>
    </div>
  )
}
