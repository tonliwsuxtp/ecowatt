import { useNavigate, useOutletContext } from 'react-router-dom'
import type { OutletCtx } from '../layout/Layout'
import { MenuSVG } from './Icons'

interface PageHeaderProps { title: string; showBack?: boolean }

export function PageHeader({ title, showBack }: PageHeaderProps) {
  const { openMenu } = useOutletContext<OutletCtx>()
  const navigate = useNavigate()

  return (
    <div className="flex items-center gap-2 mb-1">
      <button
        onClick={openMenu}
        className="flex md:hidden items-center justify-center bg-white/50 border-none cursor-pointer w-[38px] h-[38px] rounded-[10px] text-[#1a2a4a] flex-shrink-0 transition-colors duration-[150ms] hover:bg-white/75"
      >
        <MenuSVG />
      </button>
      <h2 className="flex-1 text-[22px] font-bold text-[#1a2a4a]">{title}</h2>
      {showBack ? (
        <button
          onClick={() => navigate(-1)}
          className="flex md:hidden items-center justify-center bg-white/50 border-none cursor-pointer w-[38px] h-[38px] rounded-[10px] text-[#1a2a4a] flex-shrink-0 transition-colors duration-[150ms] hover:bg-white/75"
          aria-label="ย้อนกลับ"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : (
        <div className="w-9" />
      )}
    </div>
  )
}
