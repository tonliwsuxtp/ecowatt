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
    <div className="flex-1 w-full max-w-[1150px] mx-auto px-5 pt-8 pb-5 flex flex-col gap-5">
      <PageHeader title="รีโมทควบคุมอุปกรณ์" />

      <button
        onClick={() => navigate('/components/remote/RemoteControlPage')}
        className="w-full bg-white border-none rounded-[20px] py-10 px-5 flex flex-col items-center gap-4 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
      >
        <RemoteIcon />
        <span className="text-lg font-semibold text-[#1a2a4a]">สั่งการเครื่องใช้ไฟฟ้า</span>
      </button>

      <button
        onClick={() => navigate('/components/remote/RemoteScanPage')}
        className="w-full bg-white border-none rounded-[20px] py-10 px-5 flex flex-col items-center gap-4 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
      >
        <ScanIcon />
        <span className="text-lg font-semibold text-[#1a2a4a] text-center">
          สแกนอุปกรณ์ไฟฟ้า<br />AR Scan
        </span>
      </button>
    </div>
  )
}
