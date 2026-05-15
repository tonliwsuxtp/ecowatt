import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// หน้าสแกน AR เปิดกล้องหลังพร้อม overlay กรอบเล็ง และหยุด media stream เมื่อออกจากหน้า
export default function RemoteScanPage() {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' }, audio: false })
      .then(stream => {
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.onloadedmetadata = () => setReady(true)
        }
      })
      .catch(() => setError('ไม่สามารถเข้าถึงกล้องได้\nกรุณาอนุญาตการใช้งานกล้องในเบราว์เซอร์'))

    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop())
    }
  }, [])

  const handleBack = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    navigate(-1)
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[400ms] ${ready ? 'opacity-100' : 'opacity-0'}`}
      />

      {!ready && !error && (
        <div className="text-white text-base z-10">กำลังเปิดกล้อง...</div>
      )}

      {error && (
        <div className="z-10 text-center text-white px-8 py-6 bg-black/70 rounded-2xl whitespace-pre-line leading-[1.8] text-base">
          {error}
        </div>
      )}

      {ready && (
        <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center pointer-events-none">
          {[
            'top-[25%] left-[15%] border-t-[3px] border-l-[3px]',
            'top-[25%] right-[15%] border-t-[3px] border-r-[3px]',
            'bottom-[25%] left-[15%] border-b-[3px] border-l-[3px]',
            'bottom-[25%] right-[15%] border-b-[3px] border-r-[3px]',
          ].map((cls, i) => (
            <div key={i} className={`absolute w-10 h-10 rounded-[4px] border-[#4A9EE8] ${cls}`} />
          ))}
          <span className="absolute bottom-[20%] text-white text-sm bg-black/45 px-4 py-1.5 rounded-[20px]">
            เล็งกล้องไปที่อุปกรณ์ไฟฟ้า
          </span>
        </div>
      )}

      <div className="absolute top-0 left-0 right-0 z-10 flex items-center pt-12 px-5 pb-4 bg-gradient-to-b from-black/55 to-transparent">
        <button
          onClick={handleBack}
          className="bg-transparent border-none cursor-pointer text-white flex items-center gap-1.5 text-base font-semibold p-0"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          ย้อนกลับ
        </button>
        <span className="flex-1 text-center text-white text-lg font-bold mr-[60px]">
          สแกนอุปกรณ์ไฟฟ้า
        </span>
      </div>
    </div>
  )
}
