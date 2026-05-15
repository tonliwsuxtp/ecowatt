import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toggle } from '../shared/Toggle'
import { fetchRooms, type Room } from '../../api/mockApi'
import { LoadingSpinner, ErrorState } from '../shared/LoadingSpinner'

const AcIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="2" y="8" width="24" height="12" rx="4" stroke="#4A9EE8" strokeWidth="2" fill="none" />
    <line x1="7" y1="14" x2="21" y2="14" stroke="#4A9EE8" strokeWidth="2" strokeLinecap="round" />
    <line x1="10" y1="11" x2="10" y2="17" stroke="#4A9EE8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="14" y1="11" x2="14" y2="17" stroke="#4A9EE8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="11" x2="18" y2="17" stroke="#4A9EE8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="9" y1="20" x2="7" y2="24" stroke="#4A9EE8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="14" y1="20" x2="14" y2="24" stroke="#4A9EE8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="19" y1="20" x2="21" y2="24" stroke="#4A9EE8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const CeilingLightIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 3v3" stroke="#4A9EE8" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 6h12l-2 8H10L8 6z" stroke="#4A9EE8" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M10 14h8" stroke="#4A9EE8" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 17l-1.5 4h7L16 17" stroke="#4A9EE8" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    <path d="M11.5 21h5" stroke="#4A9EE8" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const TvIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="2" y="5" width="24" height="16" rx="3" stroke="#4A9EE8" strokeWidth="2" fill="none" />
    <line x1="14" y1="21" x2="14" y2="25" stroke="#4A9EE8" strokeWidth="2" strokeLinecap="round" />
    <line x1="9" y1="25" x2="19" y2="25" stroke="#4A9EE8" strokeWidth="2" strokeLinecap="round" />
    <circle cx="14" cy="13" r="4" stroke="#4A9EE8" strokeWidth="1.5" fill="none" />
  </svg>
)

const PlugIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="6" y="8" width="16" height="12" rx="3" stroke="#4A9EE8" strokeWidth="2" fill="none" />
    <circle cx="10" cy="14" r="1.5" fill="#4A9EE8" />
    <circle cx="18" cy="14" r="1.5" fill="#4A9EE8" />
    <line x1="10" y1="4" x2="10" y2="8" stroke="#4A9EE8" strokeWidth="2" strokeLinecap="round" />
    <line x1="18" y1="4" x2="18" y2="8" stroke="#4A9EE8" strokeWidth="2" strokeLinecap="round" />
    <line x1="14" y1="20" x2="14" y2="25" stroke="#4A9EE8" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const BedLampIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <line x1="14" y1="25" x2="14" y2="15" stroke="#4A9EE8" strokeWidth="2" strokeLinecap="round" />
    <path d="M7 15h14" stroke="#4A9EE8" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 15L11 7h6l2 8H9z" stroke="#4A9EE8" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <line x1="9" y1="25" x2="19" y2="25" stroke="#4A9EE8" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const FanIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="2.5" fill="#4A9EE8" />
    <path d="M14 11.5C14 8 16 5 19 5s4 3 2 5.5c-1 1.3-3.5 1-5 1" stroke="#4A9EE8" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M16.2 14.8C19 16.5 21 19 19.5 21.5S15.5 23 14 20.5c-.8-1.5.2-3.8 1.2-5" stroke="#4A9EE8" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M11.8 14.8C9 16.5 6.5 16 5.5 13.5S6.5 9 9.5 9.5c1.6.3 2.8 2.5 2.8 4" stroke="#4A9EE8" strokeWidth="1.8" strokeLinecap="round" fill="none" />
  </svg>
)

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7.5" stroke="#4A9EE8" strokeWidth="1.5" fill="none" />
    <path d="M9 5v4l2.5 2.5" stroke="#4A9EE8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const DEVICE_ICON_MAP: Record<string, React.ComponentType> = {
  'เครื่องปรับอากาศ': AcIcon,
  'ไฟเพดาน':          CeilingLightIcon,
  'ทีวี':             TvIcon,
  'ปลั๊กไฟ':          PlugIcon,
  'โคมไฟหัวเตียง':   BedLampIcon,
  'พัดลม':            FanIcon,
}

function RoomAvatar({ src, label, selected, onClick }: {
  src: string; label: string; selected: boolean; onClick: () => void
}) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5 bg-transparent border-none cursor-pointer p-0">
      <div className={`w-[72px] h-[72px] rounded-full overflow-hidden bg-[#ddd] transition-[border] duration-200 ${selected ? 'border-[3px] border-[#4A9EE8] shadow-[0_0_0_2px_#b8d8f5]' : 'border-[3px] border-transparent'}`}>
        <img src={src} alt={label} className="w-full h-full object-cover" />
      </div>
      <span className={`text-xs text-center leading-[1.3] max-w-[76px] ${selected ? 'font-bold text-[#1a2a4a]' : 'font-medium text-[#6a8aaa]'}`}>
        {label}
      </span>
    </button>
  )
}

export default function RemoteControlPage() {
  const navigate = useNavigate()
  const [rooms, setRooms]           = useState<Room[]>([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState<string | null>(null)
  const [selectedRoom, setSelectedRoom] = useState(0)

  const load = () => {
    setLoading(true)
    setError(null)
    fetchRooms()
      .then(res => { setRooms(res); setLoading(false) })
      .catch(() => { setError('โหลดข้อมูลอุปกรณ์ไม่สำเร็จ'); setLoading(false) })
  }

  useEffect(() => { load() }, [])

  const toggleDevice = (deviceId: number) => {
    setRooms(prev => prev.map((r, ri) =>
      ri !== selectedRoom ? r : {
        ...r,
        devices: r.devices.map(d => d.id === deviceId ? { ...d, on: !d.on } : d),
      }
    ))
  }

  const currentDevices = rooms[selectedRoom]?.devices ?? []

  return (
    <div className="min-h-screen bg-[#C9E3F5] flex flex-col gap-5 px-5 pt-9 pb-5 max-w-[480px] mx-auto">

      <div className="flex items-center gap-[14px]">
        <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-[#b8d8f5] border-2 border-white">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Hippo_Waterfall.jpg/240px-Hippo_Waterfall.jpg"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-[#1a2a4a] m-0">ครอบครัวหมูแด้ง</h2>
      </div>

      {loading && (
        <div className="bg-white rounded-[20px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className="bg-white rounded-[20px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <ErrorState message={error} onRetry={load} />
        </div>
      )}

      {!loading && !error && rooms.length > 0 && <>
        <div className="bg-white rounded-[20px] px-3 py-4 flex gap-3 justify-around shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          {rooms.map((room, idx) => (
            <RoomAvatar
              key={room.id}
              src={room.img}
              label={room.label}
              selected={selectedRoom === idx}
              onClick={() => setSelectedRoom(idx)}
            />
          ))}
        </div>

        <div className="bg-white rounded-[20px] px-4 py-2 flex flex-col shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          {currentDevices.map((device, idx) => {
            const Icon = DEVICE_ICON_MAP[device.name] ?? PlugIcon
            return (
              <div key={device.id}>
                <div className="flex items-center gap-[14px] py-4">
                  <div className="w-[52px] h-[52px] rounded-[14px] bg-[#e8f2fb] flex items-center justify-center flex-shrink-0">
                    <Icon />
                  </div>
                  <span className="flex-1 text-base font-medium text-[#1a2a4a]">{device.name}</span>
                  <button className="bg-transparent border-none cursor-pointer p-1">
                    <ClockIcon />
                  </button>
                  <Toggle checked={device.on} onChange={() => toggleDevice(device.id)} />
                </div>
                {idx < currentDevices.length - 1 && <div className="h-px bg-[#f0f4f8]" />}
              </div>
            )
          })}
        </div>
      </>}

      <button
        onClick={() => navigate(-1)}
        className="w-full py-4 bg-white border-2 border-[#d0e4f5] rounded-2xl text-[17px] font-bold text-[#1a2a4a] cursor-pointer mt-auto"
      >
        ย้อนกลับ
      </button>
    </div>
  )
}
