import { useMutationState, useQuery } from '@tanstack/react-query'

export const useQueryAuthenticated: typeof useQuery = ({ queryFn, enabled = true, ...firstArg }, ...args) => {
  const [dataFromMutation] = useMutationState({
    filters: { mutationKey: ['login'] },
    select: (mutation) => mutation.state.data,
  })

  return useQuery(
    {
      ...firstArg,
      enabled: enabled ? !!dataFromMutation?.idToken : false,
      queryFn:
        queryFn === undefined
          ? queryFn
          : (...data) => {
              return queryFn(
                {
                  headers: {
                    Authorization: `Bearer ${dataFromMutation?.idToken}`,
                  },
                },
                ...data,
              )
            },
    },
    ...args,
  )
}
