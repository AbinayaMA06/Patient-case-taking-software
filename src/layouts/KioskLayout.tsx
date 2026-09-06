import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Home, HelpCircle, Volume2 } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { ProgressStepper } from '@/components/ui/ProgressStepper'
import { Button } from '@/components/ui/Button'
import { ToastContainer } from '@/components/ui/Toast'
import { useToast } from '@/hooks/useToast'

export function KioskLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()

  const handleVoiceAssist = () => {
    toast({
      title: 'Voice Assistant Active',
      message: 'Audio instructions enabled in your preferred language.',
      type: 'info',
    })
  }

  const handleHelp = () => {
    toast({
      title: 'Kiosk Attendant Alerted',
      message: 'A hospital intake assistant has been notified to assist you at this terminal.',
      type: 'warning',
    })
  }

  const isTokenPage = location.pathname.includes('/token')

  return (
    <div className="min-h-screen flex flex-col bg-ayush-warm-bg text-slate-800 antialiased select-none">
      <Header />

      {/* Patient Stepper Bar */}
      {!isTokenPage && <ProgressStepper interactive={true} />}

      {/* Kiosk Floating Action Banner / Controls */}
      <div className="bg-white border-b border-ayush-border py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              leftIcon={<Home className="w-4 h-4" />}
              className="hidden sm:inline-flex"
            >
              Cancel Intake
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleVoiceAssist}
              leftIcon={<Volume2 className="w-4 h-4 text-ayush-primary" />}
            >
              <span className="hidden sm:inline">Voice Assistant</span>
              <span className="sm:hidden">Audio</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleHelp}
              leftIcon={<HelpCircle className="w-4 h-4 text-amber-600" />}
            >
              Need Help?
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col">
        <Outlet />
      </main>

      {/* Accessible Kiosk Footer Info */}
      <footer className="w-full bg-white border-t border-slate-200 py-3 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Terminal ID: <strong>AYUSH-KIOSK-04</strong> • AI Engine v2.4</span>
          <span>In case of emergency, please approach the triage nurse directly.</span>
        </div>
      </footer>

      <ToastContainer />
    </div>
  )
}
