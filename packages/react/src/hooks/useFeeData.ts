import { useQueryClient } from '@tanstack/react-query'
import {
  type GetFeeDataError,
  type ResolvedRegister,
  watchBlockNumber,
} from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetFeeDataData,
  type GetFeeDataOptions,
  type GetFeeDataQueryFnData,
  type GetFeeDataQueryKey,
  getFeeDataQueryOptions,
} from '@wagmi/core/query'
import { useEffect } from 'react'

import type { WatchParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseFeeDataParameters<selectData = GetFeeDataData> = Evaluate<
  GetFeeDataOptions<ResolvedRegister['config']> &
    UseQueryParameters<
      GetFeeDataQueryFnData,
      GetFeeDataError,
      selectData,
      GetFeeDataQueryKey<ResolvedRegister['config']>
    > &
    WatchParameter
>

export type UseFeeDataReturnType<selectData = GetFeeDataData> = UseQueryResult<
  selectData,
  GetFeeDataError
>

/** https://wagmi.sh/react/hooks/useFeeData */
export function useFeeData<selectData = GetFeeDataData>(
  parameters: UseFeeDataParameters<selectData> = {},
): UseFeeDataReturnType<selectData> {
  const { watch, ...query } = parameters
  const config = useConfig()
  const queryClient = useQueryClient()

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = getFeeDataQueryOptions(config, {
    ...parameters,
    chainId,
  })
  const enabled = Boolean(parameters.enabled ?? true)

  useEffect(() => {
    if (!enabled) return
    if (!watch) return

    return watchBlockNumber(config, {
      chainId,
      onBlockNumber() {
        queryClient.invalidateQueries({
          queryKey: queryOptions.queryKey,
        })
      },
      syncConnectedChain: false,
    })
  }, [chainId, config, enabled, queryClient, queryOptions, watch])

  return useQuery({
    ...queryOptions,
    ...query,
    enabled,
  })
}
