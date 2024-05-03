import { expectTypeOf, test } from 'vitest'

import { useEstimateL1Fee } from './useEstimateL1Fee.js'

test('select data', () => {
  const result = useEstimateL1Fee({
    query: {
      select(data) {
        return data?.toString()
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<string | undefined>()
})
