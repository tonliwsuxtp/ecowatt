import { useNavigate, useOutletContext } from 'react-router-dom'
import type { OutletCtx } from '../layout/Layout'
import { MenuSVG } from '../shared/Icons'
import { TrendSVG, RemoteSVG, BarSVG, BellSVG, WheelchairSVG } from '../icon'

// ---- Circular Progress ----
function CircularProgress({ percent, color, label }: { percent: number; color: string; label: string }) {
  const r      = 52
  const circ   = 2 * Math.PI * r
  const offset = circ * (1 - percent / 100)
  return (
    <div className="progress-item">
      <div className="progress-ring-wrap">
        <svg width="130" height="130" viewBox="0 0 130 130">
          <circle cx="65" cy="65" r={r} fill="none" stroke="#D4E9F7" strokeWidth="10" />
          <circle cx="65" cy="65" r={r} fill="none" stroke={color} strokeWidth="10"
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round" transform="rotate(-90 65 65)" />
        </svg>
        <div className="progress-center-text">{percent} %</div>
      </div>
      <p className="progress-desc">{label}</p>
    </div>
  )
}

// ---- Menu config ----
const HOME_MENUS: { path: string; lines: string[]; icon: React.ReactNode }[] = [
  { path: 'components/analysis/AnalysisPage',      lines: ['วิเคราะห์ /', 'จัดการการใช้ไฟฟ้า'], icon: <TrendSVG /> },
  { path: 'components/remote/RemotePage',          lines: ['รีโมทควบคุม', 'อุปกรณ์'],          icon: <RemoteSVG /> },
  { path: 'components/summary/SummaryPage',        lines: ['สรุปผล'],                           icon: <BarSVG /> },
  { path: 'components/alerts/AlertsPage',          lines: ['ตั้งค่าการแจ้งเตือน'],              icon: <BellSVG /> },
]

export default function HomePage() {
  const { openMenu } = useOutletContext<OutletCtx>()
  const navigate = useNavigate()

  return (
    <div className="screen">
      <div className="home-top-bar">
        <button className="icon-btn" onClick={openMenu}><MenuSVG /></button>
        <h1 className="app-title">Ecowatt Manager</h1>
        <div style={{ width: 38 }} />
      </div>

      <div className="progress-row">
        <CircularProgress percent={24} color="#4A9EE8" label="วันนี้ใช้ไฟแล้ว" />
        <CircularProgress percent={56} color="#5BC4B5" label="เดือนนี้ใช้ไฟแล้ว" />
      </div>

      <div className="menu-grid">
        {HOME_MENUS.map(m => (
          <button key={m.path} className="card menu-card" onClick={() => navigate(m.path)}>
            <div className="menu-icon-box">{m.icon}</div>
            <span className="menu-label">
              {m.lines.map((line, i) => (
                <span key={i}>{line}{i < m.lines.length - 1 && <br />}</span>
              ))}
            </span>
          </button>
        ))}
      </div>

      <button className="card access-card" onClick={() => navigate('components/accessibility/AccessibilityPage')}>
        <WheelchairSVG />
        <span className="access-label">ฟังก์ชันสำหรับผู้พิการ</span>
      </button>
    </div>
  )
}
