import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../shared/PageHeader'

const PIE_DATA = [
  { label: 'แอร์',    value: 45, color: '#3B6BAE' },
  { label: 'ตู้เย็น', value: 35, color: '#7AAFD4' },
  { label: 'อื่น ๆ',  value: 20, color: '#B8D9EE' },
]

function PieChart() {
  const cx = 100, cy = 100, r = 75
  let angle = -Math.PI / 2

  const segments = PIE_DATA.map(({ value, color }) => {
    const sweep = (value / 100) * 2 * Math.PI
    const x1 = cx + r * Math.cos(angle)
    const y1 = cy + r * Math.sin(angle)
    const x2 = cx + r * Math.cos(angle + sweep)
    const y2 = cy + r * Math.sin(angle + sweep)
    const mid = angle + sweep / 2
    const lx = cx + r * 0.6 * Math.cos(mid)
    const ly = cy + r * 0.6 * Math.sin(mid)
    const d = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${sweep > Math.PI ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`
    angle += sweep
    return { d, color, lx, ly, label: `${value}%` }
  })

  return (
    <svg viewBox="0 0 200 200" width="155" height="155" style={{ flexShrink: 0 }}>
      {segments.map((s, i) => (
        <g key={i}>
          <path d={s.d} fill={s.color} />
          <text
            x={s.lx.toFixed(2)} y={s.ly.toFixed(2)}
            textAnchor="middle" dominantBaseline="middle"
            fill="white" fontSize="13" fontWeight="600"
          >
            {s.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function AdvicePage() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <PageHeader title="คำแนะนำการใช้ไฟฟ้า" showBack />

      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <PieChart />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {PIE_DATA.map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 14, height: 14, borderRadius: '50%',
                background: d.color, flexShrink: 0,
              }} />
              <span style={{ fontSize: 16, fontWeight: 500, color: '#1a2a4a' }}>{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>รายวัน</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: '#555', fontSize: 14 }}>ปิดไฟเมื่อไม่ใช้งาน</span>
          <span style={{ color: '#999' }}>→</span>
          <span style={{ color: '#555', fontSize: 14 }}>ประหยัด ~5 บาท/วัน</span>
        </div>
      </div>

      <div className="card">
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>รายเดือน</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: '#555', fontSize: 14 }}>ตั้งแอร์ 26°C</span>
          <span style={{ color: '#999' }}>→</span>
          <span style={{ color: '#555', fontSize: 14 }}>ลดได้ ~200 บาท/เดือน</span>
        </div>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p style={{ fontWeight: 700, fontSize: 16 }}>รายเดือน</p>
        {['ใช้ปลั๊กพ่วงที่มีสวิตช์', 'ใช้เครื่องใช้ไฟฟ้าในช่วงเวลาเหมาะสม'].map(item => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%', background: '#4A9EE8',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="13" height="13" viewBox="0 0 13 13">
                <polyline points="2,7 5.5,10.5 11,3" stroke="white" strokeWidth="2"
                  fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontSize: 14, color: '#333' }}>{item}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            flex: 1, padding: '16px', borderRadius: 12, border: 'none',
            background: '#A8C3D8', color: '#1a2a4a', fontSize: 16, fontWeight: 600, cursor: 'pointer',
          }}
        >
          ย้อนกลับ
        </button>
        <button
          style={{
            flex: 1, padding: '16px', borderRadius: 12, border: 'none',
            background: '#2E5090', color: 'white', fontSize: 16, fontWeight: 600, cursor: 'pointer',
          }}
        >
          แชร์ให้ครอบครัว
        </button>
      </div>
    </div>
  )
}
