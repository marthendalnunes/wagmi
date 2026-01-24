'use client'

import { useMutation } from '@tanstack/react-query'
import type {
  Config,
  ResolvedRegister,
  SignTransactionErrorType,
} from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type SignTransactionData,
  type SignTransactionMutate,
  type SignTransactionMutateAsync,
  type SignTransactionOptions,
  type SignTransactionVariables,
  signTransactionMutationOptions,
} from '@wagmi/core/query'

import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSignTransactionParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<ConfigParameter<config> & SignTransactionOptions<config, context>>

export type UseSignTransactionReturnType<
  config extends Config = Config,
  context = unknown,
> = Compute<
  UseMutationReturnType<
    SignTransactionData,
    SignTransactionErrorType,
    SignTransactionVariables<config, config['chains'][number]['id']>,
    context,
    SignTransactionMutate<config, context>,
    SignTransactionMutateAsync<config, context>
  > & {
    /** @deprecated use `mutate` instead */
    signTransaction: SignTransactionMutate<config, context>
    /** @deprecated use `mutateAsync` instead */
    signTransactionAsync: SignTransactionMutateAsync<config, context>
  }
>

/** https://wagmi.sh/react/api/hooks/useSignTransaction */
export function useSignTransaction<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSignTransactionParameters<config, context> = {},
): UseSignTransactionReturnType<config, context> {
  const config = useConfig(parameters)
  const options = signTransactionMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseSignTransactionReturnType<config, context>
  return {
    ...(mutation as Return),
    signTransaction: mutation.mutate as Return['mutate'],
    signTransactionAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
