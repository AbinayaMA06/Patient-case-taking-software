import {
  Building2,
  Cpu,
  Globe,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/hooks/useToast'
import { MOCK_ADMIN_METRICS } from '@/data/mockData'

export function AdminPortal() {
  const { toast } = useToast()
  const metrics = MOCK_ADMIN_METRICS

  const handleRefresh = () => {
    toast({
      title: 'Telemetry Refreshed',
      message: 'Kiosk network status and ABDM logs synchronized.',
      type: 'info',
    })
  }

  const kiosks = [
    { id: 'AYUSH-KIOSK-01', location: 'Main OPD Lobby A', status: 'Online', battery: '100%', intakes: 48 },
    { id: 'AYUSH-KIOSK-02', location: 'Panchakarma Wing', status: 'Online', battery: '98%', intakes: 36 },
    { id: 'AYUSH-KIOSK-03', location: 'Kayachikitsa Dept', status: 'Online', battery: '100%', intakes: 42 },
    { id: 'AYUSH-KIOSK-04', location: 'OPD Ground Floor (Active)', status: 'In Use', battery: '95%', intakes: 52 },
    { id: 'AYUSH-KIOSK-05', location: 'Shalya / Shalakya', status: 'Online', battery: '91%', intakes: 28 },
    { id: 'AYUSH-KIOSK-06', location: 'Yoga & Naturopathy Block', status: 'Online', battery: '100%', intakes: 21 },
    { id: 'AYUSH-KIOSK-07', location: 'Pediatric Kaumarbhritya', status: 'Idle', battery: '89%', intakes: 14 },
    { id: 'AYUSH-KIOSK-08', location: 'Emergency Triage Entry', status: 'Online', battery: '100%', intakes: 5 },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-ayush-border shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Kiosk Operations & Hospital Telemetry
              </h1>
              <Badge variant="saffron" size="sm">
                Live Grid
              </Badge>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">
              Ministry of AYUSH • Central Hospital Intake Monitoring Node
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={handleRefresh}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Sync Telemetry
        </Button>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="default">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase">Active Kiosks</span>
              <div className="text-3xl font-black text-slate-900 mt-1">{metrics.activeKiosks} / 8</div>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> All terminals responsive
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card variant="default">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase">Total Intakes Today</span>
              <div className="text-3xl font-black text-slate-900 mt-1">{metrics.totalIntakesToday}</div>
              <span className="text-xs text-slate-500 mt-1 block">+18% vs yesterday</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card variant="default">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase">Avg Intake Time</span>
              <div className="text-3xl font-black text-slate-900 mt-1">{metrics.avgIntakeTimeMinutes}m</div>
              <span className="text-xs text-emerald-600 font-semibold mt-1 block">Within 5m target</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card variant="default">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase">Red Flags Triaged</span>
              <div className="text-3xl font-black text-rose-600 mt-1">{metrics.redFlagsIntercepted}</div>
              <span className="text-xs text-rose-600 font-semibold mt-1 block">Escalated to ER</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid: Kiosk Fleet Status & Language Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kiosks Fleet */}
        <div className="lg:col-span-2">
          <Card variant="default">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-lg">Kiosk Fleet Terminal Status</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="divide-y divide-slate-100 text-sm">
                {kiosks.map((k) => (
                  <div key={k.id} className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${k.status === 'Online' ? 'bg-emerald-500' : k.status === 'In Use' ? 'bg-sky-500 animate-pulse' : 'bg-amber-400'}`}></div>
                      <div>
                        <h4 className="font-bold text-slate-900">{k.id}</h4>
                        <p className="text-xs text-slate-500">{k.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-slate-600 font-medium">{k.intakes} intakes</span>
                      <span className="text-slate-400">Bat: {k.battery}</span>
                      <Badge variant={k.status === 'Online' ? 'ayush' : k.status === 'In Use' ? 'default' : 'warning'} size="sm">
                        {k.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Language & Health */}
        <div className="space-y-6">
          <Card variant="default">
            <CardHeader className="border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-700" />
                <CardTitle className="text-base">Dialect Distribution</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-3 text-xs">
              {metrics.topLanguages.map((lang) => (
                <div key={lang.language} className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span>{lang.language}</span>
                    <span>{lang.count} ({lang.pct})</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-ayush-primary rounded-full"
                      style={{ width: lang.pct }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader className="border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <CardTitle className="text-base">System Health & Compliance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-600">ABHA Gateway:</span>
                <span className="font-bold text-emerald-700">Connected</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-600">Voice Recognition:</span>
                <span className="font-bold text-emerald-700">98.8% accuracy</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-600">Medical OCR Engine:</span>
                <span className="font-bold text-emerald-700">Operational</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-600">FHIR Resource Export:</span>
                <span className="font-bold text-emerald-700">v4.0.1 Ready</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
