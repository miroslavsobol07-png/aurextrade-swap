import { ESTIMATED_FEE_EMT, PRICE_IMPACT } from '../constants/swap.js'
import { formatAmount } from '../utils/swap.js'

function RateInfo({ payToken, receiveToken, exchangeRate, minimumReceived, route }) {
  const rateRows = [
    ...(route ? [{ label: 'Route', value: route }] : []),
    { label: 'Rate', value: `1 ${payToken} = ${formatAmount(exchangeRate, 8)} ${receiveToken}` },
    { label: 'Min. Received', value: `${formatAmount(minimumReceived)} ${receiveToken}` },
    { label: 'Price Impact', value: `${PRICE_IMPACT}%`, accented: true },
    { label: 'Est. Fee', value: `${ESTIMATED_FEE_EMT} EMT` },
  ]

  return (
    <dl className="rate-info" aria-label="Exchange details">
      {rateRows.map(({ label, value, accented }) => (
        <div className="rate-info__row" key={label}>
          <dt>{label}</dt>
          <dd className={accented ? 'rate-info__value rate-info__value--accent' : 'rate-info__value'}>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default RateInfo
