import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../shared/PageHeader'

function RemoteIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="16" fill="#4A9EE8" />
      <rect x="20" y="14" width="24" height="36" rx="6" fill="white" />
      <rect x="26" y="20" width="12" height="3" rx="1.5" fill="#4A9EE8" />
      <rect x="26" y="25" width="12" height="3" rx="1.5" fill="#4A9EE8" />
      <circle cx="32" cy="38" r="5" fill="#4A9EE8" />
      <circle cx="32" cy="38" r="2.5" fill="white" />
    </svg>
  )
}

function ScanIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="16" fill="#4A9EE8" />
      <path
        d="M14 22v-6a2 2 0 0 1 2-2h6M42 14h6a2 2 0 0 1 2 2v6M50 42v6a2 2 0 0 1-2 2h-6M22 50h-6a2 2 0 0 1-2-2v-6"
        stroke="white" strokeWidth="3" strokeLinecap="round" />
      <rect x="22" y="22" width="20" height="20" rx="10" fill="none" stroke="white" strokeWidth="3" />
      <circle cx="32" cy="32" r="5" fill="white" />
    </svg>
  )
}

export default function RemotePage() {
  const navigate = useNavigate()

  return (
    <div className="screen" style={{ background: '#C9E3F5', minHeight: '100vh' }}>
      <PageHeader title="รีโมทควบคุมอุปกรณ์" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '8px 20px 24px' }}>
        <button
          onClick={() => navigate('/components/remote/RemoteControlPage')}
          style={{
            background: 'white',
            border: 'none',
            borderRadius: 20,
            padding: '40px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            width: '100%',
          }}
        >
          <RemoteIcon />
          <span style={{ fontSize: 18, fontWeight: 600, color: '#1a2a4a' }}>
            สั่งการเครื่องใช้ไฟฟ้า
          </span>
        </button>

        <button
          onClick={() => navigate('/components/remote/RemoteScanPage')}
          style={{
            background: 'white',
            border: 'none',
            borderRadius: 20,
            padding: '40px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            width: '100%',
          }}
        >
          <ScanIcon />
          <span style={{ fontSize: 18, fontWeight: 600, color: '#1a2a4a', textAlign: 'center' }}>
            สแกนอุปกรณ์ไฟฟ้า<br />AR Scan
          </span>
        </button>
      </div>
    </div>
  )
}
