import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../sidebar/Sidebar'

export interface OutletCtx {
  openMenu: () => void
}

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Outlet context={{ openMenu: () => setSidebarOpen(true) } satisfies OutletCtx} />
    </div>
  )
}
