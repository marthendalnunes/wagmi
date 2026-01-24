import type {
  Account,
  Chain,
  Client,
  TransactionRequest,
  SignTransactionErrorType as viem_SignTransactionErrorType,
  SignTransactionParameters as viem_SignTransactionParameters,
  SignTransactionReturnType as viem_SignTransactionReturnType,
} from 'viem'
import { signTransaction as viem_signTransaction } from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type { SelectChains } from '../types/chain.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from './getConnectorClient.js'

export type SignTransactionParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: Compute<
    Omit<
      viem_SignTransactionParameters<chains[key], Account, chains[key]>,
      'chain' | 'gas'
    > &
      ChainIdParameter<config, chainId> &
      ConnectorParameter
  >
}[number] & {
  /** Gas provided for transaction execution, or `null` to skip the prelude gas estimation. */
  gas?: TransactionRequest['gas'] | null
}

export type SignTransactionReturnType = viem_SignTransactionReturnType

export type SignTransactionErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_SignTransactionErrorType

/** https://wagmi.sh/core/api/actions/signTransaction */
export async function signTransaction<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: SignTransactionParameters<config, chainId>,
): Promise<SignTransactionReturnType> {
  const { account, chainId, connector, ...rest } = parameters

  let client: Client
  if (typeof account === 'object' && account.type === 'local')
    client = config.getClient({ chainId })
  else
    client = await getConnectorClient(config, {
      account: account ?? undefined,
      assertChainId: false,
      chainId,
      connector,
    })

  const chain = (() => {
    if (!chainId || client.chain?.id === chainId) return client.chain
    return { id: chainId }
  })()

  const action = getAction(client, viem_signTransaction, 'signTransaction')
  const signature = await action({
    ...(rest as any),
    ...(account ? { account } : {}),
    assertChainId: !!chainId,
    chain,
    gas: rest.gas ?? undefined,
  })

  return signature
}
