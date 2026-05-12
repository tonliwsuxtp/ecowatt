import { useState } from 'react'
import { PageHeader } from '../shared/PageHeader'


type Period = 'day' | 'week' | 'month'

const DATASETS: Record<Period, { data: number[]; labels: string[] }> = {
  day:   { data: [12, 8, 6, 14, 20, 18, 10, 5, 9, 15, 22, 16], labels: ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'] },
  week:  { data: [30, 45, 28, 60, 42, 55, 38],                  labels: ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'] },
  month: { data: [320, 280, 410, 390, 350, 420, 380, 310, 440, 360, 400, 350], labels: ['ม.ค', 'ก.พ', 'มี.ค', 'เม.ย', 'พ.ค', 'มิ.ย', 'ก.ค', 'ส.ค', 'ก.ย', 'ต.ค', 'พ.ย', 'ธ.ค'] },
}

const STATS = [
  { label: 'วันนี้',     value: '2.4 kWh', sub: '฿ 8.40',          color: '#4A9EE8' },
  { label: 'เดือนนี้',   value: '68 kWh',  sub: '฿ 238.00',        color: '#5BC4B5' },
  { label: 'เฉลี่ย/วัน', value: '3.2 kWh', sub: '฿ 11.20',         color: '#F0954A' },
  { label: 'ประหยัดได้', value: '15%',     sub: 'vs เดือนที่แล้ว', color: '#5BC45B' },
]

export default function AnalysisPage() {
  const [period, setPeriod] = useState<Period>('week')
  const { data, labels } = DATASETS[period]
  const maxVal = Math.max(...data)

  return (
    <div className="screen">
      <PageHeader title="วิเคราะห์การใช้ไฟฟ้า" />

      <div className="card">
        <div className="period-tabs">
          {(['day', 'week', 'month'] as Period[]).map(p => (
            <button key={p} onClick={() => setPeriod(p)} className="period-tab"
              style={{ background: period === p ? '#3B7DD8' : '#EEF4FB', color: period === p ? 'white' : '#555' }}>
              {p === 'day' ? 'รายวัน' : p === 'week' ? 'รายสัปดาห์' : 'รายเดือน'}
            </button>
          ))}
        </div>
        <div className="bar-chart">
          {data.map((v, i) => (
            <div key={i} className="bar-col">
              <div className="bar-fill" style={{ height: `${(v / maxVal) * 100}px`, background: '#4A9EE8' }} />
              <span className="bar-label">{labels[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-grid">
        {STATS.map(s => (
          <div key={s.label} className="card stat-card">
            <p className="stat-label">{s.label}</p>
            <p className="stat-value" style={{ color: s.color }}>{s.value}</p>
            <p className="stat-sub">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
