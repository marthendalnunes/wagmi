import type { MutateOptions, MutationOptions } from '@tanstack/query-core'

import {
  type SignTransactionErrorType,
  type SignTransactionParameters,
  type SignTransactionReturnType,
  signTransaction,
} from '../actions/signTransaction.js'
import type { Config } from '../createConfig.js'
import type { MutationParameter } from '../types/query.js'
import type { Compute } from '../types/utils.js'

export type SignTransactionOptions<
  config extends Config,
  context = unknown,
> = MutationParameter<
  SignTransactionData,
  SignTransactionErrorType,
  SignTransactionVariables<config, config['chains'][number]['id']>,
  context
>

export function signTransactionMutationOptions<config extends Config, context>(
  config: config,
  options: SignTransactionOptions<config, context> = {},
): SignTransactionMutationOptions<config> {
  return {
    ...(options.mutation as any),
    mutationFn(variables) {
      return signTransaction(config, variables)
    },
    mutationKey: ['signTransaction'],
  }
}

export type SignTransactionMutationOptions<config extends Config> =
  MutationOptions<
    SignTransactionData,
    SignTransactionErrorType,
    SignTransactionVariables<config, config['chains'][number]['id']>
  >

export type SignTransactionData = Compute<SignTransactionReturnType>

export type SignTransactionVariables<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = SignTransactionParameters<config, chainId>

export type SignTransactionMutate<config extends Config, context = unknown> = <
  chainId extends config['chains'][number]['id'],
>(
  variables: SignTransactionVariables<config, chainId>,
  options?:
    | Compute<
        MutateOptions<
          SignTransactionData,
          SignTransactionErrorType,
          Compute<SignTransactionVariables<config, chainId>>,
          context
        >
      >
    | undefined,
) => void

export type SignTransactionMutateAsync<
  config extends Config,
  context = unknown,
> = <chainId extends config['chains'][number]['id']>(
  variables: SignTransactionVariables<config, chainId>,
  options?:
    | Compute<
        MutateOptions<
          SignTransactionData,
          SignTransactionErrorType,
          Compute<SignTransactionVariables<config, chainId>>,
          context
        >
      >
    | undefined,
) => Promise<SignTransactionData>
