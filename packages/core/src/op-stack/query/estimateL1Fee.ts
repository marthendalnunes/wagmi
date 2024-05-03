import { type QueryOptions } from '@tanstack/query-core'
import { type Config } from '../../createConfig.js'
import { filterQueryOptions } from '../../query/utils.js'
import type { ScopeKeyParameter } from '../../types/properties.js'
import type { UnionPartial } from '../../types/utils.js'
import {
  type EstimateL1FeeErrorType,
  type EstimateL1FeeParameters,
  type EstimateL1FeeReturnType,
  estimateL1Fee,
} from '../actions/estimateL1Fee.js'

export type EstimateL1FeeOptions<
  config extends Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
> = UnionPartial<EstimateL1FeeParameters<config, chainId>> & ScopeKeyParameter

export function estimateL1FeeQueryOptions<
  config extends Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
>(config: config, options: EstimateL1FeeOptions<config, chainId> = {} as any) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      const l1Fee = estimateL1Fee(config, {
        ...(parameters as any),
      })
      return l1Fee ?? null
    },
    queryKey: estimateL1FeeQueryKey(options),
  } as const satisfies QueryOptions<
    EstimateL1FeeQueryFnData,
    EstimateL1FeeErrorType,
    EstimateL1FeeData,
    EstimateL1FeeQueryKey<config, chainId>
  >
}

export type EstimateL1FeeQueryFnData = EstimateL1FeeReturnType

export type EstimateL1FeeData = EstimateL1FeeQueryFnData

export function estimateL1FeeQueryKey<
  config extends Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
>(options: EstimateL1FeeOptions<config, chainId> = {} as any) {
  return ['estimateL1Fee', filterQueryOptions(options)] as const
}

export type EstimateL1FeeQueryKey<
  config extends Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
> = ReturnType<typeof estimateL1FeeQueryKey<config, chainId>>
