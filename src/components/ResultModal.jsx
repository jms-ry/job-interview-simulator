import { useState, useEffect } from 'react'
import './ResultModal.css'

const LOADING_STEPS = [
  { icon: '🌤', text: 'Fetching weather forecast...'         },
  { icon: '🌡', text: 'Reading temperature & humidity...'    },
  { icon: '💨', text: 'Checking wind conditions...'          },
  { icon: '🌧', text: 'Analyzing rain probability...'        },
  { icon: '🌾', text: 'Evaluating task feasibility...'       },
  { icon: '✅', text: 'Preparing your recommendation...'     },
]

const DUMMY_RESULT = {
  verdict: 'risky',
  verdictLabel: 'Risky — Proceed with Caution',
  verdictSub: 'Rain expected within your activity window',
  bestTime: '2:00 PM – 5:00 PM',
  bestTimeSub: 'Rain clears after 1 PM. Low wind (8 km/h), humidity drops to 58% — better conditions ahead.',
  hourly: [
    { time: '9 AM',  icon: '⛅', temp: 29, rain: 12, level: 'ok'   },
    { time: '10 AM', icon: '🌦', temp: 28, rain: 48, level: 'warn' },
    { time: '11 AM', icon: '🌧', temp: 26, rain: 82, level: 'bad'  },
    { time: '12 PM', icon: '🌦', temp: 27, rain: 55, level: 'warn' },
    { time: '1 PM',  icon: '🌤', temp: 30, rain: 10, level: 'ok'   },
  ],
  factors: [
    { icon: '🌧', label: 'Rain',     value: '82%',    level: 'bad'  },
    { icon: '💨', label: 'Wind',     value: '18km/h', level: 'warn' },
    { icon: '💧', label: 'Humidity', value: '74%',    level: 'warn' },
    { icon: '🌡', label: 'Temp',     value: '29°C',   level: 'ok'   },
  ],
  tips: [
    { icon: '🕐', text: 'Wait until 2 PM when rain clears — spraying during or before rain wastes pesticide and increases chemical runoff.' },
    { icon: '💨', text: 'Spray when wind is below 15 km/h to prevent pesticide drift away from target crops.' },
    { icon: '🧴', text: 'If spraying now is necessary, use a systemic pesticide that absorbs before rain arrives.' },
  ],
}

const VERDICT_CONFIG = {
  good:  { emoji: '✅', className: 'good'  },
  risky: { emoji: '⚠️', className: 'risky' },
  bad:   { emoji: '❌', className: 'bad'   },
}

export default function ResultModal({ task, duration, startTime, startMode, onClose }) {
  const [loading, setLoading] = useState(true)
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const stepDuration = 5200 / LOADING_STEPS.length
    const stepInterval = setInterval(() => {
      setStepIndex(prev => {
        const next = prev + 1
        if (next >= LOADING_STEPS.length) {
          clearInterval(stepInterval)
          return prev
        }
        return next
      })
    }, stepDuration)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    const doneTimer = setTimeout(() => {
      setLoading(false)
    }, 5200)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
      clearTimeout(doneTimer)
    }
  }, [])

  const result = DUMMY_RESULT
  const config = VERDICT_CONFIG[result.verdict]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>

        <div className="modal__header">
          <div className="modal__task-info">
            <span className="modal__task-name">{task}</span>
            <span className="modal__task-duration">
              · {duration} hrs
              · {startMode === 'now' ? 'Starting now' : `Starting at ${new Date(`1970-01-01T${startTime}`).toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit', hour12: true })}`}
            </span>
          </div>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>

        {loading ? (
          <div className="modal__loading">
            <span className="modal__loading-icon">
              {LOADING_STEPS[stepIndex].icon}
            </span>
            <p className="modal__loading-text" key={stepIndex}>
              {LOADING_STEPS[stepIndex].text}
            </p>
            <div className="modal__progress-wrap">
              <div
                className="modal__progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="modal__progress-label">{progress}%</span>
            <p className="modal__loading-sub">
              Analyzing weather for your farm task...
            </p>
          </div>
        ) : (
          <div className="modal__scroll">

            <div className={`modal__verdict modal__verdict--${config.className}`}>
              <div className={`modal__verdict-icon modal__verdict-icon--${config.className}`}>
                {config.emoji}
              </div>
              <div>
                <div className="modal__verdict-title">{result.verdictLabel}</div>
                <div className="modal__verdict-sub">{result.verdictSub}</div>
              </div>
            </div>

            <div className="modal__section">
              <div className="modal__section-label">Hourly Forecast</div>
              <div className="modal__hour-strip">
                {result.hourly.map((h, i) => (
                  <div key={i} className={`modal__hour modal__hour--${h.level}`}>
                    <div className="modal__hour-time">{h.time}</div>
                    <div className="modal__hour-icon">{h.icon}</div>
                    <div className="modal__hour-temp">{h.temp}°</div>
                    <div className={`modal__hour-rain modal__hour-rain--${h.level}`}>{h.rain}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal__factors">
              {result.factors.map((f, i) => (
                <div key={i} className="modal__factor">
                  <div className="modal__factor-icon">{f.icon}</div>
                  <div className="modal__factor-label">{f.label}</div>
                  <div className="modal__factor-value">{f.value}</div>
                  <div className={`modal__factor-badge modal__factor-badge--${f.level}`}>
                    {f.level === 'ok' ? 'Good' : f.level === 'warn' ? 'Moderate' : 'High'}
                  </div>
                </div>
              ))}
            </div>

            <div className={`modal__best-time modal__best-time--${result.verdict}`}>
              <span className="modal__best-time-icon">💡</span>
              <div>
                <div className="modal__best-time-title">Best window today: {result.bestTime}</div>
                <div className="modal__best-time-sub">{result.bestTimeSub}</div>
              </div>
            </div>

            <div className="modal__tips">
              <div className="modal__section-label">Farming Tips</div>
              {result.tips.map((tip, i) => (
                <div key={i} className="modal__tip">
                  <span className="modal__tip-icon">{tip.icon}</span>
                  <span className="modal__tip-text">{tip.text}</span>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  )
}