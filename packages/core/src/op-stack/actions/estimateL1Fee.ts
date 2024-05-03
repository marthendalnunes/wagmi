import { type Account, type Chain } from 'viem'
import {
  estimateL1Fee as viem_estimateL1Fee,
  type EstimateL1FeeErrorType as viem_EstimateL1FeeErrorType,
  type EstimateL1FeeParameters as viem_EstimateL1FeeParameters,
  type EstimateL1FeeReturnType as viem_EstimateL1FeeReturnType,
} from 'viem/op-stack'
import { type Config } from '../../createConfig.js'
import type { BaseErrorType, ErrorType } from '../../errors/base.js'
import type { SelectChains } from '../../types/chain.js'
import type { ChainIdParameter } from '../../types/properties.js'
import type { UnionEvaluate, UnionLooseOmit } from '../../types/utils.js'
import { getAction } from '../../utils/getAction.js'

export type EstimateL1FeeParameters<
  config extends Config = Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: UnionEvaluate<
    UnionLooseOmit<
      viem_EstimateL1FeeParameters<chains[key], Account, chains[key]>,
      'chain'
    > &
      ChainIdParameter<config, chainId>
  >
}[number]

export type EstimateL1FeeReturnType = viem_EstimateL1FeeReturnType

export type EstimateL1FeeErrorType =
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_EstimateL1FeeErrorType

export async function estimateL1Fee<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(config: config, parameters: EstimateL1FeeParameters<config, chainId>) {
  const { chainId, account, ...rest } = parameters
  const client = config.getClient({ chainId })

  const action = getAction(client, viem_estimateL1Fee, 'estimateL1Fee')
  return action({
    ...(rest as any),
    ...(account ? { account } : {}),
    chain: client.chain,
  })
}
