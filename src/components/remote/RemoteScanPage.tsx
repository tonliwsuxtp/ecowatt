import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <div style={{
      position: 'fixed', inset: 0,
      background: '#000',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Camera feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.4s',
        }}
      />

      {/* Loading state */}
      {!ready && !error && (
        <div style={{ color: 'white', fontSize: 16, zIndex: 10 }}>กำลังเปิดกล้อง...</div>
      )}

      {/* Error state */}
      {error && (
        <div style={{
          zIndex: 10, textAlign: 'center', color: 'white',
          padding: '24px 32px', background: 'rgba(0,0,0,0.7)',
          borderRadius: 16, whiteSpace: 'pre-line', lineHeight: 1.8, fontSize: 16,
        }}>
          {error}
        </div>
      )}

      {/* AR overlay frame */}
      {ready && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 5,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          {/* Corner brackets */}
          {[
            { top: '25%', left: '15%', borderTop: '3px solid #4A9EE8', borderLeft: '3px solid #4A9EE8' },
            { top: '25%', right: '15%', borderTop: '3px solid #4A9EE8', borderRight: '3px solid #4A9EE8' },
            { bottom: '25%', left: '15%', borderBottom: '3px solid #4A9EE8', borderLeft: '3px solid #4A9EE8' },
            { bottom: '25%', right: '15%', borderBottom: '3px solid #4A9EE8', borderRight: '3px solid #4A9EE8' },
          ].map((style, i) => (
            <div key={i} style={{
              position: 'absolute', width: 40, height: 40, borderRadius: 4, ...style,
            }} />
          ))}
          <span style={{
            color: 'white', fontSize: 14,
            background: 'rgba(0,0,0,0.45)',
            padding: '6px 16px', borderRadius: 20,
            position: 'absolute', bottom: '20%',
          }}>
            เล็งกล้องไปที่อุปกรณ์ไฟฟ้า
          </span>
        </div>
      )}

      {/* Header bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        display: 'flex', alignItems: 'center',
        padding: '48px 20px 16px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)',
      }}>
        <button
          onClick={handleBack}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'white', display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 16, fontWeight: 600, padding: 0,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          ย้อนกลับ
        </button>
        <span style={{
          flex: 1, textAlign: 'center', color: 'white',
          fontSize: 18, fontWeight: 700, marginRight: 60,
        }}>
          สแกนอุปกรณ์ไฟฟ้า
        </span>
      </div>
    </div>
  )
}
