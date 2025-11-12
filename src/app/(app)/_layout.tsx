import { Stack } from 'expo-router'
import React from 'react'

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='(auth)' options={{headerShown: false}} />
      <Stack.Screen name='(public)' options={{headerShown: false}}/>
   </Stack>
  )
}

export default RootLayout