import assert from 'node:assert/strict'
import test from 'node:test'
import { calculateMinimum, calculateOutput, formatAmount, formatUsd, getMockUsd, isValidAmount, isValidPercentage, parseDecimal } from '../src/utils/swap.js'

test('amount validation accepts decimal editing states and rejects malformed input', () => {
  for (const value of ['', '0', '0.', '0,', '.', ',', '.5', ',5', '1.5', '1,5', '1000']) {
    assert.equal(isValidAmount(value), true, value)
  }
  for (const value of ['abc', ' ', '-1', '+1', '1e3', '1E3', '1 2', '1.2.3', '1,2,3', '1.2,3']) {
    assert.equal(isValidAmount(value), false, value)
  }
  assert.equal(parseDecimal('1,5'), 1.5)
  assert.equal(parseDecimal(''), 0)
  assert.equal(parseDecimal('.'), 0)
})

test('finite input that overflows the output is rejected', () => {
  const large = '1' + '0'.repeat(306)
  assert.equal(isValidAmount(large), false)
  assert.equal(isValidAmount(large, true), true)
  assert.equal(isValidAmount('9'.repeat(309), true), false)
})

test('forward calculations format without floating point artifacts', () => {
  const cases = [[1, '518.1816'], [2, '1036.3632'], [0.5, '259.0908'], [1.5, '777.2724'], [1000, '518181.6'], [0.001, '0.5182'], [0, '0']]
  for (const [amount, expected] of cases) assert.equal(formatAmount(calculateOutput(amount)), expected)
})

test('minimum uses the unrounded output and supports percentage endpoints', () => {
  const output = calculateOutput(1)
  for (const [slippage, expected] of [[0.1, '517.6634'], [0.5, '515.5907'], [0.25, '516.8861'], [0, '518.1816'], [100, '0']]) {
    assert.equal(formatAmount(calculateMinimum(output, slippage)), expected)
  }
  assert.ok(Math.abs(calculateMinimum(calculateOutput(0.001), 0.1) - 0.5176634184) < Number.EPSILON)
})

test('repeated reverse calculations retain precision before presentation', () => {
  for (const initial of [1, 0.001, 0.0001, 1.23456789, 1000]) {
    let amount = initial
    for (let count = 0; count < 100; count += 1) amount = calculateOutput(calculateOutput(amount), true)
    assert.ok(Math.abs(amount - initial) <= Number.EPSILON * initial * 2)
  }
  assert.equal(formatAmount(calculateOutput(518.1816, true)), '1')
  assert.equal(formatAmount(calculateOutput(1, true), 8), '0.00192983')
})

test('custom percentages allow zero through 100 and decimal comma', () => {
  for (const value of ['', '0', '0.', ',5', '0.25', '0,25', '100', '100.00']) assert.equal(isValidPercentage(value), true)
  for (const value of ['-1', '100.01', '101', 'Infinity', '1e2', '1,2.3']) assert.equal(isValidPercentage(value), false)
})

test('mock USD values follow the token in either direction', () => {
  assert.equal(formatUsd(getMockUsd(1, 'USDT')), '~$1.00')
  assert.equal(formatUsd(getMockUsd(518.1816, 'EMT')), '~$0.99')
  assert.equal(formatUsd(getMockUsd(0, 'EMT')), '~$0.00')
})
