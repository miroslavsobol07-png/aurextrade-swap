import { useState } from 'react'
import NetworkSelector from './NetworkSelector.jsx'
import TokenInput from './TokenInput.jsx'
import ReverseButton from './ReverseButton.jsx'
import OptionSelector from './OptionSelector.jsx'
import RateInfo from './RateInfo.jsx'
import ConnectWalletButton from './ConnectWalletButton.jsx'
import { DEFAULT_SLIPPAGE, DEFAULT_TIP, EXCHANGE_RATE, SLIPPAGE_OPTIONS, TIP_OPTIONS } from '../constants/swap.js'
import { NETWORKS } from '../data/networks.js'
import { calculateMinimum, calculateOutput, formatAmount, formatUsd, getMockUsd, isValidAmount, parseDecimal } from '../utils/swap.js'

function TradePanel({ mode, isActive }) {
  const isBridge = mode === 'cross-chain'
  // Text preserves editing states ("", "0,", ".5"); value keeps reverse precision.
  const [payAmount, setPayAmount] = useState({ text: '1', value: 1 })
  const [isReversed, setIsReversed] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[0])
  const [sourceNetwork, setSourceNetwork] = useState(NETWORKS[0])
  const [destinationNetwork, setDestinationNetwork] = useState(NETWORKS[1])
  const [slippage, setSlippage] = useState(DEFAULT_SLIPPAGE)
  const [tip, setTip] = useState(DEFAULT_TIP)

  const payToken = isReversed ? 'EMT' : 'USDT'
  const receiveToken = isReversed ? 'USDT' : 'EMT'
  const exchangeRate = isReversed ? 1 / EXCHANGE_RATE : EXCHANGE_RATE
  const estimatedOutput = calculateOutput(payAmount.value, isReversed)
  const minimumReceived = calculateMinimum(estimatedOutput, slippage)

  function handleAmountChange(text) {
    if (isValidAmount(text, isReversed)) {
      setPayAmount({ text, value: parseDecimal(text) })
    }
  }

  function handleReverse() {
    setPayAmount({ text: formatAmount(estimatedOutput), value: estimatedOutput })
    setIsReversed((previous) => !previous)
  }

  function handleNetworkSwitch() {
    setSourceNetwork(destinationNetwork)
    setDestinationNetwork(sourceNetwork)
  }

  return (
    <div className="swap-widget__content">
      {/* Reset only dropdown UI on tab changes; all selected values stay here. */}
      {isBridge ? (
        <div className="bridge-networks">
          <NetworkSelector
            label="From network"
            networks={NETWORKS}
            network={sourceNetwork}
            disabledNetwork={destinationNetwork}
            disabledReason="Selected as destination"
            onChange={setSourceNetwork}
            key={`source-${isActive}`}
          />
          <ReverseButton label="Switch source and destination networks" networkSwitch onClick={handleNetworkSwitch} />
          <NetworkSelector
            label="To network"
            networks={NETWORKS}
            network={destinationNetwork}
            disabledNetwork={sourceNetwork}
            disabledReason="Selected as source"
            onChange={setDestinationNetwork}
            key={`destination-${isActive}`}
          />
        </div>
      ) : (
        <NetworkSelector key={`swap-${isActive}`} networks={NETWORKS} network={selectedNetwork} onChange={setSelectedNetwork} />
      )}
      <div className="token-pair">
        <TokenInput
          id={`${mode}-pay`}
          label="You pay"
          amount={payAmount.text}
          fiatValue={formatUsd(getMockUsd(payAmount.value, payToken))}
          token={payToken}
          networkContext={isBridge ? `From · ${sourceNetwork}` : undefined}
          readOnly={false}
          onChange={handleAmountChange}
        />
        <ReverseButton onClick={handleReverse} />
        <TokenInput
          id={`${mode}-receive`}
          label="Est. Output"
          amount={formatAmount(estimatedOutput)}
          fiatValue={formatUsd(getMockUsd(estimatedOutput, receiveToken))}
          token={receiveToken}
          networkContext={isBridge ? `To · ${destinationNetwork}` : undefined}
        />
      </div>
      <div className="swap-options">
        <OptionSelector label="Slippage" options={SLIPPAGE_OPTIONS} value={slippage} onChange={setSlippage} />
        <OptionSelector label="Tip" options={TIP_OPTIONS} value={tip} onChange={setTip} />
      </div>
      <RateInfo
        payToken={payToken}
        receiveToken={receiveToken}
        exchangeRate={exchangeRate}
        minimumReceived={minimumReceived}
        route={isBridge ? `${sourceNetwork} → ${destinationNetwork}` : undefined}
      />
      <ConnectWalletButton />
    </div>
  )
}

export default TradePanel
