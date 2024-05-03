import { accounts, config } from '@wagmi/test'
import { parseEther, parseGwei } from 'viem'
import { expect, test } from 'vitest'

import { estimateL1FeeQueryOptions } from './estimateL1Fee.js'

const baseTransaction = {
  chainId: 10,
  maxFeePerGas: parseGwei('100'),
  maxPriorityFeePerGas: parseGwei('1'),
  to: accounts[1],
  value: parseEther('0.1'),
} as const

test('default', () => {
  expect(
    estimateL1FeeQueryOptions(config, {
      ...baseTransaction,
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "estimateL1Fee",
        {
          "chainId": 10,
          "maxFeePerGas": 100000000000n,
          "maxPriorityFeePerGas": 1000000000n,
          "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
          "value": 100000000000000000n,
        },
      ],
    }
  `)
})

test('parameters: account', () => {
  expect(
    estimateL1FeeQueryOptions(config, {
      ...baseTransaction,
      account: accounts[0],
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "estimateL1Fee",
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "chainId": 10,
          "maxFeePerGas": 100000000000n,
          "maxPriorityFeePerGas": 1000000000n,
          "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
          "value": 100000000000000000n,
        },
      ],
    }
  `)
})

test('parameters: data', () => {
  expect(
    estimateL1FeeQueryOptions(config, {
      ...baseTransaction,
      data: '0x00000000000000000000000000000000000000000000000004fefa17b7240000',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "estimateL1Fee",
        {
          "chainId": 10,
          "data": "0x00000000000000000000000000000000000000000000000004fefa17b7240000",
          "maxFeePerGas": 100000000000n,
          "maxPriorityFeePerGas": 1000000000n,
          "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
          "value": 100000000000000000n,
        },
      ],
    }
  `)
})

test('parameters: gasPriceOracleAddress', () => {
  expect(
    estimateL1FeeQueryOptions(config, {
      ...baseTransaction,
      gasPriceOracleAddress: '0x420000000000000000000000000000000000000F',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "estimateL1Fee",
        {
          "chainId": 10,
          "gasPriceOracleAddress": "0x420000000000000000000000000000000000000F",
          "maxFeePerGas": 100000000000n,
          "maxPriorityFeePerGas": 1000000000n,
          "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
          "value": 100000000000000000n,
        },
      ],
    }
  `)
})

test('parameters: nonce', () => {
  expect(
    estimateL1FeeQueryOptions(config, {
      ...baseTransaction,
      nonce: 69,
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "estimateL1Fee",
        {
          "chainId": 10,
          "maxFeePerGas": 100000000000n,
          "maxPriorityFeePerGas": 1000000000n,
          "nonce": 69,
          "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
          "value": 100000000000000000n,
        },
      ],
    }
  `)
})
