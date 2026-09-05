import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  FileText,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/hooks/useToast'
import { MOCK_DETAILED_PATIENT } from '@/data/mockData'

export function DoctorPatientDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isVerified, setIsVerified] = useState(false)

  const patient = MOCK_DETAILED_PATIENT

  const handleVerify = () => {
    setIsVerified(true)
    toast({
      title: 'Clinical Summary Verified & Signed',
      message: 'Summary approved by Dr. Anand Kulkarni and committed to EHR (ABDM format).',
      type: 'success',
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/doctor')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Queue
          </Button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Patient Assessment Review • Token {patient.tokenNumber}
            </h1>
            <p className="text-xs text-slate-500">Record ID: {id || patient.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isVerified ? (
            <Badge variant="ayush" size="lg" className="bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-700" />
              Verified by Physician
            </Badge>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={handleVerify}
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Verify & Approve Clinical Note
            </Button>
          )}
        </div>
      </div>

      {/* Patient Profile Card */}
      <Card variant="default">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-bold uppercase">Patient Name</span>
              <p className="text-base font-bold text-slate-900 mt-0.5">{patient.name}</p>
              <p className="text-slate-500">{patient.age} Y • {patient.gender}</p>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase">ABHA ID</span>
              <p className="font-mono text-sm font-semibold text-slate-800 mt-0.5">{patient.abhaId}</p>
              <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                ABDM Verified
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase">Intake Kiosk</span>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">{patient.kioskTerminal}</p>
              <p className="text-slate-500">{patient.intakeTimestamp}</p>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase">Intake Language</span>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">{patient.languageUsed}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid: Clinical History & AYUSH Pariksha */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: History & AYUSH */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chief Complaint & Progression */}
          <Card variant="default">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-lg">Chief Complaint & Clinical Progression</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 text-sm">
              <div>
                <h4 className="font-bold text-slate-900">Primary Concern:</h4>
                <p className="text-slate-700 mt-1">{patient.history.chiefComplaint}</p>
                <p className="text-xs text-slate-500 mt-0.5">Duration: {patient.history.duration}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                  Associated Lakshanas (Symptoms)
                </h4>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {patient.history.associatedSymptoms.map((sym, idx) => (
                    <Badge key={idx} variant="default" size="md">
                      {sym}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="font-bold text-slate-800 block">Aggravating Factors:</span>
                  <ul className="list-disc list-inside text-slate-600 mt-1 space-y-0.5">
                    {patient.history.aggravatingFactors.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="font-bold text-slate-800 block">Relieving Factors:</span>
                  <ul className="list-disc list-inside text-slate-600 mt-1 space-y-0.5">
                    {patient.history.relievingFactors.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AYUSH Assessment Breakdown */}
          <Card variant="default">
            <CardHeader className="border-b border-slate-100 pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Standardized AYUSH Pariksha</CardTitle>
                <Badge variant="ayush">NAMASTE Aligned</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-4 bg-ayush-surface rounded-2xl border border-ayush-border">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Dominant Prakriti</span>
                  <p className="text-base font-bold text-ayush-primary mt-1">
                    {patient.ayushAssessment.prakriti}
                  </p>
                  <p className="text-slate-500 mt-1">
                    Vata: {patient.ayushAssessment.scores.vata}% | Pitta: {patient.ayushAssessment.scores.pitta}% | Kapha: {patient.ayushAssessment.scores.kapha}%
                  </p>
                </div>

                <div className="p-4 bg-ayush-surface rounded-2xl border border-ayush-border">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Agni (Digestive Fire)</span>
                  <p className="text-sm font-bold text-slate-800 mt-1">
                    {patient.ayushAssessment.agni}
                  </p>
                </div>

                <div className="p-4 bg-ayush-surface rounded-2xl border border-ayush-border">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Kostha (Bowel Pattern)</span>
                  <p className="text-sm font-bold text-slate-800 mt-1">
                    {patient.ayushAssessment.kostha}
                  </p>
                </div>
              </div>

              {/* Jihva & Nadi side-by-side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1 text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
                    👅 Jihva Pariksha (Tongue)
                  </span>
                  <p className="text-slate-600"><strong>Coating:</strong> {patient.jihvaPariksha.coatingColor}</p>
                  <p className="text-slate-600"><strong>Surface:</strong> {patient.jihvaPariksha.moisture}</p>
                  <p className="text-slate-600"><strong>Edges:</strong> {patient.jihvaPariksha.edges}</p>
                  <p className="text-[11px] text-emerald-700 font-medium pt-1">
                    AI Confidence: {patient.jihvaPariksha.aiConfidence}
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1 text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
                    🫀 Nadi Pariksha (Pulse)
                  </span>
                  <p className="text-slate-600"><strong>Gati:</strong> {patient.nadiPariksha.gati}</p>
                  <p className="text-slate-600"><strong>Heart Rate:</strong> {patient.nadiPariksha.rateBpm} BPM ({patient.nadiPariksha.rhythm})</p>
                  <p className="text-slate-600"><strong>Quality:</strong> {patient.nadiPariksha.pulseQuality}</p>
                  <p className="text-[11px] text-slate-400 pt-1">
                    Sensor: {patient.nadiPariksha.recordedVia}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: AI Summary & Verified Action */}
        <div className="space-y-6">
          <Card variant="highlight" className="border-ayush-primary/30">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <CardTitle className="text-lg">AI Diagnostic Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-2 space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-ayush-border space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Impression</span>
                <p className="text-sm font-bold text-slate-900">
                  {patient.aiSummary.diagnosticImpression}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-ayush-border space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Chikitsa Sutra (Rationale)</span>
                <p className="text-slate-700 leading-relaxed">
                  {patient.aiSummary.treatmentRationale}
                </p>
              </div>

              {/* Verified Action */}
              <div className="pt-2 space-y-2">
                <Button
                  variant={isVerified ? 'secondary' : 'primary'}
                  size="lg"
                  onClick={handleVerify}
                  className="w-full"
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                >
                  {isVerified ? 'Update Signature' : 'Approve Summary'}
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  onClick={() => toast({ title: 'Prescription Draft Opened', message: 'AYUSH Rx formulation template loaded.', type: 'info' })}
                  className="w-full"
                  leftIcon={<FileText className="w-4 h-4" />}
                >
                  Create Prescription Note
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Attached Scanned Records */}
          <Card variant="default">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Scanned Documents ({patient.documents.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-2 space-y-2.5 text-xs">
              {patient.documents.map((doc) => (
                <div key={doc.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-800">{doc.title}</span>
                  <p className="text-[11px] text-slate-500">{doc.date}</p>
                  <p className="text-slate-600 mt-1 font-medium">{doc.extractedFinding}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
