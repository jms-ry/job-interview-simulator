import { useState } from 'react'
import './LandingPage.css'

const QUESTION_OPTIONS = [
  { value: '2-3', label: '2–3 Questions', desc: 'Quick session' },
  { value: '4-5', label: '4–5 Questions', desc: 'Standard interview' },
  { value: '6',   label: '6 Questions',   desc: 'Deep dive' },
]

export default function LandingPage({ onStart }) {
  const [position, setPosition] = useState('')
  const [questionCount, setQuestionCount] = useState('')

  const canStart = position.trim().length > 0 && questionCount !== ''

  const handleStart = () => {
    if (!canStart) return
    onStart({ position: position.trim(), questionCount })
  }

  return (
    <div className="landing">
      <div className="landing__bg-grid" aria-hidden="true" />
      <div className="landing__bg-glow" aria-hidden="true" />

      <header className="landing__header">
        <div className="landing__logo">
          <span className="landing__logo-icon">◈</span>
          <span className="landing__logo-text">InterviewAI</span>
        </div>
      </header>

      <main className="landing__main">
        <div className="landing__hero">
          <div className="landing__badge">Powered by Gemini AI</div>
          <h1 className="landing__title">
            Ace Your Next<br />
            <em>Job Interview</em>
          </h1>
          <p className="landing__subtitle">
            Practice with an AI interviewer that adapts to your target role,
            rates your answers, and helps you put your best foot forward.
          </p>
        </div>

        <div className="landing__card">
          <div className="landing__card-header">
            <span className="landing__step">01</span>
            <h2 className="landing__card-title">Set up your interview</h2>
          </div>

          <div className="landing__field">
            <label className="landing__label" htmlFor="position">
              What position are you applying for?
            </label>
            <div className="landing__input-wrap">
              <input
                id="position"
                className="landing__input"
                type="text"
                placeholder="e.g. Frontend Developer, Product Manager..."
                value={position}
                onChange={e => setPosition(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && canStart && handleStart()}
                maxLength={80}
              />
              {position.trim() && (
                <span className="landing__input-check">✓</span>
              )}
            </div>
          </div>

          <div className="landing__field">
            <label className="landing__label">
              How many interview questions?
            </label>
            <div className="landing__radio-group">
              {QUESTION_OPTIONS.map(opt => (
                <label
                  key={opt.value}
                  className={`landing__radio-card ${questionCount === opt.value ? 'landing__radio-card--active' : ''}`}
                >
                  <input
                    type="radio"
                    name="questionCount"
                    value={opt.value}
                    checked={questionCount === opt.value}
                    onChange={() => setQuestionCount(opt.value)}
                  />
                  <span className="landing__radio-label">{opt.label}</span>
                  <span className="landing__radio-desc">{opt.desc}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            className={`landing__btn ${canStart ? 'landing__btn--active' : ''}`}
            onClick={handleStart}
            disabled={!canStart}
          >
            <span>Start Interview</span>
            <span className="landing__btn-arrow">→</span>
          </button>
        </div>

        <div className="landing__features">
          {[
            { icon: '◎', label: 'Role-specific questions' },
            { icon: '◈', label: 'Scored answers out of 100' },
            { icon: '◉', label: 'Instant feedback' },
          ].map(f => (
            <div key={f.label} className="landing__feature">
              <span className="landing__feature-icon">{f.icon}</span>
              <span className="landing__feature-label">{f.label}</span>
            </div>
          ))}
        </div>
      </main>

      <footer className="landing__footer">
        <p>Practice makes perfect</p>
      </footer>
    </div>
  )
}