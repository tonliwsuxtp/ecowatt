import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../sidebar/Sidebar'

export interface OutletCtx {
  openMenu: () => void
}

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="block md:flex h-auto md:h-screen overflow-visible md:overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 h-auto md:h-screen overflow-y-visible md:overflow-y-auto bg-[#C9E3F5]">
        <Outlet context={{ openMenu: () => setSidebarOpen(true) } satisfies OutletCtx} />
      </main>
    </div>
  )
}
