import { Check, Sparkles } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { usePatient } from '@/context/PatientContext'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/utils/cn'

export interface AccessibilityModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AccessibilityModal({ isOpen, onClose }: AccessibilityModalProps) {
  const { state, toggleAccessibility, setCaregiverMode } = usePatient()
  const { toast } = useToast()

  const handleToggle = (key: 'audioPrompts' | 'pictorialMode' | 'visualSignPrompts' | 'largeText', label: string) => {
    toggleAccessibility(key)
    const nextState = !state.accessibility[key]
    toast({
      title: `${label} ${nextState ? 'Enabled' : 'Disabled'}`,
      message: nextState
        ? `${label} mode is now active on this kiosk terminal.`
        : `${label} mode has been turned off.`,
      type: 'info',
    })
  }

  const handleCaregiverToggle = () => {
    const nextVal = !state.caregiverMode
    setCaregiverMode(nextVal)
    toast({
      title: nextVal ? 'Caregiver Mode Activated' : 'Caregiver Mode Deactivated',
      message: nextVal
        ? 'Responses will be flagged with: 👥 Reported by caregiver'
        : 'Reverted to direct patient response mode.',
      type: nextVal ? 'warning' : 'info',
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Terminal Accessibility Options"
      description="Customize sensory, cognitive, and physical interaction preferences for this intake session."
      size="lg"
    >
      <div className="space-y-4 pt-2">
        {/* Prototype notice */}
        <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200/80 rounded-2xl text-xs text-amber-800 font-medium">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Universal Accessibility Prototype • Ministry of AYUSH Standards</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* 1. Audio Prompts */}
          <div
            onClick={() => handleToggle('audioPrompts', 'Audio Prompts')}
            className={cn(
              'p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none group',
              state.accessibility.audioPrompts
                ? 'bg-ayush-surface border-ayush-primary shadow-2xs'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-2xs">
                  🔊
                </div>
                {state.accessibility.audioPrompts ? (
                  <Badge variant="ayush" size="sm">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="neutral" size="sm">
                    Off
                  </Badge>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900">Audio Prompts</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Spoken narration of all questions, clinical terms, and consent agreements in your chosen language.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-ayush-primary">
              <span>{state.accessibility.audioPrompts ? 'Tap to Disable' : 'Tap to Enable'}</span>
              {state.accessibility.audioPrompts && <Check className="w-4 h-4" />}
            </div>
          </div>

          {/* 2. Pictorial Mode */}
          <div
            onClick={() => handleToggle('pictorialMode', 'Pictorial Mode')}
            className={cn(
              'p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none group',
              state.accessibility.pictorialMode
                ? 'bg-ayush-surface border-ayush-primary shadow-2xs'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-2xs">
                  🖼️
                </div>
                {state.accessibility.pictorialMode ? (
                  <Badge variant="ayush" size="sm">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="neutral" size="sm">
                    Off
                  </Badge>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900">Pictorial Mode</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Replaces dense clinical questionnaires with visual cards and illustrative anatomical diagrams.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-ayush-primary">
              <span>{state.accessibility.pictorialMode ? 'Tap to Disable' : 'Tap to Enable'}</span>
              {state.accessibility.pictorialMode && <Check className="w-4 h-4" />}
            </div>
          </div>

          {/* 3. Visual / Sign Prompts */}
          <div
            onClick={() => handleToggle('visualSignPrompts', 'Visual / Sign Prompts')}
            className={cn(
              'p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none group',
              state.accessibility.visualSignPrompts
                ? 'bg-ayush-surface border-ayush-primary shadow-2xs'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-2xs">
                  🤟
                </div>
                {state.accessibility.visualSignPrompts ? (
                  <Badge variant="ayush" size="sm">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="neutral" size="sm">
                    Off
                  </Badge>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900">Visual / Sign Prompts</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Indian Sign Language (ISL) cue cards and motion-assisted guides for hard-of-hearing patients.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-ayush-primary">
              <span>{state.accessibility.visualSignPrompts ? 'Tap to Disable' : 'Tap to Enable'}</span>
              {state.accessibility.visualSignPrompts && <Check className="w-4 h-4" />}
            </div>
          </div>

          {/* 4. Large Text */}
          <div
            onClick={() => handleToggle('largeText', 'Large Text Mode')}
            className={cn(
              'p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none group',
              state.accessibility.largeText
                ? 'bg-ayush-surface border-ayush-primary shadow-2xs'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-2xs">
                  🔤
                </div>
                {state.accessibility.largeText ? (
                  <Badge variant="ayush" size="sm">
                    Active (120%)
                  </Badge>
                ) : (
                  <Badge variant="neutral" size="sm">
                    Default (100%)
                  </Badge>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900">Large Text</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Increases interface typography size and contrast across every questionnaire component.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-ayush-primary">
              <span>{state.accessibility.largeText ? 'Tap to Reset' : 'Tap to Scale Up'}</span>
              {state.accessibility.largeText && <Check className="w-4 h-4" />}
            </div>
          </div>
        </div>

        {/* 5. Caregiver Mode Toggle */}
        <div
          onClick={handleCaregiverToggle}
          className={cn(
            'p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between select-none mt-2',
            state.caregiverMode
              ? 'bg-purple-50 border-purple-300 shadow-2xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          )}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white border border-purple-200 flex items-center justify-center text-2xl shadow-2xs shrink-0">
              👨‍👩‍👧
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Caregiver Mode</h3>
                {state.caregiverMode && (
                  <Badge variant="neutral" size="sm" className="bg-purple-100 text-purple-800 font-bold border-purple-300">
                    👥 Active
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Answer on behalf of a patient. Flags all recorded complaints as proxy-reported.
              </p>
            </div>
          </div>

          <Button
            variant={state.caregiverMode ? 'primary' : 'outline'}
            size="sm"
            className={state.caregiverMode ? 'bg-purple-700 hover:bg-purple-800 border-purple-700 text-white' : ''}
          >
            {state.caregiverMode ? 'Active' : 'Enable'}
          </Button>
        </div>

        <div className="pt-3 flex justify-end">
          <Button variant="primary" size="md" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  )
}
