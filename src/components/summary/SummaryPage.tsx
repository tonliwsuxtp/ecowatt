import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../shared/PageHeader'

const SPARKLINE_POINTS = [60, 55, 62, 50, 58, 52, 65, 60, 70, 75, 68, 80]

function SparklineChart() {
  const w = 120
  const h = 60
  const max = Math.max(...SPARKLINE_POINTS)
  const min = Math.min(...SPARKLINE_POINTS)
  const range = max - min || 1
  const step = w / (SPARKLINE_POINTS.length - 1)

  const pts = SPARKLINE_POINTS.map((v, i) => ({
    x: i * step,
    y: h - ((v - min) / range) * (h - 10) - 5,
  }))

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${w} ${h} L 0 ${h} Z`

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A9EE8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#4A9EE8" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#sparkGrad)" />
      <path d={linePath} fill="none" stroke="#4A9EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MiniBarChart() {
  const prevH = 52
  const currH = 80
  return (
    <svg width={80} height={90} viewBox="0 0 80 90">
      <rect x={4} y={90 - prevH} width={28} height={prevH} rx={4} fill="#B0CDE8" />
      <rect x={44} y={90 - currH} width={28} height={currH} rx={4} fill="#3B7DD8" />
      <text x={18} y={90} textAnchor="middle" fontSize={9} fill="#888">กันยายน</text>
      <text x={58} y={90} textAnchor="middle" fontSize={9} fill="#888">ตุลาคม</text>
    </svg>
  )
}

export default function SummaryPage() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <PageHeader title="สรุปผล" />

      <h1 style={{ fontSize: 30, fontWeight: 800, color: '#1a2a4a', textAlign: 'center', lineHeight: 1.3 }}>
        สรุปการใช้ไฟ - เดือนนี้
      </h1>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {/* Monthly cost section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{ fontSize: 15, color: '#555', fontWeight: 500 }}>เดือน ตุลาคม</p>
            <p style={{ fontSize: 34, fontWeight: 800, color: '#1a2a4a', lineHeight: 1.1 }}>
              1,450 <span style={{ fontSize: 16, fontWeight: 500, color: '#888' }}>บาท</span>
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 11V3M7 3L3 7M7 3L11 7" stroke="#E05A5A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: 13, color: '#E05A5A' }}>เกินเป้า 150 บาท</span>
            </div>
          </div>
          <MiniBarChart />
        </div>

        <div style={{ borderTop: '1px solid #f0f4f8', margin: '0 -20px', marginBottom: 16 }} />

        {/* Daily average section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{ fontSize: 15, color: '#555', fontWeight: 500 }}>เฉลี่ยต่อวัน</p>
            <p style={{ fontSize: 34, fontWeight: 800, color: '#1a2a4a', lineHeight: 1.1 }}>
              48.33 <span style={{ fontSize: 16, fontWeight: 500, color: '#888' }}>บาท</span>
            </p>
            <span style={{ fontSize: 12, color: '#4A9EE8' }}>(+5.07%)</span>
          </div>
          <div style={{ marginTop: 4 }}>
            <SparklineChart />
          </div>
        </div>

        <div style={{ borderTop: '1px solid #f0f4f8', margin: '0 -20px', marginBottom: 16 }} />

        {/* Environment section */}
        <div>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#1a2a4a', marginBottom: 8 }}>ผลต่อสิ่งแวดล้อม</p>
          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7 }}>
            หากลดการใช้ 10% ต่อเดือน คุณจะลดต้นทุนได้ประมาณ 130 บาท และลดการปล่อยก๊าซเรือนกระจก
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate('/components/summary/SummaryDetailPage')}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: 14,
          border: 'none',
          background: 'linear-gradient(135deg, #4A9EE8, #5BC4B5)',
          color: 'white',
          fontSize: 17,
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        ดูข้อมูลเพิ่มเติม
      </button>

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
