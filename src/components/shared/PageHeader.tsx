import { useOutletContext } from 'react-router-dom'
import type { OutletCtx } from '../layout/Layout'
import { MenuSVG } from './Icons'

interface PageHeaderProps { title: string }

export function PageHeader({ title }: PageHeaderProps) {
  const { openMenu } = useOutletContext<OutletCtx>()

  return (
    <div className="page-header">
      <h2 className="page-title">{title}</h2>
      <button onClick={openMenu} className="icon-btn"><MenuSVG /></button>
    </div>
  )
}
