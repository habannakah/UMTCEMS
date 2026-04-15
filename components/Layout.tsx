import React from 'react';
import { useAuth } from '../contexts/AuthContext';
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
  BarChart2
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
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
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        isActive(to) 
          ? 'bg-umt-navy text-white shadow-md' 
          : 'text-slate-600 hover:bg-slate-100'
      }`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </Link>
  );

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-10">
        <div className="p-6 border-b border-slate-100 flex items-center space-x-2">
           <div className="w-8 h-8 bg-umt-navy rounded-md flex items-center justify-center text-white font-bold">U</div>
           <span className="text-xl font-bold text-slate-800">UMT Club Event Management System</span>
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

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header & Content Wrapper */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Header */}
        <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-20">
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <span className="text-lg font-bold text-slate-800 ml-2">UMT Club Event Management System</span>
          </div>

          <div className="hidden md:flex items-center ml-auto space-x-4">
            <div className="text-right">
              <div className="text-sm font-semibold text-slate-800">{user?.name}</div>
              <div className="text-xs text-slate-500">{user && getRoleLabel(user.role)}</div>
            </div>
            <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold">
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
          {children}
        </main>
      </div>
    </div>
  );
};