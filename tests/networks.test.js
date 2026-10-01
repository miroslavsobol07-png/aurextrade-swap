import assert from 'node:assert/strict'
import test from 'node:test'
import { NETWORKS } from '../src/data/networks.js'
import { getNextNetworkIndex } from '../src/utils/networks.js'

test('network keyboard navigation wraps in both directions', () => {
  assert.equal(getNextNetworkIndex(NETWORKS, 3, 'ArrowDown'), 0)
  assert.equal(getNextNetworkIndex(NETWORKS, 0, 'ArrowUp'), 3)
})

test('bridge keyboard navigation never focuses the opposite network', () => {
  for (const excluded of NETWORKS) {
    for (let index = 0; index < NETWORKS.length; index += 1) {
      if (NETWORKS[index] === excluded) continue
      for (const key of ['ArrowDown', 'ArrowUp', 'Home', 'End']) {
        const next = getNextNetworkIndex(NETWORKS, index, key, excluded)
        assert.ok(next >= 0 && next < NETWORKS.length)
        assert.notEqual(NETWORKS[next], excluded)
      }
    }
  }
  assert.equal(getNextNetworkIndex(NETWORKS, 0, 'ArrowDown', 'Ethereum'), 2)
  assert.equal(getNextNetworkIndex(NETWORKS, 2, 'ArrowUp', 'Ethereum'), 0)
})

test('Home and End skip disabled boundary options', () => {
  assert.equal(getNextNetworkIndex(NETWORKS, 2, 'Home', 'Polygon PoS'), 1)
  assert.equal(getNextNetworkIndex(NETWORKS, 0, 'End', 'BNB Chain'), 2)
})

test('empty or fully unavailable network list has no focus target', () => {
  assert.equal(getNextNetworkIndex([], 0, 'ArrowDown'), -1)
  assert.equal(getNextNetworkIndex(['Ethereum'], 0, 'ArrowDown', 'Ethereum'), -1)
})
