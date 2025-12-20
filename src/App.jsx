import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './route.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthContextProvider from './context/AuthContext.jsx'

export default function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
      
    </QueryClientProvider>
  )
}
