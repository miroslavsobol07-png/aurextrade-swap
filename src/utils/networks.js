// Roving focus skips the network already selected at the other end of a bridge.
export function getNextNetworkIndex(networks, currentIndex, key, disabledNetwork) {
  const enabledIndices = networks.map((network, index) => network !== disabledNetwork ? index : -1).filter((index) => index !== -1)
  if (enabledIndices.length === 0) return -1
  if (key === 'Home') return enabledIndices[0]
  if (key === 'End') return enabledIndices[enabledIndices.length - 1]
  const position = enabledIndices.indexOf(currentIndex)
  if (key === 'ArrowDown') return enabledIndices[(position + 1) % enabledIndices.length]
  if (key === 'ArrowUp') return enabledIndices[(position - 1 + enabledIndices.length) % enabledIndices.length]
  return currentIndex
}
