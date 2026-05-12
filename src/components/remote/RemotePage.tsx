import { useState } from 'react'
import { PageHeader } from '../shared/PageHeader'
import { Toggle } from '../shared/Toggle'


interface Device {
  id: number
  name: string
  room: string
  on: boolean
  watts: number
  emoji: string
}

const INITIAL_DEVICES: Device[] = [
  { id: 1, name: 'แอร์ห้องนอน', room: 'ห้องนอน',     on: true,  watts: 1200, emoji: '❄️' },
  { id: 2, name: 'ไฟห้องนอน',   room: 'ห้องนอน',     on: true,  watts: 60,   emoji: '💡' },
  { id: 3, name: 'พัดลม',        room: 'ห้องนั่งเล่น', on: false, watts: 45,   emoji: '🌀' },
  { id: 4, name: 'ทีวี',         room: 'ห้องนั่งเล่น', on: true,  watts: 120,  emoji: '📺' },
  { id: 5, name: 'ตู้เย็น',      room: 'ห้องครัว',    on: true,  watts: 150,  emoji: '🧊' },
  { id: 6, name: 'ไมโครเวฟ',    room: 'ห้องครัว',    on: false, watts: 800,  emoji: '🍳' },
]

export default function RemotePage() {
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES)

  const toggle = (id: number) =>
    setDevices(ds => ds.map(d => d.id === id ? { ...d, on: !d.on } : d))

  const totalWatts = devices.filter(d => d.on).reduce((s, d) => s + d.watts, 0)
  const onCount    = devices.filter(d => d.on).length

  return (
    <div className="screen">
      <PageHeader title="รีโมทควบคุมอุปกรณ์" />

      <div className="card row-between">
        <div>
          <p className="sub-label">กำลังใช้งาน</p>
          <p className="big-value blue">{totalWatts} W</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p className="sub-label">อุปกรณ์เปิดอยู่</p>
          <p className="big-value teal">{onCount}/{devices.length}</p>
        </div>
      </div>

      <div className="device-list">
        {devices.map(d => (
          <div key={d.id} className="card device-row">
            <div className="device-emoji" style={{ background: d.on ? '#4A9EE8' : '#ddd' }}>
              {d.emoji}
            </div>
            <div className="device-info">
              <p className="device-name">{d.name}</p>
              <p className="device-sub">{d.room} · {d.watts} W</p>
            </div>
            <Toggle checked={d.on} onChange={() => toggle(d.id)} />
          </div>
        ))}
      </div>
    </div>
  )
}
