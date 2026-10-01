import { useEffect, useId, useRef, useState } from 'react'
import ChevronDown from './ChevronDown.jsx'
import { getNextNetworkIndex } from '../utils/networks.js'

function NetworkSelector({ networks, network, onChange, label = 'Choose a chain', disabled = false, disabledNetwork, disabledReason }) {
  const id = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const containerRef = useRef(null)
  const triggerRef = useRef(null)
  const optionRefs = useRef([])
  const selectedIndex = networks.indexOf(network)

  useEffect(() => {
    if (!isOpen) return
    optionRefs.current[selectedIndex]?.focus()

    function handleOutsidePointer(event) {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false)
    }

    document.addEventListener('pointerdown', handleOutsidePointer)
    return () => document.removeEventListener('pointerdown', handleOutsidePointer)
  }, [isOpen, selectedIndex])

  function openDropdown() {
    setFocusedIndex(selectedIndex)
    setIsOpen(true)
  }

  function chooseNetwork(nextNetwork) {
    if (nextNetwork === disabledNetwork) return
    onChange(nextNetwork)
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  function handleOptionKeyDown(event, index) {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
    const nextIndex = getNextNetworkIndex(networks, index, event.key, disabledNetwork)

    event.preventDefault()
    setFocusedIndex(nextIndex)
    optionRefs.current[nextIndex]?.focus()
  }

  return (
    <div className="network-row">
      <span id={`${id}-label`} className="network-row__label">{label}</span>
      <div
        className="network-picker"
        ref={containerRef}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && isOpen) {
            event.preventDefault()
            setIsOpen(false)
            triggerRef.current?.focus()
          }
        }}
      >
        <button
          ref={triggerRef}
          type="button"
          className="network-selector"
          disabled={disabled}
          aria-labelledby={`${id}-label ${id}-value`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? `${id}-listbox` : undefined}
          onClick={() => isOpen ? setIsOpen(false) : openDropdown()}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault()
              openDropdown()
            }
          }}
        >
          <span id={`${id}-value`}>{network}</span>
          <ChevronDown />
        </button>
        {isOpen && (
          <div id={`${id}-listbox`} className="network-menu" role="listbox" aria-labelledby={`${id}-label`}>
            {networks.map((option, index) => (
              <button
                key={option}
                ref={(element) => { optionRefs.current[index] = element }}
                type="button"
                role="option"
                className="network-menu__option"
                aria-selected={option === network}
                disabled={option === disabledNetwork}
                aria-describedby={option === disabledNetwork ? `${id}-unavailable` : undefined}
                tabIndex={focusedIndex === index ? 0 : -1}
                onClick={() => chooseNetwork(option)}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
              >
                {option}
                {option === disabledNetwork && <span id={`${id}-unavailable`} className="network-menu__reason">{disabledReason}</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default NetworkSelector
