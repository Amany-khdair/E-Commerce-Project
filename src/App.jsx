import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './route.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import LanguageManager from './utils/LanguageManager.js'

export default function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
        <LanguageManager/>
        <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
