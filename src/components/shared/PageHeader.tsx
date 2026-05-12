import { useNavigate, useOutletContext } from 'react-router-dom'
import { PATHS } from '../../routes/paths'
import type { OutletCtx } from '../layout/Layout'
import { MenuSVG } from './Icons'

interface PageHeaderProps { title: string }

export function PageHeader({ title }: PageHeaderProps) {
  const navigate = useNavigate()
  const { openMenu } = useOutletContext<OutletCtx>()

  return (
    <div className="page-header">
      <button onClick={() => navigate(PATHS.HOME)} className="back-btn">‹</button>
      <h2 className="page-title">{title}</h2>
      <button onClick={openMenu} className="icon-btn"><MenuSVG /></button>
    </div>
  )
}
