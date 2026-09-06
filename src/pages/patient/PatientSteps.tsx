import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Mic,
  Upload,
  FileCheck,
  Printer,
  Sparkles,
  QrCode,
  Heart,
  Camera,
  Users,
  UserPlus,
  Volume2,
  VolumeX,
  AlertCircle,
  Check,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/hooks/useToast'
import { usePatient } from '@/context/PatientContext'
import { MOCK_DETAILED_PATIENT } from '@/data/mockData'

// Helper for Navigation Footer on Steps
function StepNav({
  prevPath,
  nextPath,
  nextLabel = 'Save & Continue',
  onNext,
}: {
  prevPath?: string
  nextPath?: string
  nextLabel?: string
  onNext?: () => void
}) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-6 mt-6 border-t border-slate-100">
      {prevPath ? (
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate(prevPath)}
          leftIcon={<ArrowLeft className="w-5 h-5" />}
          className="w-full sm:w-auto"
        >
          Previous Step
        </Button>
      ) : (
        <div />
      )}
      {nextPath && (
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            if (onNext) onNext()
            navigate(nextPath)
          }}
          rightIcon={<ArrowRight className="w-5 h-5" />}
          className="w-full sm:w-auto"
        >
          {nextLabel}
        </Button>
      )}
    </div>
  )
}

// 1. Identify Screen (Segment 2: ABHA, New Patient, Caregiver / Proxy)
export function StepIdentify() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isProxyParam = searchParams.get('proxy') === 'true'
  const { toast } = useToast()
  const {
    state,
    setPatientType,
    setPatientBasicInfo,
    setAbhaId,
    verifyMockAbha,
    setReturningDeltaChoice,
    setCaregiverRelationship,
    setCaregiverMode,
  } = usePatient()

  // Local view mode
  const [activeTab, setActiveTab] = useState<'abha' | 'new' | 'caregiver'>(
    isProxyParam ? 'caregiver' : state.patientType || 'abha'
  )
  const [inputAbha, setInputAbha] = useState(state.abhaDemoId || '91-4829-1029-4820')
  const [newName, setNewName] = useState(state.patientType === 'new' ? state.patientName : '')
  const [newAge, setNewAge] = useState(state.age || '32')
  const [newGender, setNewGender] = useState(state.gender || 'Female')

  const relationshipOptions = [
    'Parent',
    'Child',
    'Spouse',
    'Relative',
    'Caregiver',
    'Other',
  ]

  const handleSelectTab = (tab: 'abha' | 'new' | 'caregiver') => {
    setActiveTab(tab)
    setPatientType(tab)
    if (tab === 'caregiver') {
      setCaregiverMode(true)
    } else {
      setCaregiverMode(false)
    }
  }

  const handleVerifyAbha = () => {
    verifyMockAbha(inputAbha)
    toast({
      title: '👋 Returning Patient Detected',
      message: 'Found previous clinical record for Lakshmi Devi. Verify details below.',
      type: 'success',
    })
  }

  const handleDeltaChoice = (choice: 'unchanged' | 'changed') => {
    setReturningDeltaChoice(choice)
    toast({
      title: choice === 'unchanged' ? 'Delta Mode: No Changes' : 'Delta Mode: Symptoms Updated',
      message:
        choice === 'unchanged'
          ? 'Fast-tracking intake: Previous baseline will be presented for physician review.'
          : 'Intake will focus on what has changed since 12 August 2026.',
      type: 'info',
    })
    navigate('/patient/consent')
  }

  const handleCaregiverSwitchForReturning = () => {
    setActiveTab('caregiver')
    setCaregiverMode(true)
    toast({
      title: 'Caregiver Mode Activated',
      message: 'Now recording on behalf of patient Lakshmi Devi.',
      type: 'info',
    })
  }

  const handleProceedNewPatient = () => {
    if (!newName.trim()) {
      toast({
        title: 'Please Enter Patient Name',
        message: 'A patient name is required to initialize the clinical record.',
        type: 'warning',
      })
      return
    }
    setPatientBasicInfo(newName.trim(), newAge, newGender)
    navigate('/patient/consent')
  }

  const handleProceedCaregiver = () => {
    if (!state.caregiverRelationship) {
      setCaregiverRelationship('Caregiver')
    }
    if (newName.trim()) {
      setPatientBasicInfo(newName.trim(), newAge, newGender)
    }
    navigate('/patient/consent')
  }

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <Card variant="default" className="rounded-3xl border-ayush-border/80 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <Badge variant="ayush">Step 1 of 8 • Patient Identification</Badge>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ABDM Sandbox Prototype
            </span>
          </div>
          <CardTitle className="text-3xl font-extrabold text-slate-900 mt-2">
            Identify Yourself
          </CardTitle>
          <CardDescription className="text-base text-slate-600">
            Choose your intake method to begin or resume your clinical consultation history.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Three Option Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleSelectTab('abha')}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                activeTab === 'abha'
                  ? 'bg-ayush-surface border-ayush-primary shadow-xs ring-2 ring-ayush-primary/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <QrCode className="w-6 h-6 text-emerald-700" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                  Returning
                </span>
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">1. ABHA ID</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Quick verify with digital health account</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleSelectTab('new')}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                activeTab === 'new'
                  ? 'bg-ayush-surface border-ayush-primary shadow-xs ring-2 ring-ayush-primary/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <UserPlus className="w-6 h-6 text-sky-700" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 bg-sky-100/80 px-2 py-0.5 rounded-md">
                  First Time
                </span>
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">2. New Patient</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Create your first clinical profile</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleSelectTab('caregiver')}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                activeTab === 'caregiver'
                  ? 'bg-purple-50 border-purple-500 shadow-xs ring-2 ring-purple-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Users className="w-6 h-6 text-purple-700" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100/80 px-2 py-0.5 rounded-md">
                  Assisted
                </span>
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">3. Caregiver / Proxy</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Answering on behalf of a relative</div>
              </div>
            </button>
          </div>

          {/* TAB 1: ABHA ID Flow */}
          {activeTab === 'abha' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-5 bg-white rounded-2xl border border-ayush-border space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-800">
                    ABHA ID
                  </label>
                  <span className="text-xs text-slate-400">14-digit number or username@abdm</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <Input
                    placeholder="Enter ABHA ID (e.g. 91-4829-1029-4820)"
                    value={inputAbha}
                    onChange={(e) => {
                      setInputAbha(e.target.value)
                      setAbhaId(e.target.value)
                    }}
                    kioskSize
                    className="flex-1 font-mono text-base"
                    leftIcon={<QrCode className="w-5 h-5 text-ayush-primary" />}
                  />
                  <Button
                    variant="primary"
                    size="kiosk"
                    onClick={handleVerifyAbha}
                    className="w-full sm:w-auto min-w-35 font-bold shrink-0"
                  >
                    Verify ABHA
                  </Button>
                </div>

                {/* Explicit Prototype Disclaimer as required */}
                <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Prototype Notice:</strong> This terminal uses mock verification for SIH 2026 demonstration. It is not connected to the live national ABHA production servers.
                  </span>
                </div>
              </div>

              {/* RETURNING PATIENT SCENARIO (Lakshmi Devi) */}
              {state.isReturningPatient ? (
                <div className="p-6 bg-ayush-surface rounded-3xl border-2 border-ayush-primary/30 space-y-5 animate-in slide-in-from-top-3 duration-200 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">👋</span>
                        <h3 className="text-xl font-extrabold text-slate-900">
                          Returning Patient Detected
                        </h3>
                      </div>
                      <p className="text-sm text-slate-600 italic mt-1">
                        “Welcome back. We found your previous clinical history.”
                      </p>
                    </div>
                    <Badge variant="ayush" size="md">
                      Record Verified
                    </Badge>
                  </div>

                  {/* Previous clinical summary card */}
                  <div className="p-4 bg-white rounded-2xl border border-ayush-border grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block uppercase font-bold text-[10px]">Patient Name</span>
                      <span className="font-bold text-slate-900 text-sm">{state.patientName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase font-bold text-[10px]">Last Visit</span>
                      <span className="font-bold text-slate-900 text-sm">{state.previousHistory.lastVisit}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase font-bold text-[10px]">Previous Concern</span>
                      <span className="font-semibold text-emerald-800">{state.previousHistory.previousConcern}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase font-bold text-[10px]">Previous Medication</span>
                      <span className="font-semibold text-slate-700">{state.previousHistory.previousMedication}</span>
                    </div>
                  </div>

                  {/* Delta Mode Inquiry */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-base font-extrabold text-slate-900 text-center sm:text-left">
                      “Has anything changed since your last visit?”
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Button
                        variant="primary"
                        size="kiosk"
                        onClick={() => handleDeltaChoice('unchanged')}
                        className="w-full text-sm font-bold justify-center"
                      >
                        Nothing has changed
                      </Button>

                      <Button
                        variant="secondary"
                        size="kiosk"
                        onClick={() => handleDeltaChoice('changed')}
                        className="w-full text-sm font-bold justify-center"
                      >
                        Yes, something has changed
                      </Button>

                      <Button
                        variant="outline"
                        size="kiosk"
                        onClick={handleCaregiverSwitchForReturning}
                        className="w-full text-sm font-bold justify-center text-purple-700 border-purple-300 hover:bg-purple-50"
                      >
                        I am a caregiver
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm space-y-2">
                  <p>Click <strong>Verify ABHA</strong> above to load the returning patient simulation for Lakshmi Devi.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: New Patient Flow */}
          {activeTab === 'new' && (
            <div className="p-6 bg-white rounded-3xl border border-ayush-border space-y-5 animate-in fade-in duration-150">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-emerald-900 text-sm font-medium">
                “Welcome to MediKiosk. Let's create your clinical history.”
              </div>

              <div className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="Enter patient full name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  kioskSize
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Age (Years)"
                    type="number"
                    value={newAge}
                    onChange={(e) => setNewAge(e.target.value)}
                    kioskSize
                  />
                  <div className="space-y-1.5">
                    <label className="block text-base font-semibold text-slate-700">
                      Gender
                    </label>
                    <select
                      value={newGender}
                      onChange={(e) => setNewGender(e.target.value)}
                      className="w-full min-h-[58px] text-base px-4 bg-white border border-slate-300 rounded-2xl focus:border-ayush-primary focus:outline-none"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  variant="primary"
                  size="kiosk"
                  onClick={handleProceedNewPatient}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="w-full sm:w-auto min-w-50"
                >
                  Continue to Consent
                </Button>
              </div>
            </div>
          )}

          {/* TAB 3: Caregiver / Proxy Flow */}
          {activeTab === 'caregiver' && (
            <div className="p-6 bg-white rounded-3xl border border-purple-200 space-y-5 animate-in fade-in duration-150">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="neutral" className="bg-purple-100 text-purple-800 border-purple-300">
                    Caregiver Mode Active
                  </Badge>
                  <span className="text-xs font-bold text-purple-700">👥 Reported by caregiver</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                  Caregiver Mode
                </h3>
                <p className="text-base text-slate-600 font-medium italic">
                  “Are you answering on behalf of the patient?”
                </p>
              </div>

              {/* Relationship Picker */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">
                  Select Your Relationship to Patient
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {relationshipOptions.map((rel) => {
                    const isSelected = state.caregiverRelationship === rel
                    return (
                      <button
                        key={rel}
                        type="button"
                        onClick={() => setCaregiverRelationship(rel)}
                        className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-purple-700 text-white border-purple-700 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-purple-50'
                        }`}
                      >
                        <span>{rel}</span>
                        {isSelected && <Check className="w-4 h-4" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Patient details under proxy */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <Input
                  label="Patient Name"
                  placeholder="Enter patient full name"
                  value={newName || state.patientName}
                  onChange={(e) => {
                    setNewName(e.target.value)
                    setPatientBasicInfo(e.target.value, state.age, state.gender)
                  }}
                  kioskSize
                />
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900 font-medium">
                  Notice: Every subsequent caregiver-entered response will be permanently stamped: <strong>👥 Reported by caregiver</strong>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  variant="primary"
                  size="kiosk"
                  onClick={handleProceedCaregiver}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="w-full sm:w-auto min-w-50 bg-purple-700 hover:bg-purple-800 border-purple-700"
                >
                  Continue to Consent
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-4 text-xs text-slate-400">
            <span>Terminal: AYUSH-KIOSK-04</span>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-ayush-primary hover:underline font-semibold"
            >
              Switch Portal Role
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 2. Consent Screen (Segment 2: Your Privacy Matters, Audio Listen, Status)
export function StepConsent() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { state, setConsent } = usePatient()
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  const handleListenConsent = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const text =
        'Your privacy matters at MediKiosk. Point one: Your information will help prepare your clinical history. Point two: You can review and correct information. Point three: AI generated information is only a draft. Point four: A certified physician must verify the information. Point five: Consent can be revoked where applicable.'
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.95
      utterance.onstart = () => setIsPlayingAudio(true)
      utterance.onend = () => setIsPlayingAudio(false)
      utterance.onerror = () => setIsPlayingAudio(false)
      window.speechSynthesis.speak(utterance)
    } else {
      setIsPlayingAudio(true)
      setTimeout(() => setIsPlayingAudio(false), 4000)
    }

    toast({
      title: '🔊 Playing Audio Consent',
      message: 'Reading consent guidelines aloud in your selected language.',
      type: 'info',
    })
  }

  const handleStopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsPlayingAudio(false)
  }

  const handleGiveConsent = () => {
    setConsent(true)
    handleStopAudio()
    toast({
      title: 'Consent Granted',
      message: 'Your consent has been recorded. Proceeding to language preference.',
      type: 'success',
    })
    navigate('/patient/language')
  }

  const handleDecline = () => {
    setConsent(false)
    handleStopAudio()
    toast({
      title: 'Digital Consent Declined',
      message:
        'You may approach the reception counter for non-digital paper-based registration.',
      type: 'warning',
    })
  }

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <Card variant="default" className="rounded-3xl border-ayush-border/80 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <Badge variant="ayush">Step 2 of 8 • Patient Consent</Badge>
            {/* Live Consent Status Indicator as required */}
            <Badge
              variant={state.consentGiven ? 'ayush' : 'saffron'}
              size="md"
              className={state.consentGiven ? 'bg-emerald-100 text-emerald-800' : ''}
            >
              Consent Status: {state.consentGiven ? 'Given' : 'Not Given'}
            </Badge>
          </div>

          <CardTitle className="text-3xl font-extrabold text-slate-900 mt-2">
            Your Privacy Matters
          </CardTitle>

          {state.caregiverMode && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold border border-purple-200 mt-1">
              <Users className="w-3.5 h-3.5" />
              <span>👥 Reported by caregiver ({state.caregiverRelationship || 'Proxy'})</span>
            </div>
          )}

          <CardDescription className="text-base text-slate-600">
            Please read or listen to the digital health rights and clinical intake consent clauses below.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Five Explanations Specified */}
          <div className="bg-ayush-surface/70 p-6 rounded-2xl border border-ayush-border space-y-4 text-sm text-slate-700 leading-relaxed">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </div>
              <p>
                <strong>Clinical History Preparation:</strong> Your information will help prepare your clinical history for your attending AYUSH physician.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </div>
              <p>
                <strong>Full Review & Correction:</strong> You can review and correct all information at any stage before generating your OPD pass.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                3
              </div>
              <p>
                <strong>Draft Status:</strong> AI-generated information is only a draft to assist clinical communication and does not prescribe medicine.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                4
              </div>
              <p>
                <strong>Physician Verification:</strong> A certified doctor must verify and sign the information before starting any treatment.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                5
              </div>
              <p>
                <strong>Revocable Rights:</strong> Consent can be revoked where applicable in accordance with ABDM health guidelines.
              </p>
            </div>
          </div>

          {/* Audio read-aloud button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isPlayingAudio ? 'bg-amber-100 text-amber-700 animate-pulse' : 'bg-ayush-surface text-ayush-primary'}`}>
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">
                  {isPlayingAudio ? 'Reading Consent Aloud...' : 'Need Audio Assistance?'}
                </div>
                <div className="text-xs text-slate-500">
                  Listen to all 5 clauses spoken in clear voice audio.
                </div>
              </div>
            </div>

            {isPlayingAudio ? (
              <Button
                variant="outline"
                size="md"
                onClick={handleStopAudio}
                leftIcon={<VolumeX className="w-4 h-4 text-rose-600" />}
                className="w-full sm:w-auto"
              >
                Stop Audio
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="md"
                onClick={handleListenConsent}
                leftIcon={<Volume2 className="w-4 h-4 text-ayush-primary" />}
                className="w-full sm:w-auto"
              >
                🔊 Listen to Consent
              </Button>
            )}
          </div>

          {/* Action Buttons: I Understand & Give Consent / Decline */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <Button
              variant="outline"
              size="kiosk"
              onClick={handleDecline}
              className="w-full sm:w-auto text-slate-600 hover:text-rose-700"
            >
              Decline
            </Button>

            <Button
              variant="primary"
              size="kiosk"
              onClick={handleGiveConsent}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto min-w-60 font-bold"
            >
              I Understand & Give Consent
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 3. Language Screen (Segment 2: 7 Indian Languages, 3 Input Modalities)
export function StepLanguage() {
  const { toast } = useToast()
  const { state, setSelectedLanguage, setInputMode } = usePatient()

  // 7 Languages specified in prompt
  const languagesList = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  ]

  const inputModes = [
    {
      id: 'speak' as const,
      title: 'Speak',
      icon: '🎙️',
      desc: 'Speak naturally in your dialect',
    },
    {
      id: 'type' as const,
      title: 'Type',
      icon: '⌨️',
      desc: 'Type with touchscreen keyboard',
    },
    {
      id: 'tap' as const,
      title: 'Tap',
      icon: '👆',
      desc: 'Tap visual pictorial options',
    },
  ]

  const handleSelectLanguage = (langName: string) => {
    setSelectedLanguage(langName)
    toast({
      title: `Language set to ${langName}`,
      message: 'Onscreen prompts and voice assistant calibrated.',
      type: 'info',
    })
  }

  const handleSelectMode = (mode: 'speak' | 'type' | 'tap') => {
    setInputMode(mode)
    toast({
      title: `Input Mode: ${mode.toUpperCase()}`,
      message: 'You can switch between modes at any point during intake.',
      type: 'info',
    })
  }

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <Card variant="default" className="rounded-3xl border-ayush-border/80 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <Badge variant="ayush">Step 3 of 8 • Language & Input Selection</Badge>
            {state.caregiverMode && (
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                👥 Reported by caregiver
              </span>
            )}
          </div>

          <CardTitle className="text-3xl font-extrabold text-slate-900 mt-2">
            Choose Your Language
          </CardTitle>

          <CardDescription className="text-base text-slate-600">
            Select your preferred conversational tongue for questions and voice guidance.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* 7 Touchscreen-Friendly Language Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {languagesList.map((lang) => {
              const isSelected = state.selectedLanguage === lang.name
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.name)}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 touch-target-kiosk select-none ${
                    isSelected
                      ? 'bg-ayush-surface border-ayush-primary shadow-xs ring-2 ring-ayush-primary/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl font-black text-slate-900 leading-tight">
                    {lang.native}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {lang.name}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 mt-0.5"></span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Section: How would you like to answer? */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                How would you like to answer?
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                The user can switch between modes later at any step.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {inputModes.map((m) => {
                const isSelected = state.inputMode === m.id
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleSelectMode(m.id)}
                    className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-between touch-target-kiosk select-none ${
                      isSelected
                        ? 'bg-ayush-surface border-ayush-primary shadow-xs ring-2 ring-ayush-primary/20'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-3xl mb-1">{m.icon}</span>
                    <span className="text-base font-bold text-slate-900">{m.title}</span>
                    <span className="text-xs text-slate-500 mt-0.5 leading-snug">{m.desc}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <StepNav
            prevPath="/patient/consent"
            nextPath="/patient/history"
            nextLabel="Continue to AI Clinical History"
          />
        </CardContent>
      </Card>
    </div>
  )
}

// 4. Clinical History Screen
export function StepHistory() {
  const { state } = usePatient()
  const [complaint, setComplaint] = useState(
    state.isReturningPatient && state.previousHistory
      ? `Follow-up regarding ${state.previousHistory.previousConcern}. Patient notes progressive improvement with demo medication.`
      : 'Bilateral knee joint pain (Janu Sandhigata Vata), worsening in morning stiffness and cold season.'
  )
  const [duration, setDuration] = useState('3 months')
  const [isListening, setIsListening] = useState(false)
  const { toast } = useToast()

  const handleToggleVoice = () => {
    if (!isListening) {
      setIsListening(true)
      toast({
        title: 'Microphone Active',
        message: `Listening... Please describe your symptoms naturally in ${state.selectedLanguage}.`,
        type: 'info',
      })
      setTimeout(() => {
        setIsListening(false)
        toast({
          title: 'Symptoms Transcribed',
          message: 'Voice recorded and parsed into structured clinical entities.',
          type: 'success',
        })
      }, 3000)
    } else {
      setIsListening(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="ayush">Step 4 of 8 • AI Clinical History</Badge>
            <div className="flex items-center gap-2">
              {state.caregiverMode && (
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                  👥 Reported by caregiver ({state.caregiverRelationship})
                </span>
              )}
              <Badge variant="default">
                {state.inputMode === 'speak' ? '🎙️ Voice Active' : state.inputMode === 'type' ? '⌨️ Keyboard' : '👆 Touch'}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-2xl mt-2">
            What Brings You to the Hospital Today?
          </CardTitle>
          <CardDescription>
            {state.caregiverMode
              ? `Reporting on behalf of ${state.patientName}. Speak or describe current symptoms in ${state.selectedLanguage}.`
              : `Speak or type your chief health concerns in ${state.selectedLanguage}. The AI will extract clinical details and screen for urgent red flags.`}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Returning Patient History Banner */}
          {state.isReturningPatient && state.previousHistory && (
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold block text-sm">👋 Returning Patient Context: {state.patientName}</span>
                <span>
                  Last Visit: {state.previousHistory.lastVisit} • Previous Concern: {state.previousHistory.previousConcern} • Rx: {state.previousHistory.previousMedication}
                </span>
              </div>
              <Badge variant="saffron" size="sm" className="self-start sm:self-auto shrink-0">
                Prior Visit Linked
              </Badge>
            </div>
          )}

          {/* Voice input button banner */}
          <div className="p-6 rounded-3xl bg-ayush-surface border-2 border-dashed border-ayush-primary/40 flex flex-col items-center text-center space-y-3">
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`w-18 h-18 rounded-full flex items-center justify-center shadow-md transition-all ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse ring-8 ring-rose-200'
                  : 'bg-ayush-primary text-white hover:bg-ayush-primary-dark active:scale-95'
              }`}
              aria-label="Tap to speak symptoms"
            >
              <Mic className="w-8 h-8" />
            </button>
            <div>
              <p className="font-bold text-slate-800 text-base">
                {isListening ? `Listening in ${state.selectedLanguage}... Speak clearly` : `Tap Microphone to Speak Symptoms (${state.selectedLanguage})`}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Supports continuous conversational speech in {state.selectedLanguage}.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-base font-semibold text-slate-700">
                Chief Complaint Description
              </label>
              <textarea
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                rows={3}
                className="w-full p-4 bg-white border border-slate-300 rounded-2xl text-slate-900 text-base focus:border-ayush-primary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Duration of Complaint"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                kioskSize
              />
              <div className="space-y-1.5">
                <label className="block text-base font-semibold text-slate-700">
                  Severity Rating
                </label>
                <select className="w-full min-h-[58px] text-lg px-4 bg-white border border-slate-300 rounded-2xl focus:border-ayush-primary focus:outline-none">
                  <option>Moderate (Interferes with daily chores)</option>
                  <option>Mild (Noticeable but manageable)</option>
                  <option>Severe (Requires continuous bed rest)</option>
                </select>
              </div>
            </div>

            {/* Red flag screening pill */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-sm">Automated Red-Flag Screening Cleared</span>
                <span>
                  No emergency chest pain, neuro deficits, or critical acute signs detected. Classified as Routine OPD intake.
                </span>
              </div>
            </div>
          </div>

          <StepNav
            prevPath="/patient/language"
            nextPath="/patient/ayush"
            nextLabel="Proceed to AYUSH Assessment"
          />
        </CardContent>
      </Card>
    </div>
  )
}

// 5. AYUSH Assessment Screen
export function StepAyush() {
  const [selectedDosha, setSelectedDosha] = useState('Vata-Kapha')
  const [selectedAgni, setSelectedAgni] = useState('Vishama')

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="ayush">Step 5 of 8 • AYUSH Assessment</Badge>
            <Badge variant="saffron">Prakriti & Agni</Badge>
          </div>
          <CardTitle className="text-2xl mt-2">
            Prakriti Baseline & Digestive Fire (Agni) Evaluation
          </CardTitle>
          <CardDescription>
            Determining your constitution according to classical Ayurvedic principles.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-800 uppercase tracking-wide">
              Dominant Constitution (Prakriti Estimation)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { name: 'Vata Predominant', desc: 'Prone to dryness, joint sounds, variable appetite', val: 'Vata' },
                { name: 'Pitta Predominant', desc: 'Prone to heat, hyperacidity, sharp appetite', val: 'Pitta' },
                { name: 'Vata-Kapha Mixed', desc: 'Prone to joint stiffness, cold sensitivity, heaviness', val: 'Vata-Kapha' },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setSelectedDosha(item.val)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedDosha === item.val
                      ? 'bg-ayush-surface border-ayush-primary shadow-xs ring-2 ring-ayush-primary/20'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="block text-sm font-bold text-slate-800 uppercase tracking-wide">
              Digestive Power (Agni Pariksha)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Vishama Agni (Irregular)', desc: 'Digestion fluctuates between fast and bloated (Vata)', val: 'Vishama' },
                { name: 'Tikshna Agni (Intense)', desc: 'High hunger, burning sensation, quick thirst (Pitta)', val: 'Tikshna' },
                { name: 'Manda Agni (Sluggish)', desc: 'Slow digestion, fullness after light meals (Kapha)', val: 'Manda' },
                { name: 'Sama Agni (Balanced)', desc: 'Normal comfortable digestion and timely hunger', val: 'Sama' },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setSelectedAgni(item.val)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedAgni === item.val
                      ? 'bg-ayush-surface border-ayush-primary shadow-xs ring-2 ring-ayush-primary/20'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <StepNav
            prevPath="/patient/history"
            nextPath="/patient/jihva"
            nextLabel="Proceed to Jihva Pariksha"
          />
        </CardContent>
      </Card>
    </div>
  )
}

// 6. Jihva Pariksha Screen
export function StepJihva() {
  const [captured, setCaptured] = useState(true)
  const { toast } = useToast()

  const handleCapture = () => {
    toast({
      title: 'Jihva Photo Processed',
      message: 'AI analyzed coating color, thickness, and Ama indicators.',
      type: 'success',
    })
    setCaptured(true)
  }

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="ayush">Step 5b • Jihva Pariksha</Badge>
            <Badge variant="saffron">Tongue Examination</Badge>
          </div>
          <CardTitle className="text-2xl mt-2">
            Optical Tongue Assessment (Jihva Pariksha)
          </CardTitle>
          <CardDescription>
            Classical Ayurvedic diagnostic parameter indicating Ama (toxins) and doshic involvement.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="w-32 h-32 rounded-full border-4 border-dashed border-emerald-400/70 flex flex-col items-center justify-center bg-slate-800/80 mb-4">
              <Camera className="w-10 h-10 text-emerald-400 mb-1" />
              <span className="text-[11px] font-bold text-emerald-200">Align Tongue</span>
            </div>
            <p className="text-sm font-bold text-slate-200">
              Terminal Optical Sensor Active
            </p>
            <p className="text-xs text-slate-400 max-w-sm mt-1">
              Position your tongue within the green circle under good lighting.
            </p>

            <Button
              variant="accent"
              size="lg"
              onClick={handleCapture}
              className="mt-5"
              leftIcon={<Camera className="w-5 h-5" />}
            >
              Simulate Image Capture
            </Button>
          </div>

          {captured && (
            <div className="p-5 rounded-2xl bg-ayush-surface border border-ayush-border space-y-2 text-xs">
              <span className="font-bold text-sm text-ayush-primary flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                AI Image Analysis Results
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-slate-700">
                <div className="bg-white p-2.5 rounded-xl border border-ayush-border/60">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Coating Color</div>
                  <div className="font-bold text-slate-800 mt-0.5">White (Posterior)</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-ayush-border/60">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Thickness</div>
                  <div className="font-bold text-slate-800 mt-0.5">Moderate</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-ayush-border/60">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Moisture</div>
                  <div className="font-bold text-slate-800 mt-0.5">Dry / Fissured</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-ayush-border/60">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Ama Indication</div>
                  <div className="font-bold text-amber-700 mt-0.5">Mild-Moderate Ama</div>
                </div>
              </div>
            </div>
          )}

          <StepNav
            prevPath="/patient/ayush"
            nextPath="/patient/nadi"
            nextLabel="Proceed to Nadi Assessment"
          />
        </CardContent>
      </Card>
    </div>
  )
}

// 7. Nadi Assessment Screen
export function StepNadi() {
  const [pulseReading, setPulseReading] = useState(74)
  const { toast } = useToast()

  const handleRecalibrate = () => {
    setPulseReading(72 + Math.floor(Math.random() * 5))
    toast({
      title: 'Pulse Sensor Calibrated',
      message: 'Gati classified as Sarpa Gati (Snake-like / Vata predominant).',
      type: 'info',
    })
  }

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="ayush">Step 5c • Nadi Assessment</Badge>
            <Badge variant="default">Supplementary Sensor</Badge>
          </div>
          <CardTitle className="text-2xl mt-2">
            Pulse & Gati Supplementary Assessment (Nadi Pariksha)
          </CardTitle>
          <CardDescription>
            Digital pulse sensor assisting in Gati, Vega (velocity), and Bala estimation.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-900 to-teal-950 p-8 rounded-3xl text-white flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-800/80 border-2 border-emerald-400/50 flex items-center justify-center mb-4 relative">
              <Heart className="w-10 h-10 text-rose-400 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></span>
            </div>
            <div className="text-4xl font-extrabold tracking-tight text-emerald-100">
              {pulseReading} <span className="text-lg font-medium text-emerald-300">BPM</span>
            </div>
            <p className="text-xs text-emerald-200/80 mt-1">
              Pulse Waveform: Sarpa Gati (Subtle serpentine wave detected)
            </p>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRecalibrate}
              className="mt-4 bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              Recalibrate Pulse Sensor
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <span className="text-slate-400 uppercase font-bold text-[10px]">Gati (Movement)</span>
              <p className="font-bold text-sm text-slate-800 mt-1">Sarpa Gati (Vata)</p>
              <p className="text-slate-500 text-[11px] mt-0.5">Serpentine, irregular pulse flow</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <span className="text-slate-400 uppercase font-bold text-[10px]">Vega (Velocity)</span>
              <p className="font-bold text-sm text-slate-800 mt-1">Madhyama (Medium)</p>
              <p className="text-slate-500 text-[11px] mt-0.5">Rate consistent with 74 BPM</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <span className="text-slate-400 uppercase font-bold text-[10px]">Bala (Force)</span>
              <p className="font-bold text-sm text-slate-800 mt-1">Madhyama Bala</p>
              <p className="text-slate-500 text-[11px] mt-0.5">Adequate stroke volume</p>
            </div>
          </div>

          <StepNav
            prevPath="/patient/jihva"
            nextPath="/patient/documents"
            nextLabel="Proceed to Document Upload"
          />
        </CardContent>
      </Card>
    </div>
  )
}

// 8. Documents & OCR Screen
export function StepDocuments() {
  const [docs, setDocs] = useState(MOCK_DETAILED_PATIENT.documents)
  const { toast } = useToast()

  const handleSimulateUpload = () => {
    const newDoc = {
      id: `doc-${docs.length + 1}`,
      title: 'Previous AYUSH Prescription (Patanjali Hospital)',
      date: '02 Sep 2026',
      extractedFinding: 'Prescription: Yograj Guggulu 2 tabs BD, Ashwagandha Churna 3g HS.',
    }
    setDocs([...docs, newDoc])
    toast({
      title: 'Document Scanned & Extracted',
      message: 'Medical OCR extracted medications and clinical history successfully.',
      type: 'success',
    })
  }

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="ayush">Step 6 of 8 • Medical Documents</Badge>
            <Badge variant="default">OCR Scanner</Badge>
          </div>
          <CardTitle className="text-2xl mt-2">
            Scan Previous Prescriptions & Lab Reports
          </CardTitle>
          <CardDescription>
            Place paper reports onto the scanner glass or upload digital PDFs.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-ayush-border rounded-3xl p-8 text-center flex flex-col items-center justify-center bg-ayush-surface/30 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-white border border-ayush-border flex items-center justify-center text-ayush-primary shadow-xs">
              <Upload className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-base">
                Place Document on Scanner Tray
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Optical character recognition (OCR) will extract past lab values, diagnoses, and medications.
              </p>
            </div>
            <Button
              variant="outline"
              size="md"
              onClick={handleSimulateUpload}
              leftIcon={<FileCheck className="w-4 h-4 text-emerald-600" />}
            >
              Simulate Scan Document
            </Button>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Scanned & Parsed Documents ({docs.length})
            </h4>
            <div className="space-y-2.5">
              {docs.map((d) => (
                <div
                  key={d.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <h5 className="font-bold text-sm text-slate-800">{d.title}</h5>
                    <p className="text-xs text-slate-500">{d.date} • {d.extractedFinding}</p>
                  </div>
                  <Badge variant="ayush" size="sm" className="self-start sm:self-auto">
                    OCR Verified
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <StepNav
            prevPath="/patient/nadi"
            nextPath="/patient/summary"
            nextLabel="Generate AI Summary"
          />
        </CardContent>
      </Card>
    </div>
  )
}

// 9. AI Clinical Summary Review Screen
export function StepSummary() {
  const { state } = usePatient()
  const patient = MOCK_DETAILED_PATIENT

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="ayush">Step 7 of 8 • AI Clinical Summary</Badge>
            <div className="flex items-center gap-2">
              {state.caregiverMode && (
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                  👥 Reported by caregiver ({state.caregiverRelationship})
                </span>
              )}
              <Badge variant="saffron">Traceable Output</Badge>
            </div>
          </div>
          <CardTitle className="text-2xl mt-2">
            AI-Synthesized Clinical Intake Summary
          </CardTitle>
          <CardDescription>
            Review the synthesized record before final OPD token generation and physician verification.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 text-sm">
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50 rounded-t-2xl">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold uppercase">Patient Profile</span>
                  {state.caregiverMode && (
                    <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded border border-purple-200">
                      👥 Reported by caregiver ({state.caregiverRelationship})
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-slate-900 text-base">{state.patientName || patient.name}</h4>
                <p className="text-xs text-slate-500">
                  {state.age || patient.age} Y / {state.gender || patient.gender} • ABHA: {state.abhaDemoId || patient.abhaId} • Language: {state.selectedLanguage}
                </p>
              </div>
              <div className="flex flex-col sm:items-end gap-1">
                <Badge variant="ayush">{patient.ayushAssessment.prakriti}</Badge>
                <span className="text-[10px] font-semibold text-emerald-700">
                  Consent: {state.consentGiven ? 'Granted (Digital)' : 'Not Given'}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase">Chief Complaints</span>
              <p className="text-slate-800 font-medium">
                {state.isReturningPatient && state.previousHistory
                  ? `Follow-up regarding ${state.previousHistory.previousConcern}. Patient notes progressive response.`
                  : patient.history.chiefComplaint}
              </p>
              <p className="text-xs text-slate-500">
                Duration: {state.isReturningPatient ? 'Ongoing follow-up' : patient.history.duration}
              </p>
            </div>

            <div className="p-4 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase">AYUSH Pariksha Indicators</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
                <div><strong>Agni:</strong> {patient.ayushAssessment.agni}</div>
                <div><strong>Kostha:</strong> {patient.ayushAssessment.kostha}</div>
                <div><strong>Jihva:</strong> {patient.jihvaPariksha.coatingColor}</div>
                <div><strong>Nadi:</strong> {patient.nadiPariksha.gati} ({patient.nadiPariksha.rateBpm} BPM)</div>
              </div>
            </div>

            <div className="p-4 space-y-1.5 bg-emerald-50/50 rounded-b-2xl">
              <div className="flex items-center gap-1.5 text-xs font-bold text-ayush-primary uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                AI Diagnostic Impression (Preliminary)
              </div>
              <p className="text-xs text-slate-800 font-semibold">
                {patient.aiSummary.diagnosticImpression}
              </p>
              <p className="text-[11px] text-slate-500">
                Rationale: {patient.aiSummary.treatmentRationale}
              </p>
            </div>
          </div>

          <StepNav
            prevPath="/patient/documents"
            nextPath="/patient/token"
            nextLabel="Generate Consultation Token"
          />
        </CardContent>
      </Card>
    </div>
  )
}

// 10. Consultation Token Generation Screen
export function StepToken() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { state } = usePatient()

  const handlePrint = () => {
    toast({
      title: 'Printing Token Slip',
      message: 'OPD Token A-102 dispatched to thermal printer.',
      type: 'success',
    })
  }

  return (
    <div className="max-w-xl mx-auto w-full space-y-6">
      <Card variant="highlight" className="border-2 border-emerald-600/40">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <Badge variant="ayush" size="md" className="mx-auto">
            Intake Completed Successfully
          </Badge>
          <CardTitle className="text-3xl mt-2 font-black text-slate-900">
            Consultation Token
          </CardTitle>
          <CardDescription>
            Please take this token and proceed to the designated consultation room.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Thermal Slip Simulation */}
          <div className="bg-[#FAF9F5] border-2 border-dashed border-slate-300 p-6 rounded-2xl font-mono text-center space-y-4 shadow-xs">
            <div className="border-b border-dashed border-slate-300 pb-3">
              <h3 className="text-sm font-bold tracking-widest text-slate-800 uppercase">
                Ministry of AYUSH Central Hospital
              </h3>
              <p className="text-xs text-slate-500">OPD CLINICAL INTAKE KIOSK #4</p>
              <p className="text-[11px] text-slate-400">Date: 05 Sep 2026 • 10:14 AM</p>
            </div>

            <div className="py-2">
              <span className="text-xs text-slate-500 uppercase tracking-wider">Your Token Number</span>
              <div className="text-5xl font-black text-ayush-primary tracking-tight my-1">
                A-102
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Room 14 • Dr. Anand Kulkarni (MD Ayu)
              </span>
            </div>

            <div className="border-t border-dashed border-slate-300 pt-3 text-xs text-left text-slate-600 space-y-1">
              <div>
                <strong>Patient:</strong> {state.patientName || 'Rameshwar Sharma'} ({state.age || 54}{state.gender ? state.gender.charAt(0) : 'M'})
              </div>
              <div>
                <strong>ABHA ID:</strong> {state.abhaDemoId || '91-4829-1029-4820'}
              </div>
              {state.caregiverMode && (
                <div className="text-purple-700 font-semibold">
                  <strong>👥 Reported by caregiver:</strong> {state.caregiverRelationship || 'Relative'}
                </div>
              )}
              <div>
                <strong>Language / Modality:</strong> {state.selectedLanguage} ({state.inputMode.toUpperCase()})
              </div>
              <div>
                <strong>Chief Complaint:</strong>{' '}
                {state.isReturningPatient && state.previousHistory
                  ? `Follow-up: ${state.previousHistory.previousConcern}`
                  : 'Janu Sandhigata Vata (Knee pain)'}
              </div>
              <div>
                <strong>Estimated Wait:</strong> ~8 minutes (2 patients ahead)
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="kiosk"
              onClick={handlePrint}
              leftIcon={<Printer className="w-5 h-5" />}
              className="w-full sm:w-auto min-w-[200px]"
            >
              Print Token Slip
            </Button>
            <Button
              variant="outline"
              size="kiosk"
              onClick={() => navigate('/')}
              className="w-full sm:w-auto"
            >
              Return Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
