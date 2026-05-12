import { useState } from 'react'
import { PageHeader } from '../shared/PageHeader'
import { Toggle } from '../shared/Toggle'


export default function AccessibilityPage() {
  const [largeText,    setLargeText]    = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [voice,        setVoice]        = useState(false)
  const [vibrate,      setVibrate]      = useState(true)
  const [fontSize,     setFontSize]     = useState(16)

  return (
    <div className="screen" style={{ fontSize: largeText ? fontSize + 2 : fontSize }}>
      <PageHeader title="ฟังก์ชันสำหรับผู้พิการ" />

      <div className="card">
        <h3 className="section-title">การแสดงผล</h3>
        {[
          { label: 'ตัวอักษรขนาดใหญ่', sub: 'เพิ่มขนาดตัวอักษร',    val: largeText,    set: setLargeText },
          { label: 'คอนทราสต์สูง',     sub: 'เพิ่มความคมชัดของสี',  val: highContrast, set: setHighContrast },
        ].map(item => (
          <div key={item.label} className="list-row" style={{ borderBottom: '1px solid #f0f4f8' }}>
            <div className="list-text">
              <p className="list-main">{item.label}</p>
              <p className="list-sub">{item.sub}</p>
            </div>
            <Toggle checked={item.val} onChange={item.set} />
          </div>
        ))}
        <div className="slider-row" style={{ paddingTop: 12 }}>
          <div className="slider-header">
            <span className="list-main">ขนาดตัวอักษร</span>
            <span className="slider-value blue">{fontSize}px</span>
          </div>
          <input type="range" min={12} max={24} value={fontSize}
            onChange={e => setFontSize(+e.target.value)} className="slider blue-slider" />
        </div>
      </div>

      <div className="card">
        <h3 className="section-title">เสียงและการสั่น</h3>
        {[
          { label: 'อ่านออกเสียง',      sub: 'อ่านข้อความบนหน้าจอ',    val: voice,   set: setVoice },
          { label: 'การสั่นแจ้งเตือน', sub: 'สั่นเมื่อมีการแจ้งเตือน', val: vibrate, set: setVibrate },
        ].map(item => (
          <div key={item.label} className="list-row" style={{ borderBottom: '1px solid #f0f4f8' }}>
            <div className="list-text">
              <p className="list-main">{item.label}</p>
              <p className="list-sub">{item.sub}</p>
            </div>
            <Toggle checked={item.val} onChange={item.set} />
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="section-title">ความช่วยเหลือ</h3>
        {[
          { label: 'คู่มือการใช้งาน', sub: 'ดูวิธีใช้แอปพลิเคชัน' },
          { label: 'ติดต่อเรา',       sub: 'โทร 1800-xxx-xxx (ฟรี)' },
          { label: 'รีเซ็ตการตั้งค่า', sub: 'คืนค่าเริ่มต้นทั้งหมด' },
        ].map((item, i, arr) => (
          <div key={item.label} className="list-row"
            style={{ borderBottom: i < arr.length - 1 ? '1px solid #f0f4f8' : 'none', cursor: 'pointer' }}>
            <div className="list-text">
              <p className="list-main">{item.label}</p>
              <p className="list-sub">{item.sub}</p>
            </div>
            <span style={{ color: '#bbb', fontSize: 20 }}>›</span>
          </div>
        ))}
      </div>
    </div>
  )
}
