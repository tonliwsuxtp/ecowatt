import { useState } from 'react'
import { PageHeader } from '../shared/PageHeader'
import { Toggle } from '../shared/Toggle'


type AlertKey = 'daily' | 'monthly' | 'peak' | 'tip' | 'device'

const ALERT_ITEMS: { key: AlertKey; label: string; sub: string }[] = [
  { key: 'daily',   label: 'แจ้งเตือนรายวัน',      sub: 'แจ้งเตือนเวลา 20:00 น.' },
  { key: 'monthly', label: 'แจ้งเตือนรายเดือน',    sub: 'เมื่อใกล้ถึงขีดจำกัด' },
  { key: 'peak',    label: 'แจ้งเตือนช่วง Peak',   sub: '09:00 – 22:00 น.' },
  { key: 'tip',     label: 'เคล็ดลับประหยัดไฟ',    sub: 'รับเคล็ดลับประจำวัน' },
  { key: 'device',  label: 'แจ้งเตือนอุปกรณ์',     sub: 'เมื่อเปิดนานเกินไป' },
]

export default function AlertsPage() {
  const [on, setOn] = useState<Record<AlertKey, boolean>>({
    daily: true, monthly: true, peak: false, tip: true, device: false,
  })
  const [dailyLimit,   setDailyLimit]   = useState(5)
  const [monthlyLimit, setMonthlyLimit] = useState(150)

  return (
    <div className="screen">
      <PageHeader title="ตั้งค่าการแจ้งเตือน" />

      <div className="card">
        <h3 className="section-title">การแจ้งเตือน</h3>
        {ALERT_ITEMS.map(item => (
          <div key={item.key} className="list-row" style={{ borderBottom: '1px solid #f0f4f8' }}>
            <div className="list-text">
              <p className="list-main">{item.label}</p>
              <p className="list-sub">{item.sub}</p>
            </div>
            <Toggle checked={on[item.key]} onChange={v => setOn(o => ({ ...o, [item.key]: v }))} />
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="section-title">ขีดจำกัดการใช้ไฟ</h3>
        <div className="slider-row">
          <div className="slider-header">
            <span className="list-main">รายวัน (kWh)</span>
            <span className="slider-value blue">{dailyLimit} kWh</span>
          </div>
          <input type="range" min={1} max={20} value={dailyLimit}
            onChange={e => setDailyLimit(+e.target.value)} className="slider blue-slider" />
        </div>
        <div className="slider-row">
          <div className="slider-header">
            <span className="list-main">รายเดือน (kWh)</span>
            <span className="slider-value teal">{monthlyLimit} kWh</span>
          </div>
          <input type="range" min={50} max={500} step={10} value={monthlyLimit}
            onChange={e => setMonthlyLimit(+e.target.value)} className="slider teal-slider" />
        </div>
      </div>
    </div>
  )
}
