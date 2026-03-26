import { useState, useEffect } from 'react'
import './TaskSelector.css'

const TASKS = [
  { id: 'transplanting',       emoji: '🌱', name: 'Transplanting',       category: 'Planting'     },
  { id: 'seed-sowing',         emoji: '🫘', name: 'Seed Sowing',         category: 'Planting'     },
  { id: 'pesticide-spraying',  emoji: '🧴', name: 'Pesticide Spraying',  category: 'Crop Care'    },
  { id: 'fertilizer-applying', emoji: '🌿', name: 'Fertilizer Applying', category: 'Crop Care'    },
  { id: 'irrigation',          emoji: '💧', name: 'Irrigation',          category: 'Crop Care'    },
  { id: 'rice-harvesting',     emoji: '🌾', name: 'Rice Harvesting',     category: 'Harvesting'   },
  { id: 'fruit-picking',       emoji: '🍅', name: 'Fruit Picking',       category: 'Harvesting'   },
  { id: 'plowing',             emoji: '🚜', name: 'Plowing',             category: 'Soil Work'    },
  { id: 'composting',          emoji: '♻️', name: 'Composting',          category: 'Soil Work'    },
  { id: 'sun-drying',          emoji: '☀️', name: 'Sun Drying Grains',   category: 'Post-harvest' },
  { id: 'threshing',           emoji: '🌀', name: 'Threshing',           category: 'Post-harvest' },
  { id: 'grazing',             emoji: '🐄', name: 'Livestock Grazing',   category: 'Livestock'    },
]

const DURATIONS = [
  { value: '1-2', label: '1–2 hrs', sub: 'Short'    },
  { value: '3-5', label: '3–5 hrs', sub: 'Half day' },
  { value: '6-8', label: '6–8 hrs', sub: 'Full day' },
]

function getNowTimeValue() {
  const now = new Date()
  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

function getMinTime() {
  return getNowTimeValue()
}

export default function TaskSelector({ onCheck, disabled }) {
  const [selectedTask, setSelectedTask] = useState(null)
  const [customTask, setCustomTask] = useState('')
  const [duration, setDuration] = useState(null)
  const [startMode, setStartMode] = useState('now')
  const [customTime, setCustomTime] = useState('')
  const [minTime, setMinTime] = useState(getMinTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setMinTime(getMinTime())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const activeTask = customTask.trim() || selectedTask
  const canCheck = activeTask && duration && (startMode === 'now' || customTime !== '')

  const handleCheck = () => {
    if (!canCheck) return
    const startTime = startMode === 'now' ? getNowTimeValue() : customTime
    onCheck({
      task: customTask.trim() || TASKS.find(t => t.id === selectedTask)?.name || selectedTask,
      duration,
      startTime,
      startMode,
    })
  }

  const handleCustomChange = (e) => {
    setCustomTask(e.target.value)
    if (e.target.value.trim()) setSelectedTask(null)
  }

  const handleTaskSelect = (id) => {
    setSelectedTask(id)
    setCustomTask('')
  }

  const handleTimeChange = (e) => {
    const val = e.target.value
    if (val < minTime) return
    setCustomTime(val)
  }

  const handleStartModeChange = (mode) => {
    setStartMode(mode)
    if (mode === 'now') setCustomTime('')
  }

  return (
    <div className="task-selector">

      <div className="task-selector__section-label">Select Farm Task</div>

      <div className="task-selector__grid">
        {TASKS.map(task => (
          <button
            key={task.id}
            className={`task-card ${selectedTask === task.id ? 'task-card--active' : ''}`}
            onClick={() => handleTaskSelect(task.id)}
          >
            <span className="task-card__emoji">{task.emoji}</span>
            <span className="task-card__name">{task.name}</span>
            <span className="task-card__category">{task.category}</span>
          </button>
        ))}
      </div>

      <div className="task-selector__custom">
        <div className="task-selector__custom-field">
          <span className="task-selector__custom-icon">✏️</span>
          <input
            className="task-selector__custom-input"
            type="text"
            placeholder="Or type a custom farm task..."
            value={customTask}
            onChange={handleCustomChange}
            maxLength={80}
          />
        </div>
      </div>

      <div className="task-selector__duration-label">Estimated Duration</div>
      <div className="task-selector__duration-row">
        {DURATIONS.map(d => (
          <button
            key={d.value}
            className={`duration-btn ${duration === d.value ? 'duration-btn--active' : ''}`}
            onClick={() => setDuration(d.value)}
          >
            <span className="duration-btn__label">{d.label}</span>
            <span className="duration-btn__sub">{d.sub}</span>
          </button>
        ))}
      </div>

      <div className="task-selector__time-label">Start Time</div>
      <div className="task-selector__time-row">
        <button
          className={`time-btn ${startMode === 'now' ? 'time-btn--active' : ''}`}
          onClick={() => handleStartModeChange('now')}
        >
          <span className="time-btn__icon">⚡</span>
          <span className="time-btn__label">Now</span>
        </button>

        <div
          className={`time-btn time-btn--custom-wrap ${startMode === 'custom' ? 'time-btn--active' : ''}`}
          onClick={() => handleStartModeChange('custom')}
        >
          <span className="time-btn__icon">🕐</span>
          {startMode === 'custom' ? (
            <input
              className="time-btn__custom-input"
              type="time"
              value={customTime}
              min={minTime}
              onChange={handleTimeChange}
              onClick={e => e.stopPropagation()}
              autoFocus
            />
          ) : (
            <span className="time-btn__label">Custom</span>
          )}
        </div>
      </div>

      {startMode === 'custom' && customTime && (
        <p className="task-selector__time-preview">
          Task starts at {new Date(`1970-01-01T${customTime}`).toLocaleTimeString('en-PH', {
            hour: 'numeric', minute: '2-digit', hour12: true,
          })}
        </p>
      )}

      <button
        className={`task-selector__cta ${canCheck && !disabled ? 'task-selector__cta--active' : ''}`}
        onClick={handleCheck}
        disabled={!canCheck || disabled}
      >
        <span>Check Task Feasibility</span>
        <span className="task-selector__cta-arrow">→</span>
      </button>

      {disabled && (
        <p className="task-selector__disabled-hint">
          ⬆ Enter your location first to check task feasibility
        </p>
      )}

    </div>
  )
}