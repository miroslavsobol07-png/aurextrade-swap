import ChevronDown from './ChevronDown.jsx'

function TokenInput({ id, label, amount, fiatValue, token, networkContext, balance = '0', readOnly = true, onChange, disabled = false }) {
  return (
    <div className="token-panel">
      {networkContext && <p id={`${id}-network`} className="token-panel__network">{networkContext}</p>}
      <div className="token-panel__header">
        <label htmlFor={`${id}-amount`}>{label}</label>
        <span id={`${id}-balance`}>Balance: {balance}</span>
      </div>
      <div className="token-panel__body">
        <div className="token-panel__amount-group">
          <input
            id={`${id}-amount`}
            className="token-panel__amount"
            type="text"
            inputMode="decimal"
            value={amount}
            readOnly={readOnly}
            disabled={disabled}
            onChange={onChange ? (event) => onChange(event.target.value) : undefined}
            autoComplete="off"
            spellCheck={false}
            aria-describedby={`${id}-fiat ${id}-balance${networkContext ? ` ${id}-network` : ''}`}
          />
          <span id={`${id}-fiat`} className="token-panel__fiat">{fiatValue}</span>
        </div>
        <button type="button" className="token-selector" aria-label={`${label} token: ${token}`}>
          {/* Presentation controls and token symbols; no token picker is in scope. */}
          <span className={`token-placeholder token-placeholder--${token.toLowerCase()}`} aria-hidden="true">
            {token === 'USDT' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                <path d="M6 5h12M12 5v14" />
                <ellipse cx="12" cy="10" rx="8" ry="2" />
              </svg>
            ) : 'E'}
          </span>
          <span>{token}</span>
          <ChevronDown />
        </button>
      </div>
    </div>
  )
}

export default TokenInput
