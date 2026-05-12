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
    <div
      className="max-w-[1150px] mx-auto pt-12 px-[18px] pb-8 md:pt-9 md:px-5 md:pb-5 flex flex-col gap-5"
      style={{ fontSize: largeText ? fontSize + 2 : fontSize }}
    >
      <PageHeader title="ฟังก์ชันสำหรับผู้พิการ" />

      <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <h3 className="text-[15px] font-bold text-[#333] mb-3">การแสดงผล</h3>
        {[
          { label: 'ตัวอักษรขนาดใหญ่', sub: 'เพิ่มขนาดตัวอักษร',   val: largeText,    set: setLargeText },
          { label: 'คอนทราสต์สูง',     sub: 'เพิ่มความคมชัดของสี', val: highContrast, set: setHighContrast },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-3 py-3 border-b border-[#f0f4f8]">
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#222]">{item.label}</p>
              <p className="text-xs text-[#888] mt-0.5">{item.sub}</p>
            </div>
            <Toggle checked={item.val} onChange={item.set} />
          </div>
        ))}
        <div className="pt-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-[#222]">ขนาดตัวอักษร</span>
            <span className="font-bold text-sm text-[#4A9EE8]">{fontSize}px</span>
          </div>
          <input
            type="range"
            min={12}
            max={24}
            value={fontSize}
            onChange={e => setFontSize(+e.target.value)}
            className="w-full accent-[#4A9EE8]"
          />
        </div>
      </div>

      <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <h3 className="text-[15px] font-bold text-[#333] mb-3">เสียงและการสั่น</h3>
        {[
          { label: 'อ่านออกเสียง',      sub: 'อ่านข้อความบนหน้าจอ',    val: voice,   set: setVoice },
          { label: 'การสั่นแจ้งเตือน', sub: 'สั่นเมื่อมีการแจ้งเตือน', val: vibrate, set: setVibrate },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-3 py-3 border-b border-[#f0f4f8]">
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#222]">{item.label}</p>
              <p className="text-xs text-[#888] mt-0.5">{item.sub}</p>
            </div>
            <Toggle checked={item.val} onChange={item.set} />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <h3 className="text-[15px] font-bold text-[#333] mb-3">ความช่วยเหลือ</h3>
        {[
          { label: 'คู่มือการใช้งาน', sub: 'ดูวิธีใช้แอปพลิเคชัน' },
          { label: 'ติดต่อเรา',       sub: 'โทร 1800-xxx-xxx (ฟรี)' },
          { label: 'รีเซ็ตการตั้งค่า', sub: 'คืนค่าเริ่มต้นทั้งหมด' },
        ].map((item, i, arr) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 py-3 cursor-pointer ${i < arr.length - 1 ? 'border-b border-[#f0f4f8]' : ''}`}
          >
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#222]">{item.label}</p>
              <p className="text-xs text-[#888] mt-0.5">{item.sub}</p>
            </div>
            <span className="text-[#bbb] text-xl">›</span>
          </div>
        ))}
      </div>
    </div>
  )
}
