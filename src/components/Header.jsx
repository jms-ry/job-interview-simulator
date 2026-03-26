import { useState } from 'react'
import './Header.css'

export default function Header() {
  const [location, setLocation] = useState('')

  return (
    <header className="header">
      <div className="header__logo">
        <div className="header__logo-icon">🌾</div>
        <div className="header__logo-wrap">
          <span className="header__logo-text">BukidCheck</span>
          <span className="header__logo-tagline">Farm Task Weather Planner</span>
        </div>
      </div>
      <div className="header__location-input">
        <span className="header__location-icon">📍</span>
        <input
          className="header__location-field"
          type="text"
          placeholder="Enter your location..."
          value={location}
          onChange={e => setLocation(e.target.value)}
          maxLength={80}
        />
      </div>
    </header>
  )
}