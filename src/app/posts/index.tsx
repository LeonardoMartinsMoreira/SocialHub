import { useQueryAuthenticated } from '@/src/hooks/useSetBearerAuthentication'
import { apiFirestore } from '@/src/services/api'
import React from 'react'
import { Text, View } from 'react-native'

const useGetList = () => {
  return useQueryAuthenticated({
    queryKey: ['posts'],
    queryFn: (config) => {
      return apiFirestore.get('/documents/posts', config).then(({ data }) => data)
    },
  })
}

export default function List() {
  const { data } = useGetList()

  console.log(data)

  return (
    <View>
      <Text>Lista</Text>
    </View>
  )
}
