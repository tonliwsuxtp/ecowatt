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
    <div className="screen">
      <PageHeader title="การวิเคราะห์การใช้ไฟฟ้า" />

      <div className="card">
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>จำนวนสมาชิก</p>
        <input
          type="number"
          min={1}
          value={members}
          onChange={e => setMembers(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: 8,
            border: '1.5px solid #d0e4f7',
            fontSize: 16,
            marginBottom: 16,
            outline: 'none',
            background: '#fff',
          }}
        />
        <button
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: 10,
            border: 'none',
            background: 'linear-gradient(135deg, #4A9EE8, #5BC4B5)',
            color: 'white',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          เริ่มคำนวณ
        </button>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p style={{ color: '#555', fontSize: 14 }}>ผลคำนวณการใช้ไฟฟ้าที่เหมาะสม</p>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 16,
          padding: '16px', background: '#f0f6ff', borderRadius: 10, cursor: 'pointer',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%', background: '#3B7DD8',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="13" width="4" height="7" rx="1" fill="white" />
              <rect x="9.5" y="9" width="4" height="11" rx="1" fill="white" />
              <rect x="16" y="5" width="4" height="15" rx="1" fill="white" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, flex: 1 }}>คำแนะนำรายวัน</span>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 16,
          padding: '16px', background: '#f0f6ff', borderRadius: 10, cursor: 'pointer',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 10, background: '#3B7DD8',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="white" strokeWidth="2" />
              <line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="2" />
              <line x1="8" y1="3" x2="8" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="3" x2="16" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, flex: 1 }}>คำแนะนำรายเดือน</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', paddingTop: 4 }}>
          <span style={{ color: '#555', fontSize: 14 }}>ค่าไฟที่ท่านต้องการใช้ ต่อเดือน</span>
          <input
            type="number"
            min={0}
            value={monthlyBudget}
            onChange={e => setMonthlyBudget(e.target.value)}
            style={{
              width: 90,
              padding: '4px 8px',
              border: 'none',
              borderBottom: '1.5px solid #aaa',
              fontSize: 14,
              textAlign: 'center',
              background: 'transparent',
              outline: 'none',
            }}
          />
          <span style={{ color: '#555', fontSize: 14 }}>บาท</span>
        </div>
      </div>

      <button
        onClick={handleConfirm}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: 12,
          border: 'none',
          background: 'linear-gradient(135deg, #4A9EE8, #5BC4B5)',
          color: 'white',
          fontSize: 16,
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        ยืนยันข้อมูล
      </button>
    </div>
  )
}
