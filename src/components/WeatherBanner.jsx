import './WeatherBanner.css'

const DUMMY = {
  temp: 29,
  feelsLike: 32,
  description: 'Partly Cloudy',
  icon: '⛅',
  humidity: 74,
  wind: 12,
  rain: 15,
  date: 'Wednesday, March 26 · 9:00 AM',
}

export default function WeatherBanner() {
  return (
    <div className="weather">
      <div className="weather__left">
        <span className="weather__icon">{DUMMY.icon}</span>
        <div>
          <div className="weather__temp">{DUMMY.temp}°C</div>
          <div className="weather__desc">
            {DUMMY.description} · Feels like {DUMMY.feelsLike}°C
          </div>
          <div className="weather__date">{DUMMY.date}</div>
        </div>
      </div>
      <div className="weather__stats">
        <div className="weather__stat">
          <span className="weather__stat-icon">💧</span>
          <div>
            <div className="weather__stat-label">Humidity</div>
            <div className="weather__stat-val">{DUMMY.humidity}%</div>
          </div>
        </div>
        <div className="weather__stat">
          <span className="weather__stat-icon">💨</span>
          <div>
            <div className="weather__stat-label">Wind</div>
            <div className="weather__stat-val">{DUMMY.wind} km/h</div>
          </div>
        </div>
        <div className="weather__stat">
          <span className="weather__stat-icon">🌧</span>
          <div>
            <div className="weather__stat-label">Rain</div>
            <div className="weather__stat-val">{DUMMY.rain}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}