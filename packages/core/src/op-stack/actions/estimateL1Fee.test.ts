import { accounts, config } from '@wagmi/test'
import { parseEther, parseGwei } from 'viem'
import { expect, test } from 'vitest'

import { estimateL1Fee } from './estimateL1Fee.js'

const baseTransaction = {
  chainId: 10,
  maxFeePerGas: parseGwei('100'),
  maxPriorityFeePerGas: parseGwei('1'),
  to: accounts[1],
  value: parseEther('0.1'),
} as const

test('default', async () => {
  await expect(estimateL1Fee(config, {})).resolves.toBeTypeOf('bigint')
})

test('minimal', async () => {
  await expect(
    estimateL1Fee(config, {
      chainId: 10,
    }),
  ).resolves.toBeTypeOf('bigint')
})

test('invalid chainId', async () => {
  await expect(
    estimateL1Fee(config, {
      ...baseTransaction,
      chainId: 1,
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
  "Chain \\"Ethereum\\" does not support contract \\"gasPriceOracle\\".

  This could be due to any of the following:
  - The chain does not have the contract \\"gasPriceOracle\\" configured.

  Version: viem@2.8.4"
`)
})

test('parameters: data', async () => {
  await expect(
    estimateL1Fee(config, {
      ...baseTransaction,
      data: '0x00000000000000000000000000000000000000000000000004fefa17b7240000',
    }),
  ).resolves.toBeTypeOf('bigint')
})

test('parameters: gasPriceOracleAddress', async () => {
  await expect(
    estimateL1Fee(config, {
      ...baseTransaction,
      gasPriceOracleAddress: '0x420000000000000000000000000000000000000F',
    }),
  ).resolves.toBeTypeOf('bigint')
})

test('parameters: nonce', async () => {
  await expect(
    estimateL1Fee(config, {
      ...baseTransaction,
      nonce: 69,
    }),
  ).resolves.toBeTypeOf('bigint')
})
