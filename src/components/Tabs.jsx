import { useRef } from 'react'
import { TRADE_MODES } from '../constants/swap.js'

function Tabs({ activeTab, onChange }) {
  const tabRefs = useRef([])

  function handleKeyDown(event, index) {
    let nextIndex = index
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % TRADE_MODES.length
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + TRADE_MODES.length) % TRADE_MODES.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = TRADE_MODES.length - 1
    else return
    event.preventDefault()
    onChange(TRADE_MODES[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <header className="swap-header">
      <div className="trade-tabs" role="tablist" aria-label="Trade mode">
        {TRADE_MODES.map(({ id, label }, index) => (
          <button
            type="button"
            className="trade-tabs__button"
            key={id}
            id={`tab-${id}`}
            ref={(element) => { tabRefs.current[index] = element }}
            role="tab"
            aria-selected={activeTab === id}
            aria-controls={`panel-${id}`}
            tabIndex={activeTab === id ? 0 : -1}
            onClick={() => onChange(id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {label}
          </button>
        ))}
      </div>
      <button type="button" className="icon-button settings-button" aria-label="Swap settings">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M3 5h10m4 0h4M3 12h3m4 0h11M3 19h12m4 0h2M15 2.5v5M8 9.5v5M17 16.5v5" />
        </svg>
      </button>
    </header>
  )
}

export default Tabs
