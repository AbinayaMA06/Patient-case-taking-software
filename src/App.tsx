import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from '@/hooks/useToast'
import { PatientProvider } from '@/context/PatientContext'
import { AppRoutes } from '@/routes/AppRoutes'

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <PatientProvider>
          <AppRoutes />
        </PatientProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
