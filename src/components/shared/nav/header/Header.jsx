import { Bell, User, LogOut, Menu } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import LogoutButton from './components/LogoutButton';
import ProfileButton from './components/ProfileButton';
import ThemeToggle from '../../ThemeToggle';

export const runtime = 'nodejs';

export default async function Header() {
  // Get current User info
  const currentUser = await getCurrentUser();

  // Fallbacks
  const role = currentUser?.role || 'guest';
  const fullName = currentUser?.fullName || 'Usuario';

  // Translate role
  let roleLabel = 'Invitado';
  if (role === 'doctor') roleLabel = 'Médico';
  else if (role === 'patient') roleLabel = 'Paciente';
  else if (role === 'employee') roleLabel = 'Empleado';

  return (
    <header className="sticky top-0 z-40 border-b-2 border-border bg-surface/95 shadow-lg backdrop-blur-lg">
      {/* Desktop header */}
      <div className="hidden items-center justify-between px-6 py-4 md:flex">
        <div className="flex items-center gap-4">
          <img src="/images/logo.webp" alt="" className="max-w-10" />
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-main">MedTrack</h2>
            <p className="text-sm font-medium text-muted">Panel de {roleLabel}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="group relative rounded-xl border-2 border-transparent p-3 transition-all duration-200 hover:border-medtrack-blue-light hover:bg-linear-to-br hover:from-medtrack-blue-light/10 hover:to-medtrack-blue-light/20 active:scale-95">
            <Bell className="h-5 w-5 text-muted transition-colors duration-200 group-hover:text-medtrack-blue-solid" />
            <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-r from-red-500 to-rose-600 text-xs font-bold text-white shadow-lg">
              3
            </span>
          </button>

          <div className="flex items-center gap-3 border-l-2 border-border pl-4">
            <div className="text-right">
              <p className="text-sm font-bold text-main">{fullName}</p>
              <div className="flex items-center justify-start gap-1.5">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                <p className="text-xs font-medium text-muted">{roleLabel}</p>
              </div>
            </div>
            <ProfileButton role={role} />
          </div>

          {/* Logout */}
          <LogoutButton />
        </div>
      </div>

      {/* Mobile header */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg">
            <User className="h-5 w-5 text-white" />
            <div className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-main">{fullName}</p>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              <p className="text-xs font-medium text-muted">{roleLabel}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="group relative rounded-xl p-2 transition-all duration-200 hover:bg-gray-100 active:scale-95">
            <Bell className="h-5 w-5 text-muted transition-colors duration-200 group-hover:text-medtrack-blue-solid" />
            <span className="absolute top-0.5 right-0.5 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-linear-to-r from-red-500 to-rose-600 text-[10px] font-bold text-white shadow-lg">
              3
            </span>
          </button>
          <button className="rounded-xl p-2 transition-all duration-200 hover:bg-gray-100 active:scale-95">
            <Menu className="h-5 w-5 text-muted" />
          </button>
        </div>
      </div>
    </header>
  );
}
