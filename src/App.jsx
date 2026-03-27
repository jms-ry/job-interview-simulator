import { useState } from 'react'
import { Analytics } from "@vercel/analytics/react"
import Header from './components/Header'
import WeatherBanner from './components/WeatherBanner'
import TaskSelector from './components/TaskSelector'
import ResultModal from './components/ResultModal'
import Footer from './components/Footer'
import { fetchWeather } from './utils/weather'
import './App.css'

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [duration, setDuration] = useState(null)
  const [weather, setWeather] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(false)
  const [weatherError, setWeatherError] = useState(null)
  const [locationLabel, setLocationLabel] = useState('')
  const [startTime, setStartTime] = useState(null)
  const [startMode, setStartMode] = useState('now')
  const handleLocationSelect = async (location) => {
    setLocationLabel(location.shortLabel)
    setWeatherLoading(true)
    setWeatherError(null)
    try {
      const data = await fetchWeather(location.lat, location.lon)
      setWeather(data)
    } catch (e) {
      setWeatherError('Failed to fetch weather. Please try again.')
    } finally {
      setWeatherLoading(false)
    }
  }

  const handleCheck = ({ task, duration, startTime, startMode }) => {
    setSelectedTask(task)
    setDuration(duration)
    setStartTime(startTime)
    setStartMode(startMode)
    setModalOpen(true)
  }

  return (
    <div className="app">
      <div className="app__inner">
        <Analytics/>
        <Header
          onLocationSelect={handleLocationSelect}
          locationLabel={locationLabel}
        />
        <main className="app__main">
          <WeatherBanner
            weather={weather}
            loading={weatherLoading}
            error={weatherError}
            location={locationLabel}
          />
          <TaskSelector onCheck={handleCheck} disabled={!weather} />
        </main>
        <Footer />
        {modalOpen && (
          <ResultModal
            task={selectedTask}
            duration={duration}
            startTime={startTime}
            startMode={startMode}
            weather={weather}
            onClose={() => setModalOpen(false)}
          />
        )}
      </div>
    </div>
  )
}

export default App