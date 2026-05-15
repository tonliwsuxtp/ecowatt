import { useLocation, useNavigate } from 'react-router-dom'
import { PageHeader } from '../shared/PageHeader'

interface ResultState {
  members: number
  monthlyBudget: number
  dailyKwh: number
  monthlyKwh: number
}

export default function AnalysisResultPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as ResultState | null

  const members = state?.members ?? 1
  const monthlyBudget = state?.monthlyBudget ?? 0
  const dailyKwh = state?.dailyKwh ?? members * 2.5
  const monthlyKwh = state?.monthlyKwh ?? members * 75

  const estimatedCost = Math.round(monthlyKwh * 4.33)
  const isInRange = monthlyBudget >= estimatedCost * 0.9

  return (
    <div className="flex-1 w-full max-w-[1150px] mx-auto px-5 pt-8 pb-5 flex flex-col gap-5">
      <PageHeader title="สรุปผลการวิเคราะห์ไฟฟ้า" showBack />

      <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <p className="text-[#666] text-sm mb-1.5">การใช้ไฟฟ้าที่เหมาะสมต่อวัน</p>
        <p className="text-[32px] font-bold text-[#1a2a4a]">
          {dailyKwh.toFixed(1)}{' '}
          <span className="text-base font-normal text-[#888]">kWh</span>
        </p>
      </div>

      <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <p className="text-[#666] text-sm mb-1.5">การใช้ไฟฟ้าที่เหมาะสมต่อเดือน</p>
        <p className="text-[32px] font-bold text-[#1a2a4a]">
          {monthlyKwh}{' '}
          <span className="text-base font-normal text-[#888]">kWh</span>
        </p>
      </div>

      <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col gap-3">
        <p className="text-[#666] text-sm">ค่าไฟเป้าหมายของคุณ</p>
        <p className="text-[32px] font-bold text-[#1a2a4a]">
          {monthlyBudget > 0 ? monthlyBudget.toLocaleString() : estimatedCost.toLocaleString()}{' '}
          <span className="text-base font-normal text-[#888]">บาท/เดือน</span>
        </p>
        <div
          className={`px-4 py-[10px] rounded-lg text-white font-semibold text-[15px] text-center ${
            isInRange
              ? 'bg-gradient-to-br from-[#4A9EE8] to-[#5BC4B5]'
              : 'bg-gradient-to-br from-[#F0954A] to-[#E05A5A]'
          }`}
        >
          {isInRange ? 'อยู่ในเกณฑ์ที่เหมาะสม' : 'สูงกว่าเกณฑ์ที่เหมาะสม'}
        </div>
      </div>

      <button
        onClick={() => navigate('/component/analysis/advice')}
        className="mt-auto w-full py-4 rounded-xl border-none bg-gradient-to-br from-[#4A9EE8] to-[#5BC4B5] text-white text-base font-bold cursor-pointer"
      >
        ยืนยันข้อมูล
      </button>

      <button
        onClick={() => navigate(-1)}
        className="w-full py-4 rounded-xl border-[1.5px] border-[#d0e4f7] bg-white text-[#1a2a4a] text-base font-semibold cursor-pointer"
      >
        แก้ไขข้อมูล
      </button>
    </div>
  )
}
