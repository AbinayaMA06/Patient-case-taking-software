import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Mic,
  Languages,
  Upload,
  FileCheck,
  Printer,
  Sparkles,
  QrCode,
  Heart,
  Camera,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/hooks/useToast'
import { SUPPORTED_LANGUAGES, MOCK_DETAILED_PATIENT } from '@/data/mockData'

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

// 1. Identify Screen
export function StepIdentify() {
  const [searchParams] = useSearchParams()
  const isProxy = searchParams.get('proxy') === 'true'
  const [idType, setIdType] = useState<'abha' | 'mobile'>('abha')
  const [identifier, setIdentifier] = useState('91-4829-1029-4820')
  const [patientName, setPatientName] = useState('Rameshwar Sharma')
  const [age, setAge] = useState('54')
  const [gender, setGender] = useState('Male')
  const { toast } = useToast()

  const handleSimulateAbhaScan = () => {
    toast({
      title: 'ABHA Profile Loaded',
      message: 'Verified successfully via Ayushman Bharat Digital Mission (ABDM).',
      type: 'success',
    })
  }

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant={isProxy ? 'saffron' : 'ayush'}>
              {isProxy ? 'Proxy / Caregiver Assisted Intake' : 'Step 1 of 10 • Patient Identification'}
            </Badge>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ABDM Sandbox
            </span>
          </div>
          <CardTitle className="text-2xl mt-2">
            {isProxy ? 'Caregiver & Patient Identification' : 'Patient Identification'}
          </CardTitle>
          <CardDescription>
            Scan your Ayushman Bharat Health Account (ABHA) card or enter your registered mobile number.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Identification method toggle */}
          <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setIdType('abha')}
              className={`py-3 rounded-xl font-bold text-sm transition-all ${
                idType === 'abha'
                  ? 'bg-white text-ayush-primary shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Scan / Enter ABHA ID
            </button>
            <button
              type="button"
              onClick={() => setIdType('mobile')}
              className={`py-3 rounded-xl font-bold text-sm transition-all ${
                idType === 'mobile'
                  ? 'bg-white text-ayush-primary shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mobile OTP Intake
            </button>
          </div>

          <div className="space-y-4">
            <Input
              label={idType === 'abha' ? 'ABHA Address / 14-digit Number' : 'Mobile Number (Aadhaar-Linked)'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              helperText="Demo mode: Presets loaded from test registry."
              kioskSize
              leftIcon={<QrCode className="w-5 h-5" />}
              rightIcon={
                <button
                  type="button"
                  onClick={handleSimulateAbhaScan}
                  className="text-xs font-bold text-ayush-primary hover:underline bg-ayush-surface px-2 py-1 rounded-lg border border-ayush-border"
                >
                  Simulate QR Scan
                </button>
              }
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Full Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                kioskSize
              />
              <Input
                label="Age (Years)"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                kioskSize
              />
              <div className="space-y-1.5">
                <label className="block text-base font-semibold text-slate-700">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full min-h-[58px] text-lg px-4 bg-white border border-slate-300 rounded-2xl focus:border-ayush-primary focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {isProxy && (
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  Proxy Documentation Activated
                </span>
                <p>
                  You are completing this clinical intake on behalf of the patient. The guardian relationship will be appended to the consultation token.
                </p>
              </div>
            )}
          </div>

          <StepNav
            prevPath="/login"
            nextPath="/patient/consent"
            nextLabel="Confirm & Proceed to Consent"
          />
        </CardContent>
      </Card>
    </div>
  )
}

// 2. Consent Screen
export function StepConsent() {
  const [agreedConsent, setAgreedConsent] = useState(true)
  const [agreedAyush, setAgreedAyush] = useState(true)

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <Card variant="default">
        <CardHeader>
          <Badge variant="ayush">Step 2 of 10 • Patient Consent</Badge>
          <CardTitle className="text-2xl mt-2">
            Clinical Consent & Data Sharing Authorization
          </CardTitle>
          <CardDescription>
            In accordance with ABDM standards and clinical guidelines of the Ministry of AYUSH.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-sm text-slate-700 space-y-3 leading-relaxed max-h-64 overflow-y-auto">
            <h4 className="font-bold text-slate-900 text-base">
              Digital Health Records & AI Assistive Intake Agreement
            </h4>
            <p>
              1. <strong>Intake Purpose:</strong> This terminal collects clinical history, symptom duration, previous records, and AYUSH-specific observations (including Prakriti, Jihva, and Nadi parameters) to prepare a pre-consultation summary for your attending doctor.
            </p>
            <p>
              2. <strong>AI Assistance:</strong> The AI system does NOT make final diagnoses or dispense medications. All extracted clinical data is reviewed, verified, and approved by a certified AYUSH physician before treatment begins.
            </p>
            <p>
              3. <strong>ABDM Data Rights:</strong> Your health records are protected under Indian health privacy standards. You retain full control over your ABHA health locker.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <label className="flex items-start gap-3 p-4 rounded-2xl border border-ayush-border bg-white cursor-pointer hover:bg-ayush-surface/40 transition-colors">
              <input
                type="checkbox"
                checked={agreedConsent}
                onChange={(e) => setAgreedConsent(e.target.checked)}
                className="mt-1 w-5 h-5 rounded text-ayush-primary accent-ayush-primary"
              />
              <span className="text-sm font-medium text-slate-800">
                I authorize MediKiosk to capture my clinical complaints and share them securely with the hospital OPD consultation team.
              </span>
            </label>

            <label className="flex items-start gap-3 p-4 rounded-2xl border border-ayush-border bg-white cursor-pointer hover:bg-ayush-surface/40 transition-colors">
              <input
                type="checkbox"
                checked={agreedAyush}
                onChange={(e) => setAgreedAyush(e.target.checked)}
                className="mt-1 w-5 h-5 rounded text-ayush-primary accent-ayush-primary"
              />
              <span className="text-sm font-medium text-slate-800">
                I agree to preliminary AYUSH assessment indicators (Prakriti, Jihva, and pulse data collection) for physician review.
              </span>
            </label>
          </div>

          <StepNav
            prevPath="/patient/identify"
            nextPath="/patient/language"
            nextLabel="Agree & Select Language"
          />
        </CardContent>
      </Card>
    </div>
  )
}

// 3. Language Screen
export function StepLanguage() {
  const [selectedLang, setSelectedLang] = useState('hi')
  const { toast } = useToast()

  const handleSelect = (code: string, name: string) => {
    setSelectedLang(code)
    toast({
      title: `Language set to ${name}`,
      message: 'The voice engine and screen prompts are now adapted for this dialect.',
      type: 'info',
    })
  }

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <Card variant="default">
        <CardHeader>
          <Badge variant="ayush">Step 3 of 10 • Language Preference</Badge>
          <CardTitle className="text-2xl mt-2">
            Choose Your Preferred Spoken Dialect
          </CardTitle>
          <CardDescription>
            The voice assistant and on-screen prompts will interact in your selected language.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = selectedLang === lang.code
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code, lang.name)}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-ayush-surface border-ayush-primary shadow-sm ring-2 ring-ayush-primary/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xl font-bold text-slate-900">
                    {lang.native}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {lang.name}
                  </span>
                  {lang.popular && (
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Popular
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3">
            <Languages className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              Voice speech recognition (ASR) is calibrated for conversational medical terms in all 12 regional languages.
            </span>
          </div>

          <StepNav
            prevPath="/patient/consent"
            nextPath="/patient/history"
            nextLabel="Proceed to Clinical History"
          />
        </CardContent>
      </Card>
    </div>
  )
}

// 4. Clinical History Screen
export function StepHistory() {
  const [complaint, setComplaint] = useState(
    'Bilateral knee joint pain (Janu Sandhigata Vata), worsening in morning stiffness and cold season.'
  )
  const [duration, setDuration] = useState('3 months')
  const [isListening, setIsListening] = useState(false)
  const { toast } = useToast()

  const handleToggleVoice = () => {
    if (!isListening) {
      setIsListening(true)
      toast({
        title: 'Microphone Active',
        message: 'Listening... Please describe your symptoms naturally in Hindi/English.',
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
            <Badge variant="ayush">Step 4 of 10 • AI Clinical History</Badge>
            <Badge variant="default">Voice & Touch</Badge>
          </div>
          <CardTitle className="text-2xl mt-2">
            What Brings You to the Hospital Today?
          </CardTitle>
          <CardDescription>
            Speak or type your chief health concerns. The AI will extract clinical details and screen for urgent red flags.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
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
                {isListening ? 'Listening to your voice... Speak clearly' : 'Tap Microphone to Speak Symptoms'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Supports continuous conversational speech in selected language.
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
            <Badge variant="ayush">Step 5 of 10 • AYUSH Assessment</Badge>
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
            <Badge variant="ayush">Step 6 of 10 • Jihva Pariksha</Badge>
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
            <Badge variant="ayush">Step 7 of 10 • Nadi Assessment</Badge>
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
            <Badge variant="ayush">Step 8 of 10 • Medical Documents</Badge>
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
  const patient = MOCK_DETAILED_PATIENT

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="ayush">Step 9 of 10 • AI Clinical Summary</Badge>
            <Badge variant="saffron">Traceable Output</Badge>
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
            <div className="p-4 flex justify-between items-center bg-slate-50 rounded-t-2xl">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase">Patient Profile</span>
                <h4 className="font-bold text-slate-900 text-base">{patient.name}</h4>
                <p className="text-xs text-slate-500">{patient.age} Y / {patient.gender} • ABHA: {patient.abhaId}</p>
              </div>
              <Badge variant="ayush">{patient.ayushAssessment.prakriti}</Badge>
            </div>

            <div className="p-4 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase">Chief Complaints</span>
              <p className="text-slate-800 font-medium">{patient.history.chiefComplaint}</p>
              <p className="text-xs text-slate-500">Duration: {patient.history.duration}</p>
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
              <div><strong>Patient:</strong> Rameshwar Sharma (54M)</div>
              <div><strong>ABHA ID:</strong> 91-4829-1029-4820</div>
              <div><strong>Chief Complaint:</strong> Janu Sandhigata Vata (Knee pain)</div>
              <div><strong>Estimated Wait:</strong> ~8 minutes (2 patients ahead)</div>
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
