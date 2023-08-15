import { useState } from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CookiesProvider } from 'react-cookie';
import { RouterProvider} from 'react-router-dom';
import router from './routing/routes';
import './App.css'

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage';

function App() {
  const [count, setCount] = useState(0)
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
       <CookiesProvider>
        <RouterProvider router={router} />
      
       </CookiesProvider>

<ReactQueryDevtools></ReactQueryDevtools>
    </QueryClientProvider>
   
    
  )
}

export default App
