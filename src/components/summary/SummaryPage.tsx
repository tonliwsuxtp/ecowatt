import { PageHeader } from '../shared/PageHeader'


const MONTHS = ['ม.ค', 'ก.พ', 'มี.ค', 'เม.ย', 'พ.ค']
const USAGE  = [380, 420, 360, 410, 240]
const COST   = [1330, 1470, 1260, 1435, 840]

export default function SummaryPage() {
  const maxUsage = Math.max(...USAGE)

  return (
    <div className="screen">
      <PageHeader title="สรุปผล" />

      <div className="stats-grid three">
        {[
          { label: 'ปีนี้ใช้',  value: '1,810', unit: 'kWh' },
          { label: 'ค่าไฟรวม', value: '6,335', unit: 'บาท' },
          { label: 'ลดลง',     value: '12%',   unit: 'vs ปีที่แล้ว' },
        ].map(s => (
          <div key={s.label} className="card stat-card">
            <p className="stat-label">{s.label}</p>
            <p className="stat-value blue">{s.value}</p>
            <p className="stat-sub">{s.unit}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="section-title">การใช้ไฟ 5 เดือนล่าสุด</h3>
        <div className="bar-chart" style={{ height: 110 }}>
          {USAGE.map((v, i) => (
            <div key={i} className="bar-col">
              <div className="bar-fill" style={{
                height: `${(v / maxUsage) * 90}px`,
                background: i === USAGE.length - 1 ? '#5BC4B5' : '#4A9EE8',
              }} />
              <span className="bar-label">{MONTHS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="section-title">รายละเอียดรายเดือน</h3>
        {MONTHS.map((m, i) => (
          <div key={m} className="summary-row"
            style={{ borderBottom: i < MONTHS.length - 1 ? '1px solid #f0f4f8' : 'none' }}>
            <span className="summary-month">{m}</span>
            <span style={{ color: '#4A9EE8', fontSize: 14 }}>{USAGE[i]} kWh</span>
            <span style={{ color: '#5BC4B5', fontWeight: 600, fontSize: 14 }}>฿ {COST[i].toLocaleString()}</span>
            <span style={{ fontSize: 12, color: i > 0 && USAGE[i] < USAGE[i - 1] ? '#5BC45B' : i > 0 ? '#E05A5A' : 'transparent' }}>
              {i > 0 ? (USAGE[i] < USAGE[i - 1] ? '▼' : '▲') + ' ' + Math.abs(USAGE[i] - (USAGE[i - 1] ?? 0)) : '—'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
