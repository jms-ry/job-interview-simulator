import { useState, useRef, useEffect } from 'react'
import './InterviewModal.css'

const DUMMY_MESSAGES = [
  {
    id: 1,
    role: 'assistant',
    text: "Hello! I'm Alex, your AI interview coach. I'm here to help you prepare for your Frontend Developer interview. Before we begin, how are you doing today?",
  },
]

export default function InterviewModal({ config, onClose }) {
  const [messages, setMessages] = useState(DUMMY_MESSAGES)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = () => {
    const text = input.trim()
    if (!text || isTyping) return
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text }])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text: "Great! Are you ready to start your interview?",
        },
      ])
    }, 1500)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleCloseAttempt = () => {
    setShowExitConfirm(true)
  }

  const handleConfirmExit = () => {
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleCloseAttempt}>
      <div className="modal" onClick={e => e.stopPropagation()}>

        <div className="modal__header">
          <div className="modal__interviewer">
            <div className="modal__avatar">A</div>
            <div className="modal__interviewer-info">
              <span className="modal__interviewer-name">Alex</span>
              <span className="modal__interviewer-role">AI Interviewer · InterviewAI</span>
            </div>
          </div>
          <div className="modal__header-right">
            <div className="modal__position-badge">
              {config.position}
            </div>
            <button className="modal__close-btn" onClick={handleCloseAttempt} title="End interview">
              ✕
            </button>
          </div>
        </div>

        <div className="modal__progress-bar">
          <div className="modal__progress-fill" style={{ width: '0%' }} />
        </div>

        <div className="modal__messages">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`modal__message modal__message--${msg.role}`}
            >
              {msg.role === 'assistant' && (
                <div className="modal__msg-avatar">A</div>
              )}
              <div className="modal__bubble">
                <p>{msg.text}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="modal__message modal__message--assistant">
              <div className="modal__msg-avatar">A</div>
              <div className="modal__bubble modal__bubble--typing">
                <span className="modal__dot" />
                <span className="modal__dot" />
                <span className="modal__dot" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="modal__input-area">
          <textarea
            ref={inputRef}
            className="modal__textarea"
            placeholder="Type your answer..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isTyping}
          />
          <button
            className={`modal__send-btn ${input.trim() && !isTyping ? 'modal__send-btn--active' : ''}`}
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
          >
            ↑
          </button>
        </div>

      </div>

      {showExitConfirm && (
        <div className="modal-confirm-overlay" onClick={e => e.stopPropagation()}>
          <div className="modal-confirm">
            <h3 className="modal-confirm__title">End this interview?</h3>
            <p className="modal-confirm__desc">Your progress and answers will not be saved.</p>
            <div className="modal-confirm__actions">
              <button className="modal-confirm__btn modal-confirm__btn--cancel" onClick={() => setShowExitConfirm(false)}>
                Keep going
              </button>
              <button className="modal-confirm__btn modal-confirm__btn--exit" onClick={handleConfirmExit}>
                End interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}