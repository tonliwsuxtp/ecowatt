import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../shared/PageHeader'
import { fetchAdvice, type AdviceData } from '../../api/mockApi'
import { LoadingSpinner, ErrorState } from '../shared/LoadingSpinner'

function PieChart({ data }: { data: AdviceData['pieData'] }) {
  const cx = 100, cy = 100, r = 75
  let angle = -Math.PI / 2

  const segments = data.map(({ value, color }) => {
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
    <svg viewBox="0 0 200 200" width="155" height="155" className="flex-shrink-0">
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
  const [data, setData]       = useState<AdviceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  const load = () => {
    setLoading(true)
    setError(null)
    fetchAdvice()
      .then(res => { setData(res); setLoading(false) })
      .catch(() => { setError('โหลดข้อมูลคำแนะนำไม่สำเร็จ'); setLoading(false) })
  }

  useEffect(() => { load() }, [])

  return (
    <div className="flex-1 w-full max-w-[1150px] mx-auto px-5 pt-8 pb-5 flex flex-col gap-5">
      <PageHeader title="คำแนะนำการใช้ไฟฟ้า" showBack />

      {loading && (
        <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <ErrorState message={error} onRetry={load} />
        </div>
      )}

      {data && <>
        {/* Pie chart + legend */}
        <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center gap-5">
          <PieChart data={data.pieData} />
          <div className="flex flex-col gap-[14px]">
            {data.pieData.map(d => (
              <div key={d.label} className="flex items-center gap-[10px]">
                <div className="w-[14px] h-[14px] rounded-full flex-shrink-0" style={{ background: d.color }} />
                <span className="text-base font-medium text-[#1a2a4a]">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily tip */}
        <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <p className="font-bold text-base mb-[10px]">รายวัน</p>
          <div className="flex items-center gap-[10px]">
            <span className="text-[#555] text-sm">{data.dailyTip.action}</span>
            <span className="text-[#999]">→</span>
            <span className="text-[#555] text-sm">{data.dailyTip.saving}</span>
          </div>
        </div>

        {/* Monthly tip */}
        <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <p className="font-bold text-base mb-[10px]">รายเดือน</p>
          <div className="flex items-center gap-[10px]">
            <span className="text-[#555] text-sm">{data.monthlyTip.action}</span>
            <span className="text-[#999]">→</span>
            <span className="text-[#555] text-sm">{data.monthlyTip.saving}</span>
          </div>
        </div>

        {/* Monthly actions */}
        <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col gap-[14px]">
          <p className="font-bold text-base">รายเดือน</p>
          {data.monthlyActions.map(item => (
            <div key={item} className="flex items-center gap-[10px]">
              <div className="w-6 h-6 rounded-full bg-[#4A9EE8] flex items-center justify-center flex-shrink-0">
                <svg width="13" height="13" viewBox="0 0 13 13">
                  <polyline points="2,7 5.5,10.5 11,3" stroke="white" strokeWidth="2"
                    fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm text-[#333]">{item}</span>
            </div>
          ))}
        </div>
      </>}

      <div className="flex gap-3 mt-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-4 rounded-xl border-none bg-[#A8C3D8] text-[#1a2a4a] text-base font-semibold cursor-pointer"
        >
          ย้อนกลับ
        </button>
        <button className="flex-1 py-4 rounded-xl border-none bg-[#2E5090] text-white text-base font-semibold cursor-pointer">
          แชร์ให้ครอบครัว
        </button>
      </div>
    </div>
  )
}
