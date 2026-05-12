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
            <text x={paddingX - 6} y={y + 4} textAnchor="end" fontSize="11" fill="#3B7DD8">{v}</text>
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
            <text x={x + barW / 2} y={chartH + paddingTop + paddingBottom - 4} textAnchor="middle" fontSize="10" fill="#3B7DD8">
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
    <div className="min-h-screen bg-[#D6E8F8] px-5 pt-6 pb-8 flex flex-col gap-5">
      <div className="flex items-center mb-1">
        <button
          onClick={() => navigate(-1)}
          className="bg-transparent border-none cursor-pointer p-1 text-[#1a2a4a]"
          aria-label="ย้อนกลับ"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <p className="text-center text-[13px] text-[#5580a0]">คำแนะนำรำรายเดือน</p>

      <h1 className="text-center text-[28px] font-extrabold text-[#1a2a4a] leading-[1.35]">
        คำแนะนำการใช้<br />ไฟฟ้ารายเดือน
      </h1>

      <div className="bg-white rounded-2xl px-4 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <BarChart />
      </div>

      <div className="text-center">
        <p className="font-extrabold text-lg text-[#1a2a4a] mb-1.5">คำแนะนำรายเดือน</p>
        <p className="font-extrabold text-lg text-[#1a2a4a] mb-3.5">ใช้ไฟไม่เกิน 300 หน่วยต่อเดือน</p>
        <p className="text-sm text-[#444]">ทริค : ใช้เครื่องใช้ไฟฟ้าประเภทที่มีประสิทธิภาพ</p>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="w-full py-4 rounded-xl border-none bg-gradient-to-br from-[#4A9EE8] to-[#5BC4B5] text-white text-base font-bold cursor-pointer"
      >
        ย้อนกลับ
      </button>
    </div>
  )
}
