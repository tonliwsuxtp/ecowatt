import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../shared/PageHeader'
import { Toggle } from '../shared/Toggle'

type SoundMode = 'sound' | 'silent' | 'vibrate'
type SoundOption = 'youtube' | 'spotify' | 'apple'

const SOUND_OPTIONS: { key: SoundOption; label: string; icon: string; bg: string }[] = [
  { key: 'youtube', label: 'YouTube',     icon: '▶', bg: '#FF0000' },
  { key: 'spotify', label: 'Spotify',     icon: '♪', bg: '#1DB954' },
  { key: 'apple',   label: 'Apple Music', icon: '♫', bg: '#FC3C44' },
]

export default function AlertsPage() {
  const navigate = useNavigate()
  const [soundMode,     setSoundMode]     = useState<SoundMode>('sound')
  const [notifEnabled,  setNotifEnabled]  = useState(false)
  const [selectedSound, setSelectedSound] = useState<SoundOption>('youtube')
  const [limitAlert,    setLimitAlert]    = useState(false)

  const modeButtons: { key: SoundMode; label: string }[] = [
    { key: 'sound',   label: 'เปิดเสียง' },
    { key: 'silent',  label: 'ปิดเสียง' },
    { key: 'vibrate', label: 'สั่น' },
  ]

  return (
    <div className="flex-1 w-full max-w-[1150px] mx-auto px-5 pt-8 pb-5 flex flex-col gap-5">
      <PageHeader title="การแจ้งเตือน" showBack />

      {/* Notification Mode */}
      <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <h3 className="text-[15px] font-bold text-[#333] mb-3">โหมดแจ้งเตือน</h3>
        <div className="flex gap-[10px]">
          {modeButtons.map(btn => (
            <button
              key={btn.key}
              onClick={() => setSoundMode(btn.key)}
              className={`flex-1 py-[10px] rounded-[10px] border-[1.5px] font-semibold text-sm cursor-pointer transition-all duration-[150ms] ${
                soundMode === btn.key
                  ? 'border-[#3B7DD8] bg-[#3B7DD8] text-white'
                  : 'border-[#e0e0e0] bg-white text-[#555]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notification via Push */}
      <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <h3 className="text-[15px] font-bold text-[#333] mb-3">การแจ้งเตือน</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[#222] flex-1">ผ่าน Notification</span>
          <Toggle checked={notifEnabled} onChange={setNotifEnabled} />
        </div>
      </div>

      {/* Select Notification Sound */}
      <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <h3 className="text-[15px] font-bold text-[#333] mb-3">เลือกเสียงแจ้งเตือน</h3>
        <div className="flex flex-col gap-1">
          {SOUND_OPTIONS.map(opt => (
            <button
              key={opt.key}
              onClick={() => setSelectedSound(opt.key)}
              className={`flex items-center gap-[14px] px-[14px] py-3 rounded-[10px] border-none cursor-pointer text-left transition-colors duration-[150ms] ${
                selectedSound === opt.key ? 'bg-[#f0f6ff]' : 'bg-[#f8f8f8]'
              }`}
            >
              <span
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-base flex-shrink-0"
                style={{ background: opt.bg }}
              >
                {opt.icon}
              </span>
              <span className="text-[15px] font-medium text-[#222] flex-1">{opt.label}</span>
              {selectedSound === opt.key && (
                <span className="text-[#3B7DD8] text-lg">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Limit / Exceeded Alert */}
      <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[#222] flex-1 leading-relaxed">
            เตือนเมื่อใช้ไฟฟ้าใกล้ครบที่กำหนด<br />
            /เมื่อใช้ไฟฟ้าเกินปริมาณ
          </span>
          <Toggle checked={limitAlert} onChange={setLimitAlert} />
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-auto w-full py-4 rounded-xl border-[1.5px] border-[#3B7DD8] bg-white text-[#1a2a4a] text-[17px] font-bold cursor-pointer transition-colors duration-[150ms] hover:bg-[#f0f6ff]"
      >
        ย้อนกลับ
      </button>
    </div>
  )
}
