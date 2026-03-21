import { useState } from 'react'
import LandingPage from './components/LandingPage'
import InterviewModal from './components/InterviewModal'
import './App.css'

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [interviewConfig, setInterviewConfig] = useState(null)

  const handleStartInterview = (config) => {
    setInterviewConfig(config)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setInterviewConfig(null)
  }

  return (
    <div className="app">
      <LandingPage onStart={handleStartInterview} />
      {modalOpen && (
        <InterviewModal
          config={interviewConfig}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default App