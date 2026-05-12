import { useNavigate, useOutletContext } from 'react-router-dom'
import type { OutletCtx } from '../layout/Layout'
import { MenuSVG } from './Icons'

interface PageHeaderProps { title: string; showBack?: boolean }

export function PageHeader({ title, showBack }: PageHeaderProps) {
  const { openMenu } = useOutletContext<OutletCtx>()
  const navigate = useNavigate()

  return (
    <div className="page-header">
      {showBack ? (
        <button onClick={() => navigate(-1)} className="icon-btn" aria-label="ย้อนกลับ">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : (
        <div style={{ width: 36 }} />
      )}
      <h2 className="page-title">{title}</h2>
      <button onClick={openMenu} className="icon-btn"><MenuSVG /></button>
    </div>
  )
}
