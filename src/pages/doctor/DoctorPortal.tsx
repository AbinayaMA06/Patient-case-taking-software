import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Stethoscope,
  Clock,
  ArrowRight,
  Filter,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MOCK_PATIENT_QUEUE } from '@/data/mockData'

export function DoctorPortal() {
  const [filter, setFilter] = useState<'All' | 'Waiting' | 'In Consultation' | 'Completed'>('All')

  const filteredPatients = MOCK_PATIENT_QUEUE.filter((p) => {
    if (filter === 'All') return true
    return p.status === filter
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-ayush-border shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200">
            <Stethoscope className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Dr. Anand Kulkarni (MD Ayu)
              </h1>
              <Badge variant="ayush" size="sm">
                OPD Room #14
              </Badge>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">
              General Medicine & Kayachikitsa • Ministry of AYUSH Central Hospital
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-slate-400 font-bold uppercase">Queue Status</div>
            <div className="text-base font-bold text-ayush-primary">
              {MOCK_PATIENT_QUEUE.length} Patients Scheduled
            </div>
          </div>
          <Link to="/patient/identify">
            <Button variant="secondary" size="md">
              Kiosk Intake Terminal
            </Button>
          </Link>
        </div>
      </div>

      {/* Queue Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Filter Queue:
          </span>
          {(['All', 'Waiting', 'In Consultation', 'Completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === tab
                  ? 'bg-ayush-primary text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span className="flex items-center gap-1 font-semibold text-rose-600">
            <span className="w-2 h-2 rounded-full bg-rose-600"></span> 1 Red-Flag Triage
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-semibold text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span> 4 Routine
          </span>
        </div>
      </div>

      {/* Patients Queue List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredPatients.map((patient) => {
          const isRedFlag = patient.priority === 'Red-Flag'

          return (
            <Card
              key={patient.id}
              variant="interactive"
              className={`transition-all ${
                isRedFlag
                  ? 'border-rose-300 bg-rose-50/20 hover:border-rose-400'
                  : 'hover:border-ayush-primary'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Token and Patient Bio */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-bold shrink-0 ${
                        isRedFlag
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-ayush-surface text-ayush-primary border border-ayush-border'
                      }`}
                    >
                      <span className="text-xs uppercase font-medium">Token</span>
                      <span className="text-lg font-black tracking-tight">{patient.tokenNumber}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-lg font-bold text-slate-900">
                          {patient.patientName}
                        </h3>
                        <span className="text-xs text-slate-500 font-medium">
                          {patient.age}Y • {patient.gender}
                        </span>
                        {isRedFlag ? (
                          <Badge variant="danger" size="sm">
                            Urgent Red-Flag Alert
                          </Badge>
                        ) : (
                          <Badge variant="ayush" size="sm">
                            {patient.dominantDosha}
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-slate-600 mt-1 font-medium">
                        {patient.chiefComplaint}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> Checked in at {patient.intakeTime}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-slate-600">
                          Status: {patient.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Action */}
                  <div className="flex items-center gap-3 self-end md:self-auto">
                    <Link to={`/doctor/patient/${patient.id}`}>
                      <Button
                        variant={isRedFlag ? 'accent' : 'primary'}
                        size="md"
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        Review Clinical History
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
