import { useNavigate } from 'react-router-dom'

const BAR_DATA = [
  { label: 'กรกฎาคม',  value: 180 },
  { label: 'สิงหาคม',  value: 310 },
  { label: 'กันยายน',  value: 255 },
  { label: 'ตุลาคม',   value: 155 },
]

const MAX_VALUE = 400

function BarChart() {
  const chartH = 180
  const barW = 44
  const gap = 28
  const paddingX = 46
  const paddingTop = 10
  const paddingBottom = 36
  const totalW = paddingX + BAR_DATA.length * (barW + gap) - gap + 16

  const yLabels = [0, 100, 200, 300, 400]

  return (
    <svg width="100%" viewBox={`0 0 ${totalW} ${chartH + paddingTop + paddingBottom}`}>
      {yLabels.map(v => {
        const y = paddingTop + chartH - (v / MAX_VALUE) * chartH
        return (
          <g key={v}>
            <text x={paddingX - 6} y={y + 4} textAnchor="end" fontSize="11" fill="#3B7DD8">
              {v}
            </text>
            <line x1={paddingX} y1={y} x2={totalW} y2={y} stroke="#e5eef8" strokeWidth="1" />
          </g>
        )
      })}

      {BAR_DATA.map((d, i) => {
        const x = paddingX + i * (barW + gap)
        const barH = (d.value / MAX_VALUE) * chartH
        const y = paddingTop + chartH - barH
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barW} height={barH} rx="4" fill="#6B9FD4" />
            <text
              x={x + barW / 2}
              y={chartH + paddingTop + paddingBottom - 4}
              textAnchor="middle"
              fontSize="10"
              fill="#3B7DD8"
            >
              {d.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function MonthlyAdvicePage() {
  const navigate = useNavigate()

  return (
    <div className="screen" style={{ background: '#D6E8F8', minHeight: '100vh', padding: '24px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#1a2a4a' }}
          aria-label="ย้อนกลับ"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <p style={{ textAlign: 'center', fontSize: 13, color: '#5580a0', marginBottom: 12 }}>
        คำแนะนำรำรายเดือน
      </p>

      <h1 style={{
        textAlign: 'center', fontSize: 28, fontWeight: 800,
        color: '#1a2a4a', lineHeight: 1.35, marginBottom: 20,
      }}>
        คำแนะนำการใช้<br />ไฟฟ้ารายเดือน
      </h1>

      <div style={{
        background: '#fff', borderRadius: 16, padding: '20px 16px',
        marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
        <BarChart />
      </div>

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <p style={{ fontWeight: 800, fontSize: 18, color: '#1a2a4a', marginBottom: 6 }}>
          คำแนะนำรายเดือน
        </p>
        <p style={{ fontWeight: 800, fontSize: 18, color: '#1a2a4a', marginBottom: 14 }}>
          ใช้ไฟไม่เกิน 300 หน่วยต่อเดือน
        </p>
        <p style={{ fontSize: 14, color: '#444' }}>
          ทริค : ใช้เครื่องใช้ไฟฟ้าประเภทที่มีประสิทธิภาพ
        </p>
      </div>

      <button
        onClick={() => navigate(-1)}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: 12,
          border: 'none',
          background: 'linear-gradient(135deg, #4A9EE8, #5BC4B5)',
          color: 'white',
          fontSize: 16,
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        ย้อนกลับ
      </button>
    </div>
  )
}
