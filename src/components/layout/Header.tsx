import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Globe,
  Maximize2,
  Minimize2,
  Users,
  Home,
  ShieldCheck,
  Stethoscope,
  Building2,
  Menu,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/utils/cn'

export function Header() {
  const location = useLocation()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fontSizeScale, setFontSizeScale] = useState<'normal' | 'large' | 'larger'>('normal')
  const [selectedLang, setSelectedLang] = useState('English')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }

  const cycleFontSize = () => {
    const root = document.documentElement
    if (fontSizeScale === 'normal') {
      root.style.setProperty('--app-font-scale', '1.1')
      setFontSizeScale('large')
    } else if (fontSizeScale === 'large') {
      root.style.setProperty('--app-font-scale', '1.2')
      setFontSizeScale('larger')
    } else {
      root.style.setProperty('--app-font-scale', '1')
      setFontSizeScale('normal')
    }
  }

  // Active section helper
  const isPatientArea = location.pathname.startsWith('/patient')
  const isDoctorArea = location.pathname.startsWith('/doctor')
  const isAdminArea = location.pathname.startsWith('/admin')

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-ayush-border/80 shadow-2xs">
      {/* Official Government Top Ribbon */}
      <div className="bg-[#093322] text-white text-[11px] font-medium tracking-wide py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-ayush-accent/20 text-amber-300 font-bold px-1.5 py-0.5 rounded text-[10px] tracking-wider uppercase border border-amber-400/30">
              SIH 2026 Prototype
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="text-emerald-100 font-semibold">
              Ministry of AYUSH • Government of India
            </span>
            <span className="hidden md:inline text-emerald-300/80">
              (आयुष मंत्रालय, भारत सरकार)
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Font scale accessibility */}
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-emerald-200/80 hidden sm:inline">Text Size:</span>
              <button
                type="button"
                onClick={cycleFontSize}
                className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
                title="Toggle Text Size (Accessibility)"
              >
                A{fontSizeScale === 'large' ? '+' : fontSizeScale === 'larger' ? '++' : ''}
              </button>
            </div>

            {/* Language toggle demo */}
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-emerald-200" />
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="bg-transparent text-emerald-100 text-xs font-semibold focus:outline-none cursor-pointer"
                aria-label="Select Interface Language"
              >
                <option value="English" className="text-slate-900">English</option>
                <option value="हिन्दी" className="text-slate-900">हिन्दी (Hindi)</option>
                <option value="தமிழ்" className="text-slate-900">தமிழ் (Tamil)</option>
                <option value="తెలుగు" className="text-slate-900">తెలుగు (Telugu)</option>
                <option value="मराठी" className="text-slate-900">मराठी (Marathi)</option>
                <option value="ગુજરાતી" className="text-slate-900">ગુજરાતી (Gujarati)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group select-none">
            <div className="w-11 h-11 rounded-2xl bg-ayush-surface border border-ayush-border flex items-center justify-center text-2xl shadow-2xs group-hover:border-ayush-primary/50 transition-colors">
              🌿
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-ayush-primary transition-colors">
                  MediKiosk
                </span>
                <span className="hidden sm:inline-block">
                  <Badge variant="ayush" size="sm">
                    AYUSH AI
                  </Badge>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium tracking-tight line-clamp-1">
                AI-Powered AYUSH Clinical History Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links & Quick Portals */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <Link
              to="/"
              className={cn(
                'px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5',
                location.pathname === '/'
                  ? 'bg-ayush-surface text-ayush-primary font-bold'
                  : 'text-slate-600 hover:text-ayush-primary hover:bg-slate-50'
              )}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>

            <Link
              to="/patient/identify"
              className={cn(
                'px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5',
                isPatientArea
                  ? 'bg-ayush-surface text-ayush-primary font-bold'
                  : 'text-slate-600 hover:text-ayush-primary hover:bg-slate-50'
              )}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Patient Kiosk
            </Link>

            <Link
              to="/doctor"
              className={cn(
                'px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5',
                isDoctorArea
                  ? 'bg-ayush-surface text-ayush-primary font-bold'
                  : 'text-slate-600 hover:text-ayush-primary hover:bg-slate-50'
              )}
            >
              <Stethoscope className="w-4 h-4 text-sky-600" />
              Doctor Portal
            </Link>

            <Link
              to="/admin"
              className={cn(
                'px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5',
                isAdminArea
                  ? 'bg-ayush-surface text-ayush-primary font-bold'
                  : 'text-slate-600 hover:text-ayush-primary hover:bg-slate-50'
              )}
            >
              <Building2 className="w-4 h-4 text-amber-600" />
              Admin
            </Link>
          </nav>

          {/* Right Actions: Login & Fullscreen Kiosk Mode */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Kiosk Fullscreen'}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-ayush-primary hover:bg-ayush-surface transition-colors hidden sm:flex items-center"
              title="Kiosk Fullscreen Mode"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            <Link to="/login">
              <Button
                variant={location.pathname === '/login' ? 'primary' : 'outline'}
                size="md"
                leftIcon={<Users className="w-4 h-4" />}
                className="hidden sm:inline-flex"
              >
                Change Role
              </Button>
            </Link>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 lg:hidden"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-2 border-t border-slate-100 mt-3 space-y-2 animate-in slide-in-from-top-2 duration-150">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-ayush-surface"
            >
              <Home className="w-4 h-4 text-slate-500" />
              Home
            </Link>
            <Link
              to="/patient/identify"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-ayush-surface"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Patient Kiosk Intake
            </Link>
            <Link
              to="/doctor"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-ayush-surface"
            >
              <Stethoscope className="w-4 h-4 text-sky-600" />
              Doctor Review Queue
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-ayush-surface"
            >
              <Building2 className="w-4 h-4 text-amber-600" />
              Admin Portal
            </Link>
            <div className="pt-2">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" size="lg" className="w-full">
                  Select Portal Role
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
