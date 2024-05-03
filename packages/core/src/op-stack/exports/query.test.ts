import { expect, test } from 'vitest'

import * as query from './query.js'

test('exports', () => {
  expect(Object.keys(query)).toMatchInlineSnapshot(`
    [
      "estimateL1FeeQueryKey",
      "estimateL1FeeQueryOptions",
    ]
  `)
})
