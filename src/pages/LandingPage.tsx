import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Languages,
  RotateCcw,
  Sparkles,
  FileScan,
  FileText,
  ShieldCheck,
  ArrowRight,
  Stethoscope,
  Building2,
  Activity,
  CheckCircle2,
  QrCode,
  HeartPulse,
  UserCheck,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/utils/cn'

export function LandingPage() {
  const [activeWorkflowStage, setActiveWorkflowStage] = useState(0)

  // 6 Specified Feature Cards
  const features = [
    {
      icon: <Languages className="w-6 h-6 text-emerald-700" />,
      title: 'Multilingual AI',
      description: 'Voice + touch based patient interaction.',
      badge: 'Voice + Touch',
      detail: 'Supports 12+ Indian regional dialects with conversational NLP tuned for rural patients.',
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-amber-700" />,
      title: 'Smart History',
      description: 'Returning patients answer only what has changed.',
      badge: 'Delta History',
      detail: 'Automated delta-mode recalls past visits and isolates new symptoms in under 90 seconds.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-emerald-800" />,
      title: 'AYUSH Intelligence',
      description: 'Dashavidha Pariksha and AYUSH-specific assessments.',
      badge: 'Standardized',
      detail: 'Prakriti, Agni, Kostha evaluation complemented by automated Jihva & Nadi markers.',
    },
    {
      icon: <FileScan className="w-6 h-6 text-sky-700" />,
      title: 'Medical OCR',
      description: 'Digitize prescriptions, lab reports and discharge summaries.',
      badge: 'Instant Digitize',
      detail: 'Local camera scanning parses handwritten notes and laboratory results with entity tagging.',
    },
    {
      icon: <FileText className="w-6 h-6 text-teal-700" />,
      title: 'Clinical Summary',
      description: 'AI-assisted physician-ready clinical history.',
      badge: 'Traceable EHR',
      detail: 'Generates structured SOAP notes aligned with NAMASTE portal and ICD-11 AYUSH standards.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-700" />,
      title: 'Secure by Design',
      description: 'Consent, privacy and offline-first architecture.',
      badge: 'ABDM Verified',
      detail: 'ABHA verification with localized edge processing ensures complete data residency & confidentiality.',
    },
  ]

  // 8 Specified Sequential Steps for How It Works
  const howItWorksSteps = [
    {
      step: '01',
      title: 'Identify Patient',
      desc: 'ABHA ID / Mobile scan with biometric or OTP confirmation',
      icon: UserCheck,
    },
    {
      step: '02',
      title: 'Give Consent',
      desc: 'Transparent digital consent for AYUSH assessment and data processing',
      icon: ShieldCheck,
    },
    {
      step: '03',
      title: 'AI Clinical History',
      desc: 'Interactive touch & multilingual voice symptom dialogue',
      icon: Languages,
    },
    {
      step: '04',
      title: 'AYUSH Assessment',
      desc: 'Standardized Dashavidha Pariksha, Prakriti, Jihva & Nadi inspection',
      icon: HeartPulse,
    },
    {
      step: '05',
      title: 'Upload Medical Records',
      desc: 'Instant OCR digitization of previous prescriptions and lab reports',
      icon: FileScan,
    },
    {
      step: '06',
      title: 'AI Summary',
      desc: 'Physician-ready structured clinical summary generated in seconds',
      icon: FileText,
    },
    {
      step: '07',
      title: 'Doctor Verification',
      desc: 'Physician reviews, validates, and signs into hospital EHR',
      icon: Stethoscope,
    },
    {
      step: '08',
      title: 'Token Generated',
      desc: 'Printed OPD slip with consultation room & estimated wait time',
      icon: QrCode,
    },
  ]

  // Healthcare Workflow Interactive Preview
  const workflowPreviewNodes = [
    {
      id: 0,
      title: 'Patient Intake Kiosk',
      subtitle: 'Voice & Touch Terminal',
      description: 'Patient arrives, provides ABHA or phone, and interacts in regional language via voice or high-contrast touchscreen.',
      status: 'Ready at Terminal #04',
      metrics: '12+ Dialects Supported',
      badge: 'Step 1: Patient Side',
    },
    {
      id: 1,
      title: 'AYUSH Assessment Engine',
      subtitle: 'Dashavidha & Prakriti AI',
      description: 'Calculates Vata-Pitta-Kapha equilibrium, checks Jihva Ama presence, and monitors Nadi Gati without invasive sensors.',
      status: 'Prakriti Model v2.4 Active',
      metrics: 'Dashavidha Pariksha Aligned',
      badge: 'Step 2: AYUSH Core',
    },
    {
      id: 2,
      title: 'Secure ABDM Data Lake',
      subtitle: 'FHIR v4 & NAMASTE Map',
      description: 'Structured clinical JSON linked with ABDM Health IDs, cross-referencing ICD-11 AYUSH codes with zero cloud leak.',
      status: 'Consent Enforced (AES-256)',
      metrics: '100% ABDM Compliant',
      badge: 'Step 3: Security Layer',
    },
    {
      id: 3,
      title: 'Physician Clinical Console',
      subtitle: 'Doctor Review & Verification',
      description: 'Doctor receives an executive summary with highlighted red-flags and verified source citations in under 60 seconds.',
      status: 'Assigned to Dr. A. Kulkarni',
      metrics: 'Saves 70% Consultation Time',
      badge: 'Step 4: Clinical Side',
    },
    {
      id: 4,
      title: 'Hospital OPD Token Dispatch',
      subtitle: 'Printed Consultation Pass',
      description: 'Physical or digital token ticket issued instantly with estimated queue time and assigned examination chamber.',
      status: 'Token A-102 Issued',
      metrics: 'Queue Wait: ~12 Mins',
      badge: 'Step 5: Output',
    },
  ]

  // Key Differentiators for Why MediKiosk
  const differentiators = [
    {
      title: 'Smart Delta Mode',
      subtitle: 'Intelligent Follow-ups',
      description:
        'Remembers past visits securely. Returning patients answer only what has evolved since their previous checkup, saving up to 70% of intake duration.',
      tag: 'Time Saving',
    },
    {
      title: 'AYUSH-Specific Assessment',
      subtitle: 'Dashavidha Pariksha',
      description:
        'Standardized Prakriti determination, Agni evaluation, Kostha categorization, alongside optical Jihva (tongue) and Nadi (pulse) markers.',
      tag: 'Clinical Depth',
    },
    {
      title: 'AI Transparency',
      subtitle: 'Traceable & Explainable',
      description:
        'Every single clinical conclusion directly references the patient’s own words or uploaded records. Eliminates AI hallucination risks entirely.',
      tag: 'Zero Hallucination',
    },
    {
      title: 'Multilingual Accessibility',
      subtitle: 'Inclusive Voice Interaction',
      description:
        'Engineered for rural healthcare centers with support for 12+ official languages and local vernacular dialects, ensuring equity for semi-literate users.',
      tag: 'Bharat Inclusive',
    },
    {
      title: 'Medical Document Digitization',
      subtitle: 'Instant Optical OCR',
      description:
        'High-accuracy edge OCR transforms cluttered paper prescriptions, discharge summaries, and lab panels into clean, structured digital FHIR entries.',
      tag: 'Edge Processing',
    },
    {
      title: 'Hospital Token Integration',
      subtitle: 'Seamless OPD Orchestration',
      description:
        'Connects immediately with hospital queuing hardware, digital lobby displays, and physical thermal ticket printers for frictionless OPD throughput.',
      tag: 'Queue Harmonized',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-ayush-warm-bg">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 bg-linear-to-b from-ayush-surface/90 via-ayush-warm-bg to-ayush-warm-bg border-b border-ayush-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Government & SIH Authority Tag */}
            <div className="inline-flex items-center gap-2.5 bg-white px-4 py-1.5 rounded-full border border-ayush-border shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="text-xs font-bold text-ayush-primary uppercase tracking-wider">
                Ministry of AYUSH • SIH 2026 Demonstration
              </span>
            </div>

            {/* Brand Logo & Name */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="w-14 h-14 rounded-2xl bg-white border border-ayush-border/80 flex items-center justify-center text-3xl shadow-xs">
                🌿
              </div>
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                MediKiosk
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
              AI-Powered Clinical History for{' '}
              <span className="text-ayush-primary underline decoration-ayush-accent/50 decoration-wavy underline-offset-8">
                AYUSH Healthcare
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto italic">
              “Capture patient history intelligently. Standardize AYUSH assessments. Assist physicians with trusted, traceable clinical summaries.”
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <Link to="/patient/identify" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="kiosk"
                  className="w-full sm:w-auto min-w-65 text-base shadow-sm hover:shadow-md"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Start Patient Assessment
                </Button>
              </Link>

              <Link to="/doctor" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="kiosk"
                  className="w-full sm:w-auto min-w-42.5 text-base"
                  leftIcon={<Stethoscope className="w-5 h-5 text-ayush-primary" />}
                >
                  Doctor Login
                </Button>
              </Link>

              <Link to="/admin" className="w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="kiosk"
                  className="w-full sm:w-auto min-w-40 text-base text-slate-600 hover:text-slate-900"
                  leftIcon={<Building2 className="w-5 h-5 text-slate-500" />}
                >
                  Admin Portal
                </Button>
              </Link>
            </div>
          </div>

          {/* VISUAL REPRESENTATION OF MEDIKIOSK HEALTHCARE WORKFLOW */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl border border-ayush-border/80 shadow-md p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-ayush-surface flex items-center justify-center text-ayush-primary">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Connected MediKiosk Clinical Architecture
                    </h2>
                    <p className="text-xs text-slate-500">
                      Click any node to inspect real-time healthcare telemetry flow
                    </p>
                  </div>
                </div>

                <Badge variant="ayush" size="md">
                  Unified Clinical Loop
                </Badge>
              </div>

              {/* Connected Pipeline Nodes Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-6">
                {workflowPreviewNodes.map((node, idx) => (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveWorkflowStage(idx)}
                    className={cn(
                      'p-3 rounded-2xl border text-left transition-all relative',
                      activeWorkflowStage === idx
                        ? 'bg-ayush-surface border-ayush-primary shadow-2xs'
                        : 'bg-white border-slate-200/80 hover:border-ayush-border hover:bg-slate-50/60'
                    )}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={cn(
                          'w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center',
                          activeWorkflowStage === idx
                            ? 'bg-ayush-primary text-white'
                            : 'bg-slate-100 text-slate-600'
                        )}
                      >
                        {idx + 1}
                      </span>
                      {activeWorkflowStage === idx && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-slate-800 leading-tight truncate">
                      {node.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                      {node.subtitle}
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Stage Detailed Preview Box */}
              <div className="bg-ayush-surface/70 rounded-2xl p-5 border border-ayush-border/60">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Badge variant="saffron" size="sm">
                        {workflowPreviewNodes[activeWorkflowStage].badge}
                      </Badge>
                      <h3 className="text-base font-bold text-slate-900">
                        {workflowPreviewNodes[activeWorkflowStage].title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                      {workflowPreviewNodes[activeWorkflowStage].description}
                    </p>
                  </div>

                  <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2">
                    <div className="bg-white px-3 py-2 rounded-xl border border-ayush-border text-xs">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Node Telemetry</span>
                      <span className="font-semibold text-emerald-800">
                        {workflowPreviewNodes[activeWorkflowStage].status}
                      </span>
                    </div>
                    <div className="bg-white px-3 py-2 rounded-xl border border-ayush-border text-xs">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Standard Metric</span>
                      <span className="font-semibold text-slate-700">
                        {workflowPreviewNodes[activeWorkflowStage].metrics}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURE SECTION (6 Cards Specified) */}
      <section className="py-14 sm:py-20 bg-white border-b border-ayush-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <Badge variant="ayush" size="md">
              Core Capabilities
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Intelligent Features for Clinical Excellence
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              Purpose-built tools empowering AYUSH physicians with high-accuracy patient data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                variant="interactive"
                className="flex flex-col justify-between group hover:border-ayush-primary/50 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-ayush-surface border border-ayush-border flex items-center justify-center group-hover:scale-105 transition-transform">
                      {feature.icon}
                    </div>
                    <Badge variant="default" size="sm">
                      {feature.badge}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-ayush-primary transition-colors mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-sm font-semibold text-slate-800 mb-2">
                    {feature.description}
                  </p>

                  <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3 mt-3">
                    {feature.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (8-Step Visual Connected Journey) */}
      <section className="py-16 sm:py-24 bg-ayush-warm-bg border-b border-ayush-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="saffron" size="md">
              Step-by-Step Flow
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              How MediKiosk Works
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              One connected patient journey from arrival at the hospital kiosk to final verified consultation pass.
            </p>
          </div>

          {/* Sequential 8-Step Connected Journey Visual */}
          <div className="relative">
            {/* Desktop continuous track bar */}
            <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-linear-to-r from-emerald-600 via-emerald-400 to-amber-500 -translate-y-6 z-0 rounded-full opacity-30"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {howItWorksSteps.map((item, idx) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={item.step}
                    className="bg-white border border-ayush-border/80 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-sm hover:border-ayush-primary/40 transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-9 h-9 rounded-xl bg-ayush-surface border border-ayush-border text-xs font-black text-ayush-primary flex items-center justify-center shadow-2xs group-hover:bg-ayush-primary group-hover:text-white transition-colors">
                          {item.step}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center group-hover:text-ayush-primary">
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-ayush-primary transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Milestone {idx + 1} of 8</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-ayush-primary group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/patient/identify">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="shadow-xs"
              >
                Experience Live Kiosk Flow
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY MEDIKIOSK (Key Differentiators) */}
      <section className="py-16 sm:py-22 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="ayush" size="md">
              Key Differentiators
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why MediKiosk
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              Designed specifically for the nuances of AYUSH diagnosis and high-volume Indian government hospitals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((diff) => (
              <div
                key={diff.title}
                className="bg-ayush-surface/50 border border-ayush-border rounded-3xl p-7 flex flex-col justify-between hover:bg-ayush-surface hover:border-ayush-primary/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-ayush-accent uppercase tracking-wider">
                      {diff.subtitle}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-ayush-border text-slate-600">
                      {diff.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {diff.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {diff.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-ayush-border/50 flex items-center gap-1.5 text-xs font-semibold text-ayush-primary">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Clinical Standard Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALLOUT BANNER / ROLE INVITATION */}
      <section className="py-12 bg-linear-to-b from-white to-ayush-surface/60 border-t border-ayush-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-ayush-primary rounded-3xl p-8 sm:p-12 text-white shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-4">
                <Badge variant="saffron" size="sm" className="bg-amber-400 text-amber-950 font-bold border-none">
                  Ready for Evaluation
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Seamless Access Across Every Hospital Stakeholder
                </h2>
                <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                  Whether taking your history as an outpatient, reviewing structured summaries as a physician, or overseeing hospital fleet capacity as an administrator.
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-emerald-200">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Touchscreen Kiosk Ergonomics
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Instant Demo Role Switcher
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Zero Waiting Queue Loss
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link to="/login" className="w-full">
                  <Button variant="accent" size="lg" className="w-full font-bold shadow-md">
                    Choose Your Role to Continue
                  </Button>
                </Link>
                <Link to="/patient/identify" className="w-full">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-white/30 text-white hover:bg-white/10 hover:border-white"
                  >
                    Direct Kiosk Launch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
