import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../shared/PageHeader'

const AcIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="2" y="8" width="32" height="16" rx="4" stroke="#2a5298" strokeWidth="2.2" />
    <rect x="2" y="8" width="32" height="7" rx="4" fill="#2a5298" fillOpacity="0.12" />
    <line x1="8" y1="20" x2="28" y2="20" stroke="#2a5298" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="8" y1="23" x2="20" y2="23" stroke="#2a5298" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="14" y="24" width="8" height="4" rx="1" stroke="#2a5298" strokeWidth="1.8" />
  </svg>
)

const FridgeIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="6" y="2" width="24" height="32" rx="4" stroke="#2a5298" strokeWidth="2.2" />
    <line x1="6" y1="16" x2="30" y2="16" stroke="#2a5298" strokeWidth="2" />
    <line x1="16" y1="9" x2="16" y2="13" stroke="#2a5298" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="16" y1="22" x2="16" y2="28" stroke="#2a5298" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const HeaterIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="4" y="10" width="28" height="20" rx="4" stroke="#2a5298" strokeWidth="2.2" />
    <path d="M12 10 C12 6 16 6 16 3" stroke="#2a5298" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M18 10 C18 6 22 6 22 3" stroke="#2a5298" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <circle cx="18" cy="20" r="4" stroke="#2a5298" strokeWidth="1.8" />
  </svg>
)

const DEVICES = [
  { rank: 1, name: 'เครื่องปรับอากาศ', pct: 35, Icon: AcIcon },
  { rank: 2, name: 'ตู้เย็น',           pct: 25, Icon: FridgeIcon },
  { rank: 3, name: 'เครื่องทำน้ำอุ่น',  pct: 15, Icon: HeaterIcon },
]

const TIPS = [
  'ปรับแอร์ขึ้น 1-2°C (ลดการใช้พลังงานได้มาก)',
  'ตั้งเวลาปิดเครื่องใช้ไฟฟ้าที่ไม่ใช้ (smart-plug schedule)',
  'ใช้เตา/หม้อไฟพร้อมกันให้น้อยลงหรือย้ายบางกิจกรรมไปช่วงเช้า/บ่าย',
]

export default function SummaryDetailPage() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <PageHeader title="ข้อมูลเพิ่มเติม" />

      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1a2a4a', lineHeight: 1.35 }}>
        ข้อมูลเพิ่มเติม - เดือนตุลาคม
      </h1>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {/* Section title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#4A9EE8', textDecoration: 'underline' }}>
            Top 3 เครื่องใช้ไฟฟ้าที่ใช้ไฟมากที่สุด
          </p>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" stroke="#4A9EE8" strokeWidth="2" />
          </svg>
        </div>

        {/* Device list */}
        {DEVICES.map((d, i) => (
          <div key={d.rank}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: '#EAF2FF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <d.Icon />
              </div>
              <span style={{ flex: 1, fontSize: 16, color: '#222', fontWeight: 500 }}>
                {d.rank}. {d.name}
              </span>
              <span style={{ fontSize: 17, fontWeight: 700, color: '#4A9EE8' }}>
                {d.pct} %
              </span>
            </div>
            {i < DEVICES.length - 1 && (
              <div style={{ borderTop: '1px solid #f0f4f8' }} />
            )}
          </div>
        ))}

        {/* Peak time */}
        <div style={{ borderTop: '1px solid #f0f4f8', marginTop: 8, paddingTop: 16, marginBottom: 16 }}>
          <p style={{ fontSize: 14, color: '#4A9EE8', fontWeight: 500 }}>
            ช่วงเวลาใช้ไฟสูงสุด : 18:00 - 22:00 น.
          </p>
        </div>

        {/* Tips */}
        <div>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#1a2a4a', marginBottom: 10 }}>
            คำแนะนำการประหยัดพลังงาน
          </p>
          <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {TIPS.map((tip, i) => (
              <li key={i} style={{ display: 'flex', gap: 8, fontSize: 14, color: '#444', lineHeight: 1.6 }}>
                <span style={{ color: '#1a2a4a', flexShrink: 0 }}>•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={() => navigate(-1)}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: 14,
          border: '1.5px solid #d0e4f7',
          background: 'white',
          color: '#1a2a4a',
          fontSize: 17,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        ย้อนกลับ
      </button>
    </div>
  )
}
