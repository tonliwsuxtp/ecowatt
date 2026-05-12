interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
}

export function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`w-[50px] h-[28px] rounded-[14px] border-none cursor-pointer relative flex-shrink-0 transition-colors duration-200 ${checked ? 'bg-[#3B7DD8]' : 'bg-[#ccc]'}`}
    >
      <span
        className={`absolute top-[3px] w-[22px] h-[22px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-[left] duration-200 block ${checked ? 'left-6' : 'left-[3px]'}`}
      />
    </button>
  )
}
