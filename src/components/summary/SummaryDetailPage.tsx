import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../shared/PageHeader'
import { fetchSummaryDetail, type SummaryDetailData } from '../../api/mockApi'
import { LoadingSpinner, ErrorState } from '../shared/LoadingSpinner'

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

const DEVICE_ICONS = [AcIcon, FridgeIcon, HeaterIcon]

export default function SummaryDetailPage() {
  const navigate = useNavigate()
  const [data, setData]       = useState<SummaryDetailData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  const load = () => {
    setLoading(true)
    setError(null)
    fetchSummaryDetail()
      .then(res => { setData(res); setLoading(false) })
      .catch(() => { setError('โหลดข้อมูลเพิ่มเติมไม่สำเร็จ'); setLoading(false) })
  }

  useEffect(() => { load() }, [])

  return (
    <div className="max-w-[1150px] mx-auto pt-12 px-[18px] pb-8 md:pt-9 md:px-5 md:pb-5 flex flex-col gap-5">
      <PageHeader title="ข้อมูลเพิ่มเติม" />

      <h1 className="text-[26px] font-extrabold text-[#1a2a4a] leading-[1.35]">
        ข้อมูลเพิ่มเติม - เดือนตุลาคม
      </h1>

      <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col">

        {loading && <LoadingSpinner />}
        {error   && <ErrorState message={error} onRetry={load} />}

        {data && <>
          {/* Section title */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-[15px] font-bold text-[#4A9EE8] underline">
              Top 3 เครื่องใช้ไฟฟ้าที่ใช้ไฟมากที่สุด
            </p>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="#4A9EE8" strokeWidth="2" />
            </svg>
          </div>

          {/* Device list */}
          {data.topDevices.map((d, i) => {
            const Icon = DEVICE_ICONS[i] ?? AcIcon
            return (
              <div key={d.rank}>
                <div className="flex items-center gap-4 py-3">
                  <div className="w-14 h-14 rounded-[14px] bg-[#EAF2FF] flex items-center justify-center flex-shrink-0">
                    <Icon />
                  </div>
                  <span className="flex-1 text-base text-[#222] font-medium">
                    {d.rank}. {d.name}
                  </span>
                  <span className="text-[17px] font-bold text-[#4A9EE8]">{d.pct} %</span>
                </div>
                {i < data.topDevices.length - 1 && <div className="border-t border-[#f0f4f8]" />}
              </div>
            )
          })}

          {/* Peak time */}
          <div className="border-t border-[#f0f4f8] mt-2 pt-4 mb-4">
            <p className="text-sm text-[#4A9EE8] font-medium">
              ช่วงเวลาใช้ไฟสูงสุด : {data.peakTime}
            </p>
          </div>

          {/* Tips */}
          <div>
            <p className="text-[15px] font-bold text-[#1a2a4a] mb-[10px]">คำแนะนำการประหยัดพลังงาน</p>
            <ul className="list-none p-0 flex flex-col gap-2">
              {data.tips.map((tip, i) => (
                <li key={i} className="flex gap-2 text-sm text-[#444] leading-[1.6]">
                  <span className="text-[#1a2a4a] flex-shrink-0">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </>}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="w-full py-4 rounded-[14px] border-[1.5px] border-[#d0e4f7] bg-white text-[#1a2a4a] text-[17px] font-semibold cursor-pointer"
      >
        ย้อนกลับ
      </button>
    </div>
  )
}
