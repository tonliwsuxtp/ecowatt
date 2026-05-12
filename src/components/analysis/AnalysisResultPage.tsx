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
    <div className="screen">
      <PageHeader title="สรุปผลการวิเคราะห์ไฟฟ้า" showBack />

      <div className="card">
        <p style={{ color: '#666', fontSize: 14, marginBottom: 6 }}>การใช้ไฟฟ้าที่เหมาะสมต่อวัน</p>
        <p style={{ fontSize: 32, fontWeight: 700, color: '#1a2a4a' }}>
          {dailyKwh.toFixed(1)}{' '}
          <span style={{ fontSize: 16, fontWeight: 400, color: '#888' }}>kWh</span>
        </p>
      </div>

      <div className="card">
        <p style={{ color: '#666', fontSize: 14, marginBottom: 6 }}>การใช้ไฟฟ้าที่เหมาะสมต่อเดือน</p>
        <p style={{ fontSize: 32, fontWeight: 700, color: '#1a2a4a' }}>
          {monthlyKwh}{' '}
          <span style={{ fontSize: 16, fontWeight: 400, color: '#888' }}>kWh</span>
        </p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ color: '#666', fontSize: 14 }}>ค่าไฟเป้าหมายของคุณ</p>
        <p style={{ fontSize: 32, fontWeight: 700, color: '#1a2a4a' }}>
          {monthlyBudget > 0 ? monthlyBudget.toLocaleString() : estimatedCost.toLocaleString()}{' '}
          <span style={{ fontSize: 16, fontWeight: 400, color: '#888' }}>บาท/เดือน</span>
        </p>
        <div style={{
          padding: '10px 16px',
          borderRadius: 8,
          background: isInRange ? 'linear-gradient(135deg, #4A9EE8, #5BC4B5)' : 'linear-gradient(135deg, #F0954A, #E05A5A)',
          color: 'white',
          fontWeight: 600,
          fontSize: 15,
          textAlign: 'center',
        }}>
          {isInRange ? 'อยู่ในเกณฑ์ที่เหมาะสม' : 'สูงกว่าเกณฑ์ที่เหมาะสม'}
        </div>
      </div>

      <button
        onClick={() => navigate('/analysis/advice')}
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

      <button
        onClick={() => navigate(-1)}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: 12,
          border: '1.5px solid #d0e4f7',
          background: 'white',
          color: '#1a2a4a',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        แก้ไขข้อมูล
      </button>
    </div>
  )
}
