'use client'

import { useMutation } from '@tanstack/react-query'
import type {
  Config,
  ResolvedRegister,
  SendRawTransactionErrorType,
} from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type SendRawTransactionData,
  type SendRawTransactionMutate,
  type SendRawTransactionMutateAsync,
  type SendRawTransactionOptions,
  type SendRawTransactionVariables,
  sendRawTransactionMutationOptions,
} from '@wagmi/core/query'

import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSendRawTransactionParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<
  ConfigParameter<config> & SendRawTransactionOptions<config, context>
>

export type UseSendRawTransactionReturnType<
  config extends Config = Config,
  context = unknown,
> = Compute<
  UseMutationReturnType<
    SendRawTransactionData,
    SendRawTransactionErrorType,
    SendRawTransactionVariables<config, config['chains'][number]['id']>,
    context,
    SendRawTransactionMutate<config, context>,
    SendRawTransactionMutateAsync<config, context>
  > & {
    /** @deprecated use `mutate` instead */
    sendRawTransaction: SendRawTransactionMutate<config, context>
    /** @deprecated use `mutateAsync` instead */
    sendRawTransactionAsync: SendRawTransactionMutateAsync<config, context>
  }
>

/** https://wagmi.sh/react/api/hooks/useSendRawTransaction */
export function useSendRawTransaction<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSendRawTransactionParameters<config, context> = {},
): UseSendRawTransactionReturnType<config, context> {
  const config = useConfig(parameters)
  const options = sendRawTransactionMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseSendRawTransactionReturnType<config, context>
  return {
    ...(mutation as Return),
    sendRawTransaction: mutation.mutate as Return['mutate'],
    sendRawTransactionAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
