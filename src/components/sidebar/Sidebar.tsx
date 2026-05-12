import { useNavigate, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/',                                          label: 'หน้าหลัก',              icon: '🏠' },
  { path: 'components/analysis/AnalysisPage',           label: 'วิเคราะห์การใช้ไฟฟ้า',  icon: '📊' },
  { path: 'components/remote/RemotePage',               label: 'รีโมทควบคุมอุปกรณ์',    icon: '🎮' },
  { path: 'components/summary/SummaryPage',             label: 'สรุปผล',                 icon: '📋' },
  { path: 'components/alerts/AlertsPage',               label: 'ตั้งค่าการแจ้งเตือน',    icon: '🔔' },
  { path: 'components/accessibility/AccessibilityPage', label: 'ฟังก์ชันสำหรับผู้พิการ', icon: '♿' },
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
      {/* Overlay — mobile only */}
      <div
        className={`fixed inset-0 bg-black/45 z-[200] transition-opacity duration-[250ms] md:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside
        className={`fixed md:static top-0 left-0 w-[270px] md:w-[260px] max-w-[80vw] md:max-w-none h-full md:h-screen flex-shrink-0 bg-[#1a2a4a] flex flex-col overflow-y-auto shadow-[2px_0_12px_rgba(0,0,0,0.15)] z-[300] md:z-[100] transition-transform duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between pt-[52px] md:pt-7 px-5 pb-5 border-b border-white/10">
          <div className="flex items-center gap-[10px]">
            <span className="text-[26px]">⚡</span>
            <span className="text-lg font-bold text-white tracking-[0.3px]">Ecowatt</span>
          </div>
          <button
            className="flex md:hidden items-center justify-center bg-white/10 border-none text-white w-8 h-8 rounded-lg cursor-pointer text-sm hover:bg-white/20"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.path}
              className={`flex items-center gap-[14px] px-[14px] py-[11px] rounded-[10px] border-none cursor-pointer text-sm font-medium text-left transition-[background,color] duration-[150ms] relative ${
                isActive(item.path)
                  ? 'bg-[#4A9EE8]/25 text-[#7EC8F4]'
                  : 'bg-transparent text-white/65 hover:bg-white/[0.08] hover:text-white'
              }`}
              onClick={() => { navigate(item.path); onClose() }}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {isActive(item.path) && (
                <span className="w-[7px] h-[7px] rounded-full bg-[#4A9EE8] flex-shrink-0" />
              )}
            </button>
          ))}
        </nav>

        <div className="px-5 py-4 text-[11px] text-white/30 border-t border-white/[0.08] text-center">
          v1.0.0 · Ecowatt Manager
        </div>
      </aside>
    </>
  )
}
