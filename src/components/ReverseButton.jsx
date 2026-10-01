function ReverseButton({ onClick, disabled = false, label = 'Reverse token direction', networkSwitch = false }) {
  return (
    <button type="button" className={`icon-button reverse-button${networkSwitch ? ' network-switch' : ''}`} aria-label={label} onClick={onClick} disabled={disabled}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 19V5m-4 4 4-4 4 4M16 5v14m-4-4 4 4 4-4" />
      </svg>
    </button>
  )
}

export default ReverseButton
