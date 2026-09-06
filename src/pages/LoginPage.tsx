import { useNavigate } from 'react-router-dom'
import {
  User,
  Stethoscope,
  Building2,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export function LoginPage() {
  const navigate = useNavigate()

  const roles = [
    {
      id: 'patient',
      title: 'PATIENT',
      tagline: 'Complete your clinical history before consultation.',
      description:
        'Guided multilingual touch and voice intake. Verifies ABHA ID, records chief complaints, conducts Prakriti assessment, and generates your OPD consultation token.',
      icon: <User className="w-9 h-9 text-emerald-700" />,
      badge: 'Public Kiosk',
      badgeVariant: 'ayush' as const,
      route: '/patient/identify',
      actionText: 'Start Patient Assessment',
      highlights: ['Multilingual Voice & Touch', 'AYUSH Prakriti Assessment', 'Instant OPD Token Slip'],
    },
    {
      id: 'doctor',
      title: 'DOCTOR',
      tagline: 'Review patient history and AI-generated summaries.',
      description:
        'Physician clinical workstation. Real-time outpatient queue, traceable AI clinical summaries, NAMASTE / ICD-11 coding, and electronic signature signoff.',
      icon: <Stethoscope className="w-9 h-9 text-sky-700" />,
      badge: 'Physician Console',
      badgeVariant: 'default' as const,
      route: '/doctor',
      actionText: 'Enter Doctor Portal',
      highlights: ['Queue Triage & Red-Flags', 'Verified Clinical Notes', 'EHR Integration (ABDM)'],
    },
    {
      id: 'admin',
      title: 'ADMINISTRATOR',
      tagline: 'Manage hospital operations, users, tokens and analytics.',
      description:
        'Hospital command center. Monitor active kiosk hardware terminals, patient throughput, regional language analytics, and ABDM health information exchange status.',
      icon: <Building2 className="w-9 h-9 text-amber-700" />,
      badge: 'Hospital Command',
      badgeVariant: 'saffron' as const,
      route: '/admin',
      actionText: 'Open Administrator Portal',
      highlights: ['Fleet Hardware Telemetry', 'Queue & Token Analytics', 'Security & Audit Logs'],
    },
    {
      id: 'caregiver',
      title: 'CAREGIVER / PROXY',
      tagline: 'Answer on behalf of a patient.',
      description:
        'Assisted proxy intake for pediatric patients, elderly relatives, or differently-abled individuals with guardian relation documentation and consent capture.',
      icon: <HeartHandshake className="w-9 h-9 text-purple-700" />,
      badge: 'Assisted Mode',
      badgeVariant: 'neutral' as const,
      route: '/patient/identify?proxy=true',
      actionText: 'Start Assisted Intake',
      highlights: ['Proxy Consent Logging', 'Guardian Details Capture', 'Assisted Symptom Walkthrough'],
    },
  ]

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col justify-center py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-ayush-surface/60 via-ayush-warm-bg to-ayush-warm-bg">
      <div className="max-w-5xl mx-auto w-full space-y-8">
        {/* Title and Subtitle Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-ayush-border shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-ayush-primary tracking-wide uppercase">
              Ministry of AYUSH • Role Gateway
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Welcome to MediKiosk
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-medium italic">
            “Choose how you would like to continue.”
          </p>

          {/* Demo Authentication Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold shadow-2xs mt-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Demo Authentication Active — Select any role for immediate access (No credentials required)</span>
          </div>
        </div>

        {/* 4 Large Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <Card
              key={role.id}
              variant="interactive"
              onClick={() => navigate(role.route)}
              className="flex flex-col justify-between group hover:border-ayush-primary hover:shadow-md transition-all duration-200 rounded-3xl cursor-pointer bg-white"
            >
              <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-ayush-surface border border-ayush-border flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow-2xs">
                      {role.icon}
                    </div>
                    <Badge variant={role.badgeVariant} size="md">
                      {role.badge}
                    </Badge>
                  </div>

                  <h2 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-ayush-primary transition-colors">
                    {role.title}
                  </h2>

                  <p className="text-sm font-bold text-ayush-primary mt-1 mb-3">
                    {role.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {role.description}
                  </p>

                  {/* Feature Pills */}
                  <div className="space-y-1.5 mb-6 pt-4 border-t border-slate-100">
                    {role.highlights.map((feat, i) => (
                      <div key={i} className="text-xs text-slate-500 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant={role.id === 'patient' ? 'primary' : 'outline'}
                  size="kiosk"
                  className="w-full justify-between group-hover:bg-ayush-primary group-hover:text-white group-hover:border-ayush-primary transition-all text-sm font-bold touch-target-kiosk"
                  rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                >
                  {role.actionText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Helper Info */}
        <div className="pt-2 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-500 bg-white/80 py-3 px-6 rounded-2xl border border-ayush-border/70 max-w-2xl mx-auto shadow-2xs">
          <div className="flex items-center gap-1.5 font-medium">
            <Smartphone className="w-4 h-4 text-ayush-primary" />
            <span>Kiosk Touch Target: 52px Minimum</span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="font-medium">Direct Route Navigation Enabled</span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="font-medium">SIH 2026 Evaluation Ready</span>
        </div>
      </div>
    </div>
  )
}
