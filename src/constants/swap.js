// All prices and fees are mock data for this frontend exercise.
export const EXCHANGE_RATE = 518.1816
export const PRICE_IMPACT = 0.12
export const ESTIMATED_FEE_EMT = 1.5545
export const EMT_REFERENCE_USD = 0.99
export const DEFAULT_SLIPPAGE = 0.1
export const DEFAULT_TIP = 0
export const MAX_PERCENTAGE = 100

export const TRADE_MODES = [
  { id: 'swap', label: 'Swap' },
  { id: 'limit', label: 'Limit' },
  { id: 'cross-chain', label: 'Cross-Chain' },
]

export const SLIPPAGE_OPTIONS = [
  { label: '0.1%', value: 0.1 },
  { label: '0.3%', value: 0.3 },
  { label: '0.5%', value: 0.5 },
  { label: '1.0%', value: 1 },
]

export const TIP_OPTIONS = [
  { label: 'No tip', value: 0 },
  { label: '0.1%', value: 0.1 },
  { label: '0.3%', value: 0.3 },
  { label: '0.5%', value: 0.5 },
]
