import { useState } from 'react'
import Header from './components/Header'
import WeatherBanner from './components/WeatherBanner'
import TaskSelector from './components/TaskSelector'
import ResultModal from './components/ResultModal'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [duration, setDuration] = useState(null)

  const handleCheck = ({ task, duration }) => {
    setSelectedTask(task)
    setDuration(duration)
    setModalOpen(true)
  }

  return (
    <div className="app">
      <div className="app__inner">
        <Header />
        <main className="app__main">
          <WeatherBanner />
          <TaskSelector onCheck={handleCheck} />
        </main>
        <Footer />
        {modalOpen && (
          <ResultModal
            task={selectedTask}
            duration={duration}
            onClose={() => setModalOpen(false)}
          />
        )}
      </div>
    </div>
  )
}

export default App