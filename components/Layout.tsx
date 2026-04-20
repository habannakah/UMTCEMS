import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { UserRole } from '../types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  CalendarCheck,
  UploadCloud,
  Bell,
  LogOut,
  User,
  Menu,
  X,
  BarChart2,
  AlertTriangle
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { error } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case UserRole.CLUB_REP: return 'Club Representative';
      case UserRole.ADVISOR: return 'Club Advisor';
      case UserRole.MPP_EXCO: return 'MPP Club EXCO';
      case UserRole.HEPA_STAFF: return 'HEPA Staff';
      default: return '';
    }
  };

  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
        isActive(to)
          ? 'bg-umt-navy/5 text-umt-navy font-semibold relative after:absolute after:left-0 after:top-2 after:bottom-2 after:w-1 after:bg-umt-navy after:rounded-r-full'
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
      }`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <Icon size={20} className={isActive(to) ? 'text-umt-navy' : 'text-slate-400 group-hover:text-slate-600 transition-colors'} />
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 transition-colors duration-300">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-10 transition-colors duration-300">
        <div className="p-6 border-b border-slate-200 flex items-center space-x-2 bg-white transition-colors duration-300">
           <div className="w-8 h-8 bg-umt-navy rounded-lg shadow-sm flex items-center justify-center text-white font-bold">U</div>
           <span className="text-xl font-bold text-slate-800 tracking-tight">UMTCEMS</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          {(user?.role === UserRole.MPP_EXCO || user?.role === UserRole.HEPA_STAFF) && (
            <NavItem to="/analytics" icon={BarChart2} label="Analytics" />
          )}
          
          <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Management
          </div>
          
          {user?.role === UserRole.CLUB_REP && (
             <NavItem to="/submit-proposal" icon={FileText} label="Submit Proposal" />
          )}
          
          <NavItem to="/proposals" icon={FileText} label={user?.role === UserRole.CLUB_REP ? "My Proposals" : "Proposals"} />

          {(user?.role === UserRole.ADVISOR || user?.role === UserRole.MPP_EXCO) && (
             <NavItem to="/reviews" icon={FileText} label="Review Queue" />
          )}

          <NavItem to="/events" icon={CalendarCheck} label="Approved Events" />
          
          <NavItem to="/reports" icon={UploadCloud} label="Post-Event Reports" />

          <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Account
          </div>
          <NavItem to="/notifications" icon={Bell} label="Notifications" />
          <NavItem to="/profile" icon={User} label="Profile" />
        </nav>

        <div className="p-4 border-t border-slate-200 bg-slate-50/50 transition-colors duration-300">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-2.5 w-full text-slate-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200 group"
          >
            <LogOut size={20} className="text-slate-400 group-hover:text-red-600 transition-colors" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header & Content Wrapper */}
      <div className="flex-1 flex flex-col md:ml-64">
        <header className="bg-white/80 backdrop-blur-md h-16 border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 p-2 hover:bg-slate-50 rounded-lg transition-colors">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <span className="text-lg font-bold text-slate-800 ml-2 tracking-tight">UMTCEMS</span>
          </div>

          <div className="hidden md:flex items-center ml-auto space-x-4">
            <button className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-50 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="text-right cursor-pointer group">
              <div className="text-sm font-semibold text-slate-800 group-hover:text-umt-navy transition-colors">{user?.name}</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">{user && getRoleLabel(user.role)}</div>
            </div>
            <div className="h-10 w-10 bg-umt-navy/10 text-umt-navy rounded-full flex items-center justify-center font-bold border border-umt-navy/20 cursor-pointer shadow-sm hover:shadow transition-shadow">
              {user?.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-30 bg-white pt-16 px-4">
              <nav className="flex flex-col space-y-2">
                <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                {(user?.role === UserRole.MPP_EXCO || user?.role === UserRole.HEPA_STAFF) && (
                  <NavItem to="/analytics" icon={BarChart2} label="Analytics" />
                )}
                {user?.role === UserRole.CLUB_REP && (
                   <NavItem to="/submit-proposal" icon={FileText} label="Submit Proposal" />
                )}
                <NavItem to="/proposals" icon={FileText} label="Proposals" />
                 {(user?.role === UserRole.ADVISOR || user?.role === UserRole.MPP_EXCO) && (
                   <NavItem to="/reviews" icon={FileText} label="Review Queue" />
                )}
                <NavItem to="/events" icon={CalendarCheck} label="Events" />
                <NavItem to="/reports" icon={UploadCloud} label="Reports" />
                <hr className="my-2"/>
                <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 text-red-600 font-medium">
                  <LogOut size={20} /> <span>Logout</span>
                </button>
             </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {error && (
            <div className="mb-6 flex items-start gap-3 border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
              <AlertTriangle size={18} className="mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold">Backend response issue</div>
                <div className="text-sm">{error}</div>
              </div>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};
