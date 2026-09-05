import { Check, ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/utils/cn'
import type { PatientJourneyStep, StepItem } from '@/types'

export const PATIENT_STEPS: StepItem[] = [
  { id: 'identify', title: 'Identification', subtitle: 'ABHA / Mobile', path: '/patient/identify' },
  { id: 'consent', title: 'Consent', subtitle: 'Data & Privacy', path: '/patient/consent' },
  { id: 'language', title: 'Language', subtitle: 'Preferred Dialect', path: '/patient/language' },
  { id: 'history', title: 'Clinical History', subtitle: 'AI Voice & Symptoms', path: '/patient/history' },
  { id: 'ayush', title: 'AYUSH Assessment', subtitle: 'Prakriti & Agni', path: '/patient/ayush' },
  { id: 'jihva', title: 'Jihva Pariksha', subtitle: 'Tongue Analysis', path: '/patient/jihva' },
  { id: 'nadi', title: 'Nadi Assessment', subtitle: 'Pulse Dynamics', path: '/patient/nadi' },
  { id: 'documents', title: 'Documents', subtitle: 'Upload & OCR', path: '/patient/documents' },
  { id: 'summary', title: 'Review Summary', subtitle: 'Traceable Notes', path: '/patient/summary' },
  { id: 'token', title: 'Token Slip', subtitle: 'Consultation Pass', path: '/patient/token' },
]

export interface ProgressStepperProps {
  currentStepId?: PatientJourneyStep
  className?: string
  interactive?: boolean
}

export function ProgressStepper({
  currentStepId,
  className,
  interactive = true,
}: ProgressStepperProps) {
  const location = useLocation()

  // Determine current step index from location path or passed prop
  const activeIndex = PATIENT_STEPS.findIndex((s) =>
    currentStepId ? s.id === currentStepId : location.pathname.startsWith(s.path)
  )

  const effectiveIndex = activeIndex >= 0 ? activeIndex : 0

  return (
    <div className={cn('w-full bg-white border-y border-ayush-border/70 py-3 shadow-2xs', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Mobile Mini Indicator */}
        <div className="flex sm:hidden items-center justify-between py-1">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-ayush-primary text-white text-xs font-bold">
              {effectiveIndex + 1}
            </span>
            <div>
              <p className="text-xs font-bold text-slate-800">
                {PATIENT_STEPS[effectiveIndex]?.title}
              </p>
              <p className="text-[11px] text-slate-500">
                Step {effectiveIndex + 1} of {PATIENT_STEPS.length}
              </p>
            </div>
          </div>
          <div className="text-xs font-semibold text-ayush-primary bg-ayush-surface px-2.5 py-1 rounded-full border border-ayush-border">
            {Math.round(((effectiveIndex + 1) / PATIENT_STEPS.length) * 100)}% Complete
          </div>
        </div>

        {/* Desktop / Tablet Full Stepper */}
        <div className="hidden sm:flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {PATIENT_STEPS.map((step, idx) => {
            const isCompleted = idx < effectiveIndex
            const isCurrent = idx === effectiveIndex
            const isUpcoming = idx > effectiveIndex

            const content = (
              <div
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-xl transition-all select-none whitespace-nowrap',
                  isCurrent && 'bg-ayush-surface border border-ayush-primary/30 shadow-2xs',
                  isCompleted && 'text-slate-700 hover:bg-slate-50',
                  isUpcoming && 'text-slate-400 opacity-60'
                )}
              >
                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors',
                    isCompleted && 'bg-emerald-600 text-white',
                    isCurrent && 'bg-ayush-primary text-white ring-2 ring-ayush-primary/20',
                    isUpcoming && 'bg-slate-200 text-slate-600'
                  )}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                </div>
                <div className="text-left">
                  <span
                    className={cn(
                      'text-xs font-bold block leading-tight',
                      isCurrent ? 'text-ayush-primary' : 'text-slate-700'
                    )}
                  >
                    {step.title}
                  </span>
                  <span className="text-[10px] text-slate-500 block leading-tight">
                    {step.subtitle}
                  </span>
                </div>
              </div>
            )

            return (
              <div key={step.id} className="flex items-center shrink-0">
                {interactive ? (
                  <Link to={step.path} className="focus:outline-none">
                    {content}
                  </Link>
                ) : (
                  content
                )}
                {idx < PATIENT_STEPS.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-300 mx-0.5 shrink-0" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
