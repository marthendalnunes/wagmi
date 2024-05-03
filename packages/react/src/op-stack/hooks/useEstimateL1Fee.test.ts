import { accounts } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { parseEther, parseGwei } from 'viem'
import { expect, test } from 'vitest'
import { useEstimateL1Fee } from './useEstimateL1Fee.js'

const baseTransaction = {
  chainId: 10,
  maxFeePerGas: parseGwei('100'),
  maxPriorityFeePerGas: parseGwei('1'),
  to: accounts[1],
  value: parseEther('0.1'),
} as const

test('default', async () => {
  const { result } = renderHook(() =>
    useEstimateL1Fee({
      ...baseTransaction,
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  const { data } = result.current
  expect(data).toBeTypeOf('bigint')
})
