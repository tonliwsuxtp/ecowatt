export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="w-10 h-10 rounded-full border-4 border-[#d0e4f7] border-t-[#4A9EE8] animate-spin" />
      <p className="text-sm text-[#888]">กำลังโหลดข้อมูล...</p>
    </div>
  )
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <span className="text-4xl">⚠️</span>
      <p className="text-sm text-[#E05A5A] text-center">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2 rounded-lg bg-[#4A9EE8] text-white text-sm font-semibold cursor-pointer border-none"
        >
          ลองใหม่
        </button>
      )}
    </div>
  )
}
