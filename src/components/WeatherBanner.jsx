import './WeatherBanner.css'

export default function WeatherBanner({ weather, loading, error}) {
  if (!weather && !loading && !error) {
    return (
      <div className="weather weather--empty">
        <span className="weather__empty-icon">🌾</span>
        <div>
          <p className="weather__empty-title">Enter your location to get started</p>
          <p className="weather__empty-sub">Type your barangay, municipality, or city above</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="weather weather--loading">
        <div className="weather__skeleton weather__skeleton--icon" />
        <div className="weather__skeleton-group">
          <div className="weather__skeleton weather__skeleton--temp" />
          <div className="weather__skeleton weather__skeleton--desc" />
        </div>
        <div className="weather__skeleton-stats">
          <div className="weather__skeleton weather__skeleton--stat" />
          <div className="weather__skeleton weather__skeleton--stat" />
          <div className="weather__skeleton weather__skeleton--stat" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="weather weather--error">
        <span className="weather__empty-icon">⚠️</span>
        <div>
          <p className="weather__empty-title">Could not fetch weather</p>
          <p className="weather__empty-sub">{error}</p>
        </div>
      </div>
    )
  }

  const { current } = weather
  const now = new Date()
  const dateLabel = now.toLocaleDateString('en-PH', {
    weekday: 'long', month: 'long', day: 'numeric',
  }) + ' · ' + now.toLocaleTimeString('en-PH', {
    hour: 'numeric', minute: '2-digit', hour12: true,
  })

  return (
    <div className="weather">
      <div className="weather__left">
        <span className="weather__icon">{current.icon}</span>
        <div>
          <div className="weather__temp">{current.temp}°C</div>
          <div className="weather__desc">
            {current.description} · Feels like {current.feelsLike}°C
          </div>
          <div className="weather__date">{dateLabel}</div>
        </div>
      </div>
      <div className="weather__stats">
        <div className="weather__stat">
          <span className="weather__stat-icon">💧</span>
          <div>
            <div className="weather__stat-label">Humidity</div>
            <div className="weather__stat-val">{current.humidity}%</div>
          </div>
        </div>
        <div className="weather__stat">
          <span className="weather__stat-icon">💨</span>
          <div>
            <div className="weather__stat-label">Wind</div>
            <div className="weather__stat-val">{current.wind} km/h</div>
          </div>
        </div>
        <div className="weather__stat">
          <span className="weather__stat-icon">🌧</span>
          <div>
            <div className="weather__stat-label">Rain</div>
            <div className="weather__stat-val">{current.rain}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}