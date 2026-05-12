import { useNavigate } from 'react-router-dom'

const BAR_DATA = [
  { time: '00:00', value: 5.5 },
  { time: '06:00', value: 8.5 },
  { time: '18:00', value: 7.0 },
  { time: '24:00', value: 5.0 },
]

const MAX_VALUE = 10

function BarChart() {
  const chartH = 160
  const barW = 40
  const gap = 30
  const paddingX = 40
  const paddingTop = 10
  const paddingBottom = 30
  const totalW = paddingX + BAR_DATA.length * (barW + gap) - gap + 20
  const yLabels = [2, 4, 6, 8, 10]

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
          <g key={d.time}>
            <rect x={x} y={y} width={barW} height={barH} rx="4" fill="#6B9FD4" />
            <text x={x + barW / 2} y={chartH + paddingTop + paddingBottom - 4} textAnchor="middle" fontSize="11" fill="#3B7DD8">
              {d.time}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function DailyAdvicePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#D6E8F8] px-5 pt-6 pb-8 flex flex-col gap-5">
      <div className="flex items-center mb-1">
        <button
          onClick={() => navigate(-1)}
          className="bg-none border-none cursor-pointer p-1 text-[#1a2a4a]"
          aria-label="ย้อนกลับ"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <p className="text-center text-[13px] text-[#5580a0]">คำแนะนำรำรายวัน</p>

      <h1 className="text-center text-[28px] font-extrabold text-[#1a2a4a] leading-[1.35]">
        คำแนะนำการใช้<br />ไฟฟ้ารายวัน
      </h1>

      <div className="bg-white rounded-2xl px-4 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <BarChart />
      </div>

      <div className="text-center">
        <p className="font-extrabold text-lg text-[#1a2a4a] mb-1.5">คำแนะนำรายวัน</p>
        <p className="font-extrabold text-lg text-[#1a2a4a] mb-3.5">ใช้ไฟไม่เกิน 10 หน่วยต่อวัน</p>
        <p className="text-sm text-[#444]">ทริค : ควรปิดเครื่องใช้ไฟฟ้าหลัง&nbsp; 22:00 เป็นต้นไป</p>
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
