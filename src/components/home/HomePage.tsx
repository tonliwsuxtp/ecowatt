import { useNavigate, useOutletContext } from 'react-router-dom'
import type { OutletCtx } from '../layout/Layout'
import { MenuSVG } from '../shared/Icons'
// ---- Icons ----
const TrendSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 17 9 11 13 15 21 7" />
    <polyline points="14 7 21 7 21 14" />
  </svg>
)
const RemoteSVG = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="2" width="10" height="20" rx="3" />
    <circle cx="12" cy="8"  r="1.5" fill="white" stroke="none" />
    <circle cx="12" cy="13" r="1"   fill="white" stroke="none" />
    <circle cx="12" cy="17" r="1"   fill="white" stroke="none" />
    <circle cx="9"  cy="15" r="1"   fill="white" stroke="none" />
    <circle cx="15" cy="15" r="1"   fill="white" stroke="none" />
  </svg>
)
const BarSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <rect x="3"  y="13" width="4" height="8"  rx="1" fill="white" />
    <rect x="10" y="8"  width="4" height="13" rx="1" fill="white" />
    <rect x="17" y="4"  width="4" height="17" rx="1" fill="white" />
  </svg>
)
const BellSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)
const WheelchairSVG = () => (
  <svg width="38" height="38" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="10" r="6" fill="#3B7DD8" />
    <path d="M26 20 Q24 30 22 38 L30 38 L34 52" stroke="#3B7DD8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M26 28 L42 28 L46 40" stroke="#3B7DD8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="22" cy="54" r="7" stroke="#3B7DD8" strokeWidth="3.5" fill="none" />
    <circle cx="42" cy="54" r="7" stroke="#3B7DD8" strokeWidth="3.5" fill="none" />
  </svg>
)

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
