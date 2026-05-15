import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../shared/PageHeader'
import { Toggle } from '../shared/Toggle'

type SoundMode = 'sound' | 'silent' | 'vibrate'
type SoundOption = 'youtube' | 'spotify' | 'apple'

const YouTubeIcon = () => (
  <svg viewBox="0 0 36 36" width="36" height="36">
    <rect width="36" height="36" rx="8" fill="#FF0000" />
    <path d="M27.5 18c0 2-.22 3.9-.6 5.1a2.1 2.1 0 0 1-1.48 1.48C24.2 25 18 25 18 25s-6.2 0-7.42-.42a2.1 2.1 0 0 1-1.48-1.48C8.72 21.9 8.5 20 8.5 18s.22-3.9.6-5.1a2.1 2.1 0 0 1 1.48-1.48C11.8 11 18 11 18 11s6.2 0 7.42.42a2.1 2.1 0 0 1 1.48 1.48c.38 1.2.6 3.1.6 5.1Z" fill="white" />
    <polygon points="15.5,21.5 21.5,18 15.5,14.5" fill="#FF0000" />
  </svg>
)

const SpotifyIcon = () => (
  <svg viewBox="0 0 36 36" width="36" height="36">
    <rect width="36" height="36" rx="8" fill="#1DB954" />
    <circle cx="18" cy="18" r="10" fill="#1DB954" />
    <path d="M12.5 14.5c3.1-1 6.6-.8 9.3.8" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M13.2 17.8c2.6-.8 5.5-.6 7.8.7" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M14 21c2-.6 4.3-.5 6 .5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
)

const AppleMusicIcon = () => (
  <svg viewBox="0 0 36 36" width="36" height="36">
    <defs>
      <linearGradient id="appleGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FC5C7D" />
        <stop offset="100%" stopColor="#FC3C44" />
      </linearGradient>
    </defs>
    <rect width="36" height="36" rx="8" fill="url(#appleGrad)" />
    <path d="M23 10v10.5a3.5 3.5 0 1 1-2-3.18V13l-7 1.5V23a3.5 3.5 0 1 1-2-3.18V12l11-2Z" fill="white" />
  </svg>
)

const SOUND_OPTIONS: { key: SoundOption; label: string; Icon: React.ComponentType }[] = [
  { key: 'youtube', label: 'YouTube',     Icon: YouTubeIcon },
  { key: 'spotify', label: 'Spotify',     Icon: SpotifyIcon },
  { key: 'apple',   label: 'Apple Music', Icon: AppleMusicIcon },
]

// หน้าตั้งค่าการแจ้งเตือน ครอบคลุมโหมดเสียง Push Notification เสียงแจ้งเตือน และเตือนเมื่อใช้ไฟเกินโควต้า
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
              <span className="w-9 h-9 flex-shrink-0">
                <opt.Icon />
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
            เตือนเมื่อใช้ไฟฟ้าใกล้ครบที่กำหนด
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
