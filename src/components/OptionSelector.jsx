import { useEffect, useId, useRef, useState } from 'react'
import { formatAmount, isValidPercentage, parseDecimal } from '../utils/swap.js'

function OptionSelector({ label, options, value, onChange, disabled = false }) {
  const id = useId()
  const [isCustom, setIsCustom] = useState(false)
  const [customAmount, setCustomAmount] = useState('')
  const inputRef = useRef(null)
  const optionRefs = useRef([])
  const choices = [...options, { label: 'Custom', value: null }]
  const selectedIndex = isCustom ? options.length : options.findIndex((option) => option.value === value)

  useEffect(() => {
    if (isCustom) inputRef.current?.focus()
  }, [isCustom])

  function selectOption(index) {
    const option = choices[index]
    if (option.value === null) {
      if (!isCustom) setCustomAmount(formatAmount(value))
      setIsCustom(true)
    } else {
      setIsCustom(false)
      onChange(option.value)
    }
  }

  function handleKeyDown(event, index) {
    let nextIndex = index
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % choices.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + choices.length) % choices.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = choices.length - 1
    else return

    event.preventDefault()
    selectOption(nextIndex)
    optionRefs.current[nextIndex]?.focus()
  }

  function handleCustomChange(text) {
    if (isValidPercentage(text)) {
      setCustomAmount(text)
      onChange(parseDecimal(text))
    }
  }

  return (
    <div className="option-control">
      <div className="option-row">
        <span id={`${id}-label`} className="option-row__label">{label}:</span>
        <div className="option-row__buttons" role="radiogroup" aria-labelledby={`${id}-label`}>
          {choices.map((option, index) => (
            <button
              key={option.label}
              ref={(element) => { optionRefs.current[index] = element }}
              type="button"
              role="radio"
              className="option-button"
              disabled={disabled}
              aria-checked={selectedIndex === index}
              tabIndex={selectedIndex === index ? 0 : -1}
              onClick={() => selectOption(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      {isCustom && (
        <label className="custom-option">
          <span>Custom {label.toLowerCase()}</span>
          <span className="custom-option__field">
            <input
              ref={inputRef}
              className="custom-option__input"
              type="text"
              inputMode="decimal"
              value={customAmount}
              disabled={disabled}
              autoComplete="off"
              spellCheck={false}
              aria-label={`Custom ${label.toLowerCase()} percentage`}
              title="Enter a percentage from 0 to 100"
              onChange={(event) => handleCustomChange(event.target.value)}
            />
            <span aria-hidden="true">%</span>
          </span>
        </label>
      )}
    </div>
  )
}

export default OptionSelector
