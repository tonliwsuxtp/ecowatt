import { useNavigate, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/',                                          label: 'หน้าหลัก',              icon: '🏠' },
  { path: 'components/analysis/AnalysisPage',           label: 'วิเคราะห์การใช้ไฟฟ้า',  icon: '📊' },
  { path: 'components/remote/RemotePage',               label: 'รีโมทควบคุมอุปกรณ์',    icon: '🎮' },
  { path: 'components/summary/SummaryPage',             label: 'สรุปผล',                 icon: '📋' },
  { path: 'components/alerts/AlertsPage',               label: 'ตั้งค่าการแจ้งเตือน',    icon: '🔔' },
  { path: 'components/accessibility/AccessibilityPage', label: 'ฟังก์ชันสำหรับผู้พิการ', icon: '♿' },
  { path: 'components/author/AuthorPage',               label: 'เกี่ยวกับผู้พัฒนา',      icon: '👤' },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith('/' + path)

  return (
    <>
      <div className={`sidebar-overlay${open ? ' visible' : ''}`} onClick={onClose} />

      <aside className={`sidebar${open ? ' open' : ''}`}>
        <div className="sidebar-head">
          <div className="sidebar-logo">
            <span className="sidebar-logo-icon">⚡</span>
            <span className="sidebar-logo-text">Ecowatt</span>
          </div>
          <button className="sidebar-close-btn" onClick={onClose}>✕</button>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.path}
              className={`sidebar-item${isActive(item.path) ? ' active' : ''}`}
              onClick={() => { navigate(item.path); onClose() }}
            >
              <span className="sidebar-item-icon">{item.icon}</span>
              <span className="sidebar-item-label">{item.label}</span>
              {isActive(item.path) && <span className="sidebar-active-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">v1.0.0 · Ecowatt Manager</div>
      </aside>
    </>
  )
}
