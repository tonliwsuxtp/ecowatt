import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../shared/PageHeader'
import { fetchSummary, type SummaryData } from '../../api/mockApi'
import { LoadingSpinner, ErrorState } from '../shared/LoadingSpinner'

function SparklineChart({ data }: { data: number[] }) {
  const w = 120
  const h = 60
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const step = w / (data.length - 1)

  const pts = data.map((v, i) => ({
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

function MiniBarChart({ prev, curr }: { prev: number; curr: number }) {
  const maxH = 80
  const prevH = Math.round((prev / Math.max(prev, curr)) * maxH)
  const currH = Math.round((curr / Math.max(prev, curr)) * maxH)
  return (
    <svg width={80} height={90} viewBox="0 0 80 90">
      <rect x={4}  y={90 - prevH} width={28} height={prevH} rx={4} fill="#B0CDE8" />
      <rect x={44} y={90 - currH} width={28} height={currH} rx={4} fill="#3B7DD8" />
      <text x={18} y={90} textAnchor="middle" fontSize={9} fill="#888">กันยายน</text>
      <text x={58} y={90} textAnchor="middle" fontSize={9} fill="#888">ตุลาคม</text>
    </svg>
  )
}

export default function SummaryPage() {
  const navigate = useNavigate()
  const [data, setData]       = useState<SummaryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  const load = () => {
    setLoading(true)
    setError(null)
    fetchSummary()
      .then(res => { setData(res); setLoading(false) })
      .catch(() => { setError('โหลดข้อมูลสรุปไม่สำเร็จ'); setLoading(false) })
  }

  useEffect(() => { load() }, [])

  return (
    <div className="max-w-[1150px] mx-auto pt-12 px-[18px] pb-8 md:pt-9 md:px-5 md:pb-5 flex flex-col gap-5">
      <PageHeader title="สรุปผล" />

      {data && (
        <h1 className="text-[30px] font-extrabold text-[#1a2a4a] text-center leading-[1.3]">
          สรุปการใช้ไฟ - เดือน{data.month}
        </h1>
      )}

      <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col">

        {loading && <LoadingSpinner />}
        {error   && <ErrorState message={error} onRetry={load} />}

        {data && <>
          {/* Monthly cost */}
          <div className="flex justify-between items-start pb-4">
            <div className="flex flex-col gap-1">
              <p className="text-[15px] text-[#555] font-medium">เดือน {data.month}</p>
              <p className="text-[34px] font-extrabold text-[#1a2a4a] leading-[1.1]">
                {data.totalBaht.toLocaleString()}{' '}
                <span className="text-base font-medium text-[#888]">บาท</span>
              </p>
              {data.overBaht > 0 && (
                <div className="flex items-center gap-1 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 11V3M7 3L3 7M7 3L11 7" stroke="#E05A5A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[13px] text-[#E05A5A]">เกินเป้า {data.overBaht} บาท</span>
                </div>
              )}
            </div>
            <MiniBarChart prev={data.prevMonthBaht} curr={data.totalBaht} />
          </div>

          <div className="border-t border-[#f0f4f8] -mx-5 mb-4" />

          {/* Daily average */}
          <div className="flex justify-between items-start pb-4">
            <div className="flex flex-col gap-1">
              <p className="text-[15px] text-[#555] font-medium">เฉลี่ยต่อวัน</p>
              <p className="text-[34px] font-extrabold text-[#1a2a4a] leading-[1.1]">
                {data.avgDailyBaht.toFixed(2)}{' '}
                <span className="text-base font-medium text-[#888]">บาท</span>
              </p>
              <span className="text-xs text-[#4A9EE8]">(+{data.changePct.toFixed(2)}%)</span>
            </div>
            <div className="mt-1">
              <SparklineChart data={data.sparklineData} />
            </div>
          </div>

          <div className="border-t border-[#f0f4f8] -mx-5 mb-4" />

          {/* Environment */}
          <div>
            <p className="text-[15px] font-bold text-[#1a2a4a] mb-2">ผลต่อสิ่งแวดล้อม</p>
            <p className="text-sm text-[#555] leading-[1.7]">{data.envTip}</p>
          </div>
        </>}
      </div>

      <button
        onClick={() => navigate('/components/summary/SummaryDetailPage')}
        className="w-full py-4 rounded-[14px] border-none bg-gradient-to-br from-[#4A9EE8] to-[#5BC4B5] text-white text-[17px] font-bold cursor-pointer"
      >
        ดูข้อมูลเพิ่มเติม
      </button>

      <button
        onClick={() => navigate(-1)}
        className="w-full py-4 rounded-[14px] border-[1.5px] border-[#d0e4f7] bg-white text-[#1a2a4a] text-[17px] font-semibold cursor-pointer"
      >
        ย้อนกลับ
      </button>
    </div>
  )
}
