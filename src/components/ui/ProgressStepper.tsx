import { Check, ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/utils/cn'
import type { PatientJourneyStep, StepItem } from '@/types'

export const PATIENT_STEPS: StepItem[] = [
  { id: 'identify', title: 'Identify', subtitle: 'ABHA / Mode', path: '/patient/identify' },
  { id: 'consent', title: 'Consent', subtitle: 'Privacy & Rights', path: '/patient/consent' },
  { id: 'language', title: 'Language', subtitle: 'Dialect & Mode', path: '/patient/language' },
  { id: 'history', title: 'History', subtitle: 'Clinical Dialogue', path: '/patient/history' },
  { id: 'ayush', title: 'AYUSH', subtitle: 'Prakriti & Vitals', path: '/patient/ayush' },
  { id: 'documents', title: 'Documents', subtitle: 'Medical OCR', path: '/patient/documents' },
  { id: 'summary', title: 'Summary', subtitle: 'Review Draft', path: '/patient/summary' },
  { id: 'token', title: 'Token', subtitle: 'Consultation Slip', path: '/patient/token' },
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
  const getActiveIndex = () => {
    if (currentStepId) {
      const idx = PATIENT_STEPS.findIndex((s) => s.id === currentStepId)
      if (idx !== -1) return idx
    }
    const path = location.pathname
    if (path.startsWith('/patient/identify')) return 0
    if (path.startsWith('/patient/consent')) return 1
    if (path.startsWith('/patient/language')) return 2
    if (path.startsWith('/patient/history')) return 3
    if (path.startsWith('/patient/ayush') || path.startsWith('/patient/jihva') || path.startsWith('/patient/nadi')) return 4
    if (path.startsWith('/patient/documents')) return 5
    if (path.startsWith('/patient/summary')) return 6
    if (path.startsWith('/patient/token')) return 7
    return 0
  }

  const effectiveIndex = getActiveIndex()

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
        <div className="hidden sm:flex items-center gap-1 overflow-x-auto py-1 scrollbar-none justify-between">
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
