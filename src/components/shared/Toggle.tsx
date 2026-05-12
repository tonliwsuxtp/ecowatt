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
      className="toggle-btn"
      style={{ background: checked ? '#3B7DD8' : '#ccc' }}
    >
      <span className="toggle-knob" style={{ left: checked ? 24 : 3 }} />
    </button>
  )
}
