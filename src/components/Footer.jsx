import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__disclaimer">
        <span className="footer__disclaimer-icon">ℹ</span>
        <p className="footer__disclaimer-text">
          Weather forecasts are <strong>not 100% accurate</strong>. BukidCheck is a planning aid only —
          always use your own judgment and local knowledge when making farm decisions.
        </p>
      </div>
      <p className="footer__credit">BukidCheck · Farm Task Weather Planner</p>
    </footer>
  )
}