import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { ProposalStatus, UserRole } from '../types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  CalendarCheck,
  UploadCloud,
  Bell,
  CheckCircle2,
  Clock,
  LogOut,
  User,
  Menu,
  X,
  BarChart2,
  AlertCircle,
  AlertTriangle
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { error, proposals } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const notificationRef = React.useRef<HTMLDivElement>(null);

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

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = React.useMemo(() => {
    if (!user) return [];

    const relevantProposals = proposals.filter((proposal) => {
      if (user.role === UserRole.CLUB_REP) {
        return proposal.clubName === user.clubName;
      }

      if (user.role === UserRole.ADVISOR) {
        return proposal.clubName === user.clubName && proposal.status === ProposalStatus.PENDING_ADVISOR;
      }

      return proposal.status === ProposalStatus.PENDING_MPP || proposal.status === ProposalStatus.NEEDS_IMPROVEMENT;
    });

    return relevantProposals
      .map((proposal) => {
        if (proposal.status === ProposalStatus.NEEDS_IMPROVEMENT) {
          return {
            id: proposal.id,
            title: 'Revision requested',
            message: proposal.title,
            meta: proposal.clubName,
            tone: 'warning' as const,
          };
        }

        if (proposal.status === ProposalStatus.APPROVED) {
          return {
            id: proposal.id,
            title: 'Proposal approved',
            message: proposal.title,
            meta: proposal.eventDate || proposal.clubName,
            tone: 'success' as const,
          };
        }

        if (proposal.status === ProposalStatus.PENDING_ADVISOR) {
          return {
            id: proposal.id,
            title: 'Advisor review needed',
            message: proposal.title,
            meta: proposal.clubName,
            tone: 'pending' as const,
          };
        }

        return {
          id: proposal.id,
          title: 'MPP review needed',
          message: proposal.title,
          meta: proposal.clubName,
          tone: 'pending' as const,
        };
      })
      .slice(0, 6);
  }, [proposals, user]);

  const notificationTone = {
    warning: {
      icon: AlertCircle,
      className: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    success: {
      icon: CheckCircle2,
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    pending: {
      icon: Clock,
      className: 'bg-umt-paper text-umt-navy border-umt-navy/15',
    },
  };

  const unreadCount = notifications.length;

  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
        isActive(to)
          ? 'bg-umt-paper text-umt-navy font-bold relative shadow-sm ring-1 ring-umt-navy/5 after:absolute after:left-0 after:top-2 after:bottom-2 after:w-1 after:bg-umt-accent after:rounded-r-full'
          : 'text-surface-600 hover:bg-umt-paper/70 hover:text-umt-ink font-semibold hover:shadow-sm'
      }`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <Icon size={20} className={isActive(to) ? 'text-umt-navy' : 'text-surface-400 group-hover:text-umt-navy transition-colors'} />
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="min-h-screen flex bg-umt-paper paper-grid transition-colors duration-300">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white/95 backdrop-blur-md border-r border-umt-navy/10 fixed h-full z-10 transition-colors duration-300 shadow-[12px_0_32px_-30px_rgba(7,27,47,0.75)]">
        <div className="p-6 border-b border-umt-navy/10 flex items-center space-x-2 bg-white/90 transition-colors duration-300">
           <div className="umt-mark w-9 h-9 bg-white rounded-md flex items-center justify-center overflow-hidden ring-1 ring-umt-navy/10">
             <img src="/umt.png" alt="UMT logo" className="h-7 w-7 object-contain" />
           </div>
           <span className="text-xl font-extrabold text-umt-ink tracking-tight">UMTCEMS</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          {(user?.role === UserRole.MPP_EXCO || user?.role === UserRole.HEPA_STAFF) && (
            <NavItem to="/analytics" icon={BarChart2} label="Analytics" />
          )}
          
          <div className="pt-4 pb-2 px-4 text-xs font-extrabold text-surface-400 uppercase tracking-[0.18em]">
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

          <div className="pt-4 pb-2 px-4 text-xs font-extrabold text-surface-400 uppercase tracking-[0.18em]">
            Account
          </div>
          <NavItem to="/notifications" icon={Bell} label="Notifications" />
          <NavItem to="/profile" icon={User} label="Profile" />
        </nav>

        <div className="p-4 border-t border-umt-navy/10 bg-umt-paper/75 transition-colors duration-300">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-2.5 w-full text-surface-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200 group"
          >
            <LogOut size={20} className="text-slate-400 group-hover:text-red-600 transition-colors" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header & Content Wrapper */}
      <div className="flex-1 flex flex-col md:ml-64">
        <header className="bg-white/90 backdrop-blur-md h-16 border-b border-umt-navy/10 flex items-center justify-between px-6 sticky top-0 z-20 shadow-[0_10px_30px_-28px_rgba(7,27,47,0.9)]">
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-surface-600 p-2 hover:bg-umt-paper rounded-lg transition-colors">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="umt-mark w-8 h-8 bg-white rounded-md flex items-center justify-center overflow-hidden ring-1 ring-umt-navy/10 ml-2">
              <img src="/umt.png" alt="UMT logo" className="h-6 w-6 object-contain" />
            </div>
            <span className="text-lg font-extrabold text-umt-ink ml-2 tracking-tight">UMTCEMS</span>
          </div>

          <div className="hidden md:flex items-center ml-auto space-x-4">
            <div className="relative" ref={notificationRef}>
              <button
                type="button"
                onClick={() => setIsNotificationOpen((current) => !current)}
                className="text-surface-400 hover:text-umt-navy p-2 rounded-full hover:bg-umt-paper transition-colors relative"
                aria-label="Open notifications"
                aria-expanded={isNotificationOpen}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-umt-accent text-white text-[10px] font-extrabold rounded-full border-2 border-white flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-3 w-96 max-w-[calc(100vw-2rem)] bg-white border border-umt-navy/10 rounded-xl shadow-floating overflow-hidden z-50">
                  <div className="px-5 py-4 border-b border-umt-navy/10 bg-umt-paper/70">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-display font-semibold text-lg text-umt-ink tracking-tight">Notifications</h3>
                        <p className="text-xs font-semibold text-surface-500 uppercase tracking-[0.14em] mt-0.5">
                          {unreadCount ? `${unreadCount} active update${unreadCount === 1 ? '' : 's'}` : 'No active updates'}
                        </p>
                      </div>
                      <span className="h-2.5 w-2.5 rounded-full bg-umt-accent"></span>
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto p-2">
                    {notifications.length === 0 ? (
                      <div className="px-6 py-10 text-center">
                        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-umt-paper text-umt-navy flex items-center justify-center border border-umt-navy/10">
                          <Bell size={22} strokeWidth={1.8} />
                        </div>
                        <p className="font-semibold text-umt-ink">You are all caught up</p>
                        <p className="text-sm text-surface-500 mt-1">New proposal activity will appear here.</p>
                      </div>
                    ) : (
                      notifications.map((notification) => {
                        const tone = notificationTone[notification.tone];
                        const Icon = tone.icon;

                        return (
                          <button
                            key={notification.id}
                            type="button"
                            onClick={() => {
                              setIsNotificationOpen(false);
                              navigate(`/proposals/${notification.id}`);
                            }}
                            className="w-full flex items-start gap-3 rounded-lg px-3 py-3 text-left hover:bg-umt-paper/70 transition-colors group"
                          >
                            <span className={`mt-0.5 h-9 w-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${tone.className}`}>
                              <Icon size={17} strokeWidth={2.1} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-extrabold text-sm text-umt-ink group-hover:text-umt-navy transition-colors">
                                {notification.title}
                              </span>
                              <span className="block text-sm text-surface-600 truncate mt-0.5">{notification.message}</span>
                              <span className="block text-[11px] font-bold text-surface-400 uppercase tracking-[0.14em] mt-1">
                                {notification.meta}
                              </span>
                            </span>
                          </button>
                        );
                      })
                    )}
                  </div>

                  <div className="px-4 py-3 border-t border-umt-navy/10 bg-white">
                    <button
                      type="button"
                      onClick={() => {
                        setIsNotificationOpen(false);
                        navigate('/proposals');
                      }}
                      className="w-full text-center text-sm font-extrabold text-umt-navy hover:text-umt-light transition-colors"
                    >
                      View all proposals
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="h-6 w-px bg-umt-navy/10"></div>
            <div className="text-right cursor-pointer group">
              <div className="text-sm font-extrabold text-umt-ink group-hover:text-umt-navy transition-colors">{user?.name}</div>
              <div className="text-xs font-bold text-surface-500 uppercase tracking-[0.14em]">{user && getRoleLabel(user.role)}</div>
            </div>
            <div className="h-10 w-10 bg-umt-paper text-umt-navy rounded-full flex items-center justify-center font-display font-bold border border-umt-navy/15 cursor-pointer shadow-sm hover:shadow transition-shadow">
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
