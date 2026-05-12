import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toggle } from '../shared/Toggle'

/* ── SVG device icons ── */
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

/* ── Clock icon ── */
const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7.5" stroke="#4A9EE8" strokeWidth="1.5" fill="none" />
    <path d="M9 5v4l2.5 2.5" stroke="#4A9EE8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ── Room avatar placeholder ── */
function RoomAvatar({ src, label, selected, onClick }: {
  src: string; label: string; selected: boolean; onClick: () => void
}) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
    }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%', overflow: 'hidden',
        border: selected ? '3px solid #4A9EE8' : '3px solid transparent',
        boxShadow: selected ? '0 0 0 2px #b8d8f5' : 'none',
        background: '#ddd',
        transition: 'border 0.2s',
      }}>
        <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <span style={{
        fontSize: 12, fontWeight: selected ? 700 : 500,
        color: selected ? '#1a2a4a' : '#6a8aaa',
        textAlign: 'center', lineHeight: 1.3, maxWidth: 76,
      }}>{label}</span>
    </button>
  )
}

/* ── Types ── */
interface DeviceItem {
  id: number
  name: string
  icon: React.ReactNode
  on: boolean
}

interface Room {
  id: number
  label: string
  img: string
  devices: DeviceItem[]
}

const ROOMS: Room[] = [
  {
    id: 1,
    label: 'ห้องนั่งเล่น',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&q=60',
    devices: [
      { id: 1, name: 'เครื่องปรับอากาศ', icon: <AcIcon />,          on: false },
      { id: 2, name: 'ไฟเพดาน',          icon: <CeilingLightIcon />, on: false },
      { id: 3, name: 'ทีวี',             icon: <TvIcon />,           on: false },
      { id: 4, name: 'ปลั๊กไฟ',          icon: <PlugIcon />,         on: false },
    ],
  },
  {
    id: 2,
    label: 'ห้องนอน\nน้องฟาร์',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=60',
    devices: [
      { id: 1, name: 'เครื่องปรับอากาศ', icon: <AcIcon />,     on: false },
      { id: 2, name: 'โคมไฟหัวเตียง',   icon: <BedLampIcon />, on: false },
      { id: 3, name: 'พัดลม',            icon: <FanIcon />,     on: false },
      { id: 4, name: 'ปลั๊กไฟ',          icon: <PlugIcon />,    on: false },
    ],
  },
  {
    id: 3,
    label: 'ห้องน้ำชั้น 2',
    img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=120&q=60',
    devices: [
      { id: 1, name: 'ไฟเพดาน',          icon: <CeilingLightIcon />, on: false },
      { id: 2, name: 'ปลั๊กไฟ',          icon: <PlugIcon />,         on: false },
    ],
  },
]

export default function RemoteControlPage() {
  const navigate = useNavigate()
  const [selectedRoom, setSelectedRoom] = useState(0)
  const [rooms, setRooms] = useState<Room[]>(ROOMS)

  const toggleDevice = (deviceId: number) => {
    setRooms(prev => prev.map((r, ri) =>
      ri !== selectedRoom ? r : {
        ...r,
        devices: r.devices.map(d => d.id === deviceId ? { ...d, on: !d.on } : d),
      }
    ))
  }

  const currentDevices = rooms[selectedRoom].devices

  return (
    <div style={{
      minHeight: '100vh',
      background: '#C9E3F5',
      display: 'flex',
      flexDirection: 'column',
      padding: '36px 20px 20px',
      gap: 20,
      maxWidth: 480,
      margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%', overflow: 'hidden',
          flexShrink: 0, background: '#b8d8f5',
          border: '2px solid white',
        }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Hippo_Waterfall.jpg/240px-Hippo_Waterfall.jpg"
            alt="profile"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1a2a4a', margin: 0 }}>
          ครอบครัวหมูแด้ง
        </h2>
      </div>

      {/* Room selector */}
      <div style={{
        background: 'white',
        borderRadius: 20,
        padding: '16px 12px',
        display: 'flex',
        gap: 12,
        justifyContent: 'space-around',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
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

      {/* Device list */}
      <div style={{
        background: 'white',
        borderRadius: 20,
        padding: '8px 16px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
        {currentDevices.map((device, idx) => (
          <div key={device.id}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '16px 0',
            }}>
              {/* Icon box */}
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: '#e8f2fb',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {device.icon}
              </div>

              {/* Name */}
              <span style={{ flex: 1, fontSize: 16, fontWeight: 500, color: '#1a2a4a' }}>
                {device.name}
              </span>

              {/* Clock */}
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                <ClockIcon />
              </button>

              {/* Toggle */}
              <Toggle checked={device.on} onChange={() => toggleDevice(device.id)} />
            </div>
            {idx < currentDevices.length - 1 && (
              <div style={{ height: 1, background: '#f0f4f8' }} />
            )}
          </div>
        ))}
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          width: '100%',
          padding: '16px',
          background: 'white',
          border: '2px solid #d0e4f5',
          borderRadius: 16,
          fontSize: 17,
          fontWeight: 700,
          color: '#1a2a4a',
          cursor: 'pointer',
          marginTop: 'auto',
        }}
      >
        ย้อนกลับ
      </button>
    </div>
  )
}
