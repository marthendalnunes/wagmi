'use client'

import { type Config, type ResolvedRegister } from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import { type EstimateL1FeeErrorType } from '@wagmi/core/op-stack'
import {
  type EstimateL1FeeData,
  type EstimateL1FeeOptions,
  type EstimateL1FeeQueryFnData,
  type EstimateL1FeeQueryKey,
  estimateL1FeeQueryOptions,
} from '@wagmi/core/op-stack/query'

import { useChainId } from '../../hooks/useChainId.js'
import { useConfig } from '../../hooks/useConfig.js'
import {
  type ConfigParameter,
  type QueryParameter,
} from '../../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../../utils/query.js'

export type UseEstimateL1FeeParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = EstimateL1FeeData,
> = Evaluate<
  EstimateL1FeeOptions<Config, chainId> &
    ConfigParameter<Config> &
    QueryParameter<
      EstimateL1FeeQueryFnData,
      EstimateL1FeeErrorType,
      selectData,
      EstimateL1FeeQueryKey<Config, chainId>
    >
>

export type UseEstimateL1FeeReturnType<selectData = EstimateL1FeeData> =
  UseQueryReturnType<selectData, EstimateL1FeeErrorType>

/** https://wagmi.sh/react/api/hooks/useEstimateL1Fee */
export function useEstimateL1Fee<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = EstimateL1FeeData,
>(
  parameters: UseEstimateL1FeeParameters<config, chainId, selectData> = {},
): UseEstimateL1FeeReturnType<selectData> {
  const { query = {} } = parameters

  const config = useConfig(parameters)
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId

  const options = estimateL1FeeQueryOptions(config, {
    ...parameters,
    chainId,
  })

  return useQuery({ ...query, ...options })
}
