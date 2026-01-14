import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './route.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import LanguageManager from './utils/LanguageManager.js'
import { CssBaseline, ThemeProvider } from '@mui/material'
import MainTheme from './theme/MainTheme.jsx'
import useThemeStore from './store/useThemeStore.js'

export default function App() {
  const queryClient = new QueryClient()
  const mode = useThemeStore((state)=>state.mode);
  const theme = MainTheme(mode);

  return (
    
      <QueryClientProvider client={queryClient}>
          <LanguageManager/>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
          </ThemeProvider>          
      </QueryClientProvider>
 
    
  )
}
