import { EMT_REFERENCE_USD, EXCHANGE_RATE, MAX_PERCENTAGE } from '../constants/swap.js'

const DECIMAL_INPUT = /^\d*(?:[.,]\d*)?$/

export function parseDecimal(text) {
  const normalized = text.replace(',', '.')
  return normalized === '' || normalized === '.' ? 0 : Number(normalized)
}

export function calculateOutput(amount, isReversed = false) {
  return isReversed ? amount / EXCHANGE_RATE : amount * EXCHANGE_RATE
}

export function isValidAmount(text, isReversed = false) {
  if (!DECIMAL_INPUT.test(text)) return false
  const amount = parseDecimal(text)
  return Number.isFinite(amount) && Number.isFinite(calculateOutput(amount, isReversed))
}

export function isValidPercentage(text) {
  if (!DECIMAL_INPUT.test(text)) return false
  const percentage = parseDecimal(text)
  return Number.isFinite(percentage) && percentage <= MAX_PERCENTAGE
}

export function calculateMinimum(output, slippage) {
  return output * (1 - slippage / MAX_PERCENTAGE)
}

export function getMockUsd(amount, token) {
  return token === 'USDT' ? amount : (amount / EXCHANGE_RATE) * EMT_REFERENCE_USD
}

export function formatAmount(amount, maximumFractionDigits = 4) {
  return new Intl.NumberFormat('en-US', {
    useGrouping: false,
    maximumFractionDigits,
  }).format(amount)
}

export function formatUsd(amount) {
  return `~$${new Intl.NumberFormat('en-US', {
    useGrouping: false,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`
}
