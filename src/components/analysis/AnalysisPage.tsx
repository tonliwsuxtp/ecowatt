import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../shared/PageHeader'

export default function AnalysisPage() {
  const [members, setMembers] = useState('')
  const [monthlyBudget, setMonthlyBudget] = useState('')
  const navigate = useNavigate()

  const handleConfirm = () => {
    const n = Math.max(1, Number(members) || 1)
    navigate('/analysis/result', {
      state: {
        members: n,
        monthlyBudget: Number(monthlyBudget) || 0,
        dailyKwh: Math.round(n * 2.5 * 10) / 10,
        monthlyKwh: n * 75,
      },
    })
  }

  return (
    <div className="max-w-[1150px] mx-auto pt-12 px-[18px] pb-8 md:pt-9 md:px-5 md:pb-5 flex flex-col gap-5">
      <PageHeader title="การวิเคราะห์การใช้ไฟฟ้า" />

      <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <p className="font-bold text-base mb-[10px]">จำนวนสมาชิก</p>
        <input
          type="number"
          min={1}
          value={members}
          onChange={e => setMembers(e.target.value)}
          className="w-full px-[14px] py-3 rounded-lg border-[1.5px] border-[#d0e4f7] text-base mb-4 outline-none bg-white"
        />
        <button className="w-full py-[14px] rounded-[10px] border-none bg-gradient-to-br from-[#4A9EE8] to-[#5BC4B5] text-white text-base font-bold cursor-pointer">
          เริ่มคำนวณ
        </button>
      </div>

      <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col gap-[14px]">
        <p className="text-[#555] text-sm">ผลคำนวณการใช้ไฟฟ้าที่เหมาะสม</p>

        <div
          onClick={() => navigate('/analysis/daily-advice')}
          className="flex items-center gap-4 p-4 bg-[#f0f6ff] rounded-[10px] cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-[#3B7DD8] flex items-center justify-center flex-shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="13" width="4" height="7" rx="1" fill="white" />
              <rect x="9.5" y="9" width="4" height="11" rx="1" fill="white" />
              <rect x="16" y="5" width="4" height="15" rx="1" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-base flex-1">คำแนะนำรายวัน</span>
        </div>

        <div
          onClick={() => navigate('/analysis/monthly-advice')}
          className="flex items-center gap-4 p-4 bg-[#f0f6ff] rounded-[10px] cursor-pointer"
        >
          <div className="w-12 h-12 rounded-[10px] bg-[#3B7DD8] flex items-center justify-center flex-shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="white" strokeWidth="2" />
              <line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="2" />
              <line x1="8" y1="3" x2="8" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="3" x2="16" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-bold text-base flex-1">คำแนะนำรายเดือน</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-[#555] text-sm">ค่าไฟที่ท่านต้องการใช้ ต่อเดือน</span>
          <input
            type="number"
            min={0}
            value={monthlyBudget}
            onChange={e => setMonthlyBudget(e.target.value)}
            className="w-[90px] px-2 py-1 border-0 border-b-[1.5px] border-b-[#aaa] text-sm text-center bg-transparent outline-none"
          />
          <span className="text-[#555] text-sm">บาท</span>
        </div>
      </div>

      <button
        onClick={handleConfirm}
        className="w-full py-4 rounded-xl border-none bg-gradient-to-br from-[#4A9EE8] to-[#5BC4B5] text-white text-base font-bold cursor-pointer"
      >
        ยืนยันข้อมูล
      </button>
    </div>
  )
}
