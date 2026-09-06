import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  Building2,
  Cpu,
  Globe,
  Users,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Home,
  LogOut,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ToastContainer } from '@/components/ui/Toast'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/utils/cn'

export function AdminLayout() {
  const location = useLocation()
  const { toast } = useToast()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    {
      label: 'Operations & Telemetry',
      path: '/admin',
      icon: Building2,
      badge: '8 Active',
      badgeVariant: 'ayush' as const,
      exact: true,
    },
  ]

  const handleSync = () => {
    toast({
      title: 'Telemetry Sync Initiated',
      message: 'ABDM mesh nodes and local kiosk fleet synced successfully.',
      type: 'info',
    })
  }

  const isCurrentActive = (itemPath: string, exact: boolean) => {
    if (exact) {
      return location.pathname === itemPath
    }
    return location.pathname.startsWith(itemPath)
  }

  return (
    <div className="min-h-screen flex bg-ayush-warm-bg text-slate-800 antialiased">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col bg-white border-r border-ayush-border transition-all duration-300 relative z-30',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-ayush-border flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-ayush-surface border border-ayush-border flex items-center justify-center shrink-0">
              <span className="text-xl">🌿</span>
            </div>
            {!collapsed && (
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900 tracking-tight text-base">
                    MediKiosk
                  </span>
                  <Badge variant="saffron" size="sm">
                    Admin
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Hospital Operations</p>
              </div>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Hospital Admin Info Card */}
        <div className={cn('p-4 border-b border-slate-100 bg-amber-50/40', collapsed && 'p-2 text-center')}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-bold shrink-0">
              ND
            </div>
            {!collapsed && (
              <div className="truncate">
                <h2 className="text-xs font-bold text-slate-900 truncate">Central AYUSH Node</h2>
                <p className="text-[11px] text-slate-500 truncate">Terminal Grid #04 • ABDM v2</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Mesh Synchronized</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {!collapsed && (
            <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Management Portal
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon
            const active = isCurrentActive(item.path, item.exact)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative',
                  active
                    ? 'bg-ayush-primary text-white shadow-xs'
                    : 'text-slate-600 hover:bg-ayush-surface hover:text-ayush-primary'
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={cn('w-4 h-4 shrink-0', active ? 'text-white' : 'text-slate-500 group-hover:text-ayush-primary')} />
                {!collapsed && <span className="truncate flex-1">{item.label}</span>}
                {!collapsed && item.badge && (
                  <Badge
                    variant={active ? 'saffron' : item.badgeVariant}
                    size="sm"
                    className={active ? 'bg-amber-400 text-amber-950 font-bold border-none' : ''}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}

          {!collapsed && (
            <div className="pt-4 pb-1 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Hospital Subsystems
            </div>
          )}

          <div
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors',
              collapsed && 'justify-center'
            )}
            onClick={handleSync}
          >
            <Cpu className="w-4 h-4 shrink-0 text-slate-400" />
            {!collapsed && <span className="truncate">Active Kiosks Grid</span>}
          </div>

          <div
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors',
              collapsed && 'justify-center'
            )}
            onClick={handleSync}
          >
            <Globe className="w-4 h-4 shrink-0 text-slate-400" />
            {!collapsed && <span className="truncate">Language Telemetry</span>}
          </div>

          <div
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors',
              collapsed && 'justify-center'
            )}
            onClick={handleSync}
          >
            <Users className="w-4 h-4 shrink-0 text-slate-400" />
            {!collapsed && <span className="truncate">Queue Flow & Wait Times</span>}
          </div>

          <div
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors',
              collapsed && 'justify-center'
            )}
            onClick={handleSync}
          >
            <ShieldCheck className="w-4 h-4 shrink-0 text-slate-400" />
            {!collapsed && <span className="truncate">ABDM Security Logs</span>}
          </div>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-3 border-t border-ayush-border space-y-1">
          <Link
            to="/login"
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors',
              collapsed && 'justify-center'
            )}
            title="Switch Role"
          >
            <LogOut className="w-4 h-4 text-slate-500" />
            {!collapsed && <span>Switch Role</span>}
          </Link>

          <Link
            to="/"
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors',
              collapsed && 'justify-center'
            )}
            title="Return to Home"
          >
            <Home className="w-4 h-4 text-slate-500" />
            {!collapsed && <span>Public Home</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 bg-white border-b border-ayush-border px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Hospital Command & Operations Center
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 bg-ayush-surface px-3 py-1.5 rounded-xl border border-ayush-border">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Gateway: Online (99.98% Uptime)</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSync}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Sync Mesh
            </Button>

            <Link to="/login">
              <Button variant="outline" size="sm">
                Change Role
              </Button>
            </Link>
          </div>
        </header>

        {/* Mobile Sidebar Sheet / Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />

            <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col z-10 border-r border-ayush-border">
              <div className="p-4 border-b border-ayush-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🌿</span>
                  <div>
                    <h2 className="font-bold text-slate-900 text-sm">MediKiosk Admin</h2>
                    <p className="text-[11px] text-slate-500">Hospital Command Portal</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Admin Profile */}
              <div className="p-4 border-b border-slate-100 bg-amber-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-bold">
                    ND
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Central AYUSH Node</h3>
                    <p className="text-[11px] text-slate-500">Terminal Fleet #04 • Live</p>
                  </div>
                </div>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex-1 p-4 space-y-2 overflow-y-auto">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Navigation
                </div>
                {navItems.map((item) => {
                  const Icon = item.icon
                  const active = isCurrentActive(item.path, item.exact)
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors',
                        active
                          ? 'bg-ayush-primary text-white'
                          : 'text-slate-700 hover:bg-ayush-surface'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge
                          variant={active ? 'saffron' : item.badgeVariant}
                          size="sm"
                          className={active ? 'bg-amber-400 text-amber-950 font-bold border-none' : ''}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  )
                })}
              </div>

              <div className="p-4 border-t border-ayush-border space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <LogOut className="w-4 h-4 text-slate-500" />
                  <span>Switch Role</span>
                </Link>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Home className="w-4 h-4 text-slate-500" />
                  <span>Public Home</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 w-full p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>

        <ToastContainer />
      </div>
    </div>
  )
}
