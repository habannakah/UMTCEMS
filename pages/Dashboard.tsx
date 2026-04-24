import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { UserRole, ProposalStatus, EventProposal } from '../types';
import { FileText, Clock, AlertCircle, CheckCircle, Plus, Calendar, Activity, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';

// --- Specialized Components ---

const StatCard = ({ icon: Icon, label, value }: any) => (
  <div className="bg-white p-6 flex items-center space-x-4 border border-surface-200 rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 ease-out-expo transform hover:-translate-y-0.5">
    <div className="p-3 bg-umt-navy/5 text-umt-navy rounded-lg">
      <Icon size={24} strokeWidth={1.75} />
    </div>
    <div>
      <div className="text-2xl font-display font-semibold text-surface-900 tracking-tight">{value}</div>
      <div className="text-[11px] font-semibold text-surface-500 uppercase tracking-widest mt-1">{label}</div>
    </div>
  </div>
);

const ClubRepDashboard = ({ user, proposals }: { user: any, proposals: EventProposal[] }) => {
  const navigate = useNavigate();
  const myProposals = proposals.filter(p => p.clubName === user.clubName);
  const actionRequired = myProposals.filter(p => p.status === ProposalStatus.NEEDS_IMPROVEMENT);
  const activeProposals = myProposals.filter(p => ![ProposalStatus.APPROVED, ProposalStatus.REJECTED].includes(p.status));
  const upcomingEvents = myProposals.filter(p => p.status === ProposalStatus.APPROVED);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Action Required Alert */}
      {actionRequired.length > 0 && (
        <div className="bg-red-50/80 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-red-100/50 rounded-xl shadow-soft">
           <div>
             <h3 className="font-display font-semibold text-[17px] text-red-900 flex items-center"><AlertCircle className="mr-2.5 text-red-500" size={20}/> Action Required</h3>
             <p className="text-red-800/80 mt-1 text-[15px]">You have {actionRequired.length} proposal(s) that need revisions.</p>
           </div>
           <button onClick={() => navigate(`/proposals/${actionRequired[0].id}`)} className="bg-white px-5 py-2.5 text-[15px] font-medium text-red-700 flex items-center border border-red-100 rounded-lg hover:bg-red-50 hover:text-red-800 transition-all duration-300 ease-out-expo shadow-sm hover:shadow-soft">
             Review Feedback <ArrowRight size={16} className="ml-2" />
           </button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Link to="/submit-proposal" className="bg-white p-8 flex flex-col items-center justify-center text-center border border-surface-200 rounded-xl shadow-soft hover:shadow-floating transition-all duration-500 ease-out-expo group transform hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute inset-x-8 top-0 h-px bg-umt-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out-expo"></div>
           <div className="p-4 bg-surface-100 text-surface-600 rounded-2xl mb-4 group-hover:bg-umt-accent/10 group-hover:text-umt-accent transition-colors duration-300 relative z-10">
             <Plus size={36} strokeWidth={1.5} />
           </div>
           <span className="font-display font-semibold text-xl text-surface-900 relative z-10 tracking-tight">Create New Proposal</span>
           <span className="text-[15px] mt-2 text-surface-500 relative z-10 leading-relaxed">Draft a new event for {user.clubName}</span>
        </Link>
        <Link to="/reports" className="bg-white p-8 flex flex-col items-center justify-center text-center border border-surface-200 rounded-xl shadow-soft hover:shadow-floating transition-all duration-500 ease-out-expo group transform hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute inset-x-8 top-0 h-px bg-umt-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out-expo"></div>
           <div className="p-4 bg-surface-100 text-surface-600 rounded-2xl mb-4 group-hover:bg-umt-accent/10 group-hover:text-umt-accent transition-colors duration-300 relative z-10">
             <FileText size={36} strokeWidth={1.5} />
           </div>
           <span className="font-display font-semibold text-xl text-surface-900 relative z-10 tracking-tight">Submit Post-Event Report</span>
           <span className="text-[15px] mt-2 text-surface-500 relative z-10 leading-relaxed">Pending reports: 1</span>
        </Link>
      </div>

      {/* Active Proposals Timeline */}
      <div className="bg-white p-6 border border-surface-200 rounded-xl shadow-soft">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display font-semibold text-xl text-surface-900 tracking-tight">Active Proposals Tracker</h3>
          <Link to="/proposals" className="text-[15px] font-medium text-umt-light hover:text-umt-navy transition-colors duration-200 ease-out-expo group flex items-center">
            View All <ArrowRight size={14} className="ml-1.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ease-out-expo" />
          </Link>
        </div>
        <div className="overflow-x-auto rounded-lg border border-surface-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-50/80">
                <th className="px-5 py-3.5 border-b border-surface-200 font-semibold text-[13px] text-surface-500 uppercase tracking-wider">Event Title</th>
                <th className="px-5 py-3.5 border-b border-surface-200 font-semibold text-[13px] text-surface-500 uppercase tracking-wider">Submitted</th>
                <th className="px-5 py-3.5 border-b border-surface-200 font-semibold text-[13px] text-surface-500 uppercase tracking-wider">Current Stage</th>
                <th className="px-5 py-3.5 border-b border-surface-200 font-semibold text-[13px] text-surface-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {activeProposals.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-10 text-center text-surface-400 bg-white">No active proposals.</td></tr>
              ) : (
                activeProposals.map(p => (
                  <tr key={p.id} className="hover:bg-surface-50/50 transition-colors duration-200 border-b border-surface-100 last:border-0 group cursor-pointer" onClick={() => navigate(`/proposals/${p.id}`)}>
                    <td className="px-5 py-4 font-medium text-surface-900 group-hover:text-umt-light transition-colors">{p.title}</td>
                    <td className="px-5 py-4 text-[15px] text-surface-500">{p.dateSubmitted}</td>
                    <td className="px-5 py-4"><StatusBadge status={p.status} /></td>
                    <td className="px-5 py-4">
                      <div className="text-[14px] font-semibold text-umt-light flex items-center opacity-70 group-hover:opacity-100 transition-opacity">
                        Track <ArrowRight size={14} className="ml-1.5 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out-expo" />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdvisorDashboard = ({ user, proposals }: { user: any, proposals: EventProposal[] }) => {
  const navigate = useNavigate();
  // Filter for proposals specifically from the club this advisor is assigned to
  const myClubProposals = proposals.filter(p => p.clubName === user.clubName);
  const pendingReview = myClubProposals.filter(p => p.status === ProposalStatus.PENDING_ADVISOR);
  const activeProposals = myClubProposals.filter(p => ![ProposalStatus.APPROVED, ProposalStatus.REJECTED].includes(p.status));
  
  return (
    <div className="space-y-6 md:space-y-8">
       {/* Proposals to Review */}
       <div className="bg-white p-6 border border-surface-200 rounded-xl shadow-soft">
         <div className="flex justify-between items-center mb-6">
           <h3 className="font-display font-semibold text-xl text-surface-900 flex items-center tracking-tight"><Clock className="mr-2 text-umt-accent" size={22} strokeWidth={1.5} /> Proposals to Review</h3>
           <span className="font-semibold text-[11px] uppercase tracking-widest bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200/50">{pendingReview.length} Pending</span>
         </div>
         <div className="space-y-3">
           {pendingReview.length === 0 ? (
             <div className="text-center py-10 px-6 bg-surface-50/50 rounded-xl border border-surface-100 border-dashed">
               <CheckCircle className="mx-auto text-emerald-500 mb-3" size={32} strokeWidth={1.5} />
               <p className="font-semibold text-surface-700">You're all caught up!</p>
               <p className="text-[15px] text-surface-500 mt-1">No proposals pending your review for {user.clubName}.</p>
             </div>
           ) : (
             pendingReview.map(p => (
               <div key={p.id} className="bg-white p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-surface-200 rounded-lg hover:border-umt-accent/40 hover:shadow-soft transition-all duration-300 ease-out-expo group cursor-pointer" onClick={() => navigate(`/proposals/${p.id}`)}>
                 <div>
                   <h4 className="font-display font-semibold text-lg text-surface-900 group-hover:text-umt-navy transition-colors">{p.title}</h4>
                   <p className="text-[13px] font-medium text-surface-500 mt-1 uppercase tracking-wider">Submitted: <span className="text-surface-600">{p.dateSubmitted}</span></p>
                 </div>
                 <button onClick={(e) => { e.stopPropagation(); navigate(`/proposals/${p.id}`); }} className="bg-umt-navy hover:bg-umt-light text-white px-5 py-2.5 rounded-lg font-semibold text-[15px] whitespace-nowrap transition-colors duration-300 flex items-center shadow-sm">
                   Review Now <ArrowRight size={16} className="ml-2 opacity-80" strokeWidth={2.5} />
                 </button>
               </div>
             ))
           )}
         </div>
       </div>

       {/* My Club Overview */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
         <div className="bg-white p-6 border border-surface-200 rounded-xl shadow-soft">
            <h3 className="font-display font-semibold text-xl text-surface-900 mb-6 flex items-center tracking-tight"><Activity className="mr-2 text-umt-navy opacity-70" size={22} strokeWidth={1.5} /> Proposal Status</h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center pb-4 border-b border-surface-100 last:border-0 last:pb-0">
                <span className="font-medium text-[15px] text-surface-700">Waiting for MPP Approval</span>
                <span className="bg-surface-50 text-surface-700 px-3 py-1 rounded-full font-semibold text-[13px] border border-surface-200">{myClubProposals.filter(p => p.status === ProposalStatus.PENDING_MPP).length}</span>
              </li>
              <li className="flex justify-between items-center pb-4 border-b border-surface-100 last:border-0 last:pb-0">
                <span className="font-medium text-[15px] text-surface-700">Needs Changes by Club</span>
                <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full font-semibold text-[13px] border border-red-100">{myClubProposals.filter(p => p.status === ProposalStatus.NEEDS_IMPROVEMENT).length}</span>
              </li>
              <li className="flex justify-between items-center pb-4 border-b border-surface-100 last:border-0 last:pb-0">
                <span className="font-medium text-[15px] text-surface-700">Approved Events</span>
                <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-semibold text-[13px] border border-emerald-100">{myClubProposals.filter(p => p.status === ProposalStatus.APPROVED).length}</span>
              </li>
            </ul>
         </div>
         <div className="bg-white p-6 border border-surface-200 rounded-xl shadow-soft">
            <h3 className="font-display font-semibold text-xl text-surface-900 mb-6 flex items-center tracking-tight"><Calendar className="mr-2 text-umt-navy opacity-70" size={22} strokeWidth={1.5} /> Upcoming Approved Events</h3>
            <div className="space-y-3">
              {myClubProposals.filter(p => p.status === ProposalStatus.APPROVED).length === 0 ? (
                <div className="text-center py-8 px-6 bg-surface-50/50 rounded-lg border border-surface-100 border-dashed">
                  <p className="text-[15px] font-medium text-surface-500">No upcoming approved events.</p>
                </div>
              ) : (
                myClubProposals.filter(p => p.status === ProposalStatus.APPROVED).slice(0, 2).map(p => (
                  <div key={p.id} className="border border-surface-200 p-4 rounded-lg bg-surface-50/30 hover:bg-white hover:shadow-soft hover:border-surface-300 transition-all duration-300 cursor-default group">
                    <p className="font-semibold text-[15px] text-surface-900 group-hover:text-umt-navy transition-colors truncate">{p.title}</p>
                    <div className="flex items-center text-[13px] font-medium text-surface-500 mt-2 uppercase tracking-wider">
                      <Calendar size={13} className="mr-1.5 opacity-60" />
                      {p.eventDate}
                    </div>
                  </div>
                ))
              )}
            </div>
         </div>
       </div>
    </div>
  );
};

const ExcoDashboard = ({ user, proposals, stats }: { user: any, proposals: EventProposal[], stats: any }) => {
  const navigate = useNavigate();
  const pendingMpp = proposals.filter(p => p.status === ProposalStatus.PENDING_MPP);
  const needsImprovement = proposals.filter(p => 
    p.status === ProposalStatus.NEEDS_IMPROVEMENT && 
    p.history.some(h => h.status === ProposalStatus.PENDING_MPP)
  );

  const KanbanCard = ({ p }: { p: EventProposal }) => (
    <div onClick={() => navigate(`/proposals/${p.id}`)} className="bg-white p-4 mb-3.5 rounded-xl shadow-soft border border-surface-200 cursor-pointer hover:shadow-elevated hover:border-umt-accent/40 transition-all duration-300 ease-out-expo group transform hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-2.5">
        <h5 className="font-semibold text-[14px] text-surface-900 group-hover:text-umt-navy transition-colors line-clamp-2 leading-snug pr-2">{p.title}</h5>
        <div className="bg-surface-50 text-surface-400 rounded-md p-1.5 flex-shrink-0 group-hover:bg-umt-accent/10 group-hover:text-umt-accent transition-colors">
          <ArrowRight size={14} strokeWidth={2.5} />
        </div>
      </div>
      <div className="flex items-center text-[12px] font-semibold uppercase tracking-wider text-surface-600 bg-surface-100/70 px-2.5 py-1 rounded-md mb-3.5 max-w-fit">
        <Activity size={12} className="mr-1.5 opacity-60" />
        <span className="truncate">{p.clubName}</span>
      </div>
      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-widest text-surface-400 mt-auto pt-3 border-t border-surface-100">
        <span className="flex items-center"><Clock size={12} className="mr-1.5 opacity-60" /> Submitted</span>
        <span className="text-surface-600">{p.dateSubmitted}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Global Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <StatCard icon={FileText} label="Total" value={stats.total} />
        <StatCard icon={Clock} label="Pending MPP" value={pendingMpp.length} />
        <StatCard icon={AlertCircle} label="Revisions" value={needsImprovement.length} />
        <StatCard icon={CheckCircle} label="Approved" value={stats.approved} />
      </div>

      {/* Progress Tracker Kanban */}
      <div className="bg-white p-6 overflow-x-auto border border-surface-200 rounded-xl shadow-soft">
        <h3 className="font-display font-semibold text-xl text-surface-900 mb-6 tracking-tight">Proposal Progress Tracker</h3>
        <div className="flex gap-6 min-w-[600px]">
           {/* Column 1 */}
           <div className="flex-1 bg-amber-50/40 p-5 border border-amber-100/50 rounded-xl">
             <div className="flex items-center justify-between mb-5">
               <h4 className="font-display font-semibold text-[15px] text-amber-900 flex items-center"><Clock size={18} className="mr-2 opacity-70" strokeWidth={2} /> MPP EXCO</h4>
               <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-amber-200/50 uppercase tracking-wider">{pendingMpp.length}</span>
             </div>
             <div className="space-y-0">
               {pendingMpp.length === 0 ? (
                 <div className="text-center p-6 bg-white/60 rounded-xl border border-amber-200/60 border-dashed">
                   <p className="text-[13px] font-semibold uppercase tracking-wider text-amber-700/60">No pending proposals</p>
                 </div>
               ) : (
                 pendingMpp.map(p => <KanbanCard key={p.id} p={p} />)
               )}
             </div>
           </div>
           {/* Column 2 */}
           <div className="flex-1 bg-red-50/40 p-5 border border-red-100/50 rounded-xl">
             <div className="flex items-center justify-between mb-5">
               <h4 className="font-display font-semibold text-[15px] text-red-900 flex items-center"><AlertCircle size={18} className="mr-2 opacity-70" strokeWidth={2} /> REVISIONS</h4>
               <span className="bg-red-100 text-red-800 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-red-200/50 uppercase tracking-wider">{needsImprovement.length}</span>
             </div>
             <div className="space-y-0">
               {needsImprovement.length === 0 ? (
                 <div className="text-center p-6 bg-white/60 rounded-xl border border-red-200/60 border-dashed">
                   <p className="text-[13px] font-semibold uppercase tracking-wider text-red-700/60">No revisions needed</p>
                 </div>
               ) : (
                 needsImprovement.map(p => <KanbanCard key={p.id} p={p} />)
               )}
             </div>
           </div>
        </div>
      </div>

      {/* Event Date Checker */}
      <div className="bg-white p-6 border border-surface-200 rounded-xl shadow-soft">
         <div className="flex items-center justify-between mb-6">
           <h3 className="font-display font-semibold text-xl text-surface-900 flex items-center tracking-tight"><Calendar className="mr-2 text-umt-accent" strokeWidth={2} size={22} /> Event Date Checker</h3>
           <span className="text-[11px] uppercase tracking-widest text-surface-500 font-semibold bg-surface-100 px-3 py-1.5 rounded-full border border-surface-200/60">All Clubs</span>
         </div>
         <p className="text-surface-500 mb-6 text-[15px] font-medium max-w-2xl">Upcoming proposed event dates across all clubs to monitor for clashes.</p>
         <div className="space-y-3">
           <div className="flex justify-between items-center p-5 border border-surface-200 rounded-xl bg-surface-50/50 hover:bg-white hover:border-surface-300 hover:shadow-soft transition-all duration-300 ease-out-expo cursor-default">
             <div className="flex items-center">
               <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex flex-col items-center justify-center mr-5 shadow-sm border border-amber-200/60">
                 <span className="text-[10px] font-bold uppercase tracking-widest leading-none mt-1">Oct</span>
                 <span className="text-[19px] font-display font-bold leading-none mt-1.5">15</span>
               </div>
               <div>
                 <span className="font-display font-semibold text-[17px] text-surface-900 block tracking-tight">2 Events Proposed</span>
                 <span className="text-[13px] text-amber-600 font-semibold flex items-center mt-1 uppercase tracking-wider"><AlertCircle size={12} className="mr-1" strokeWidth={2.5}/> Potential clash detected</span>
               </div>
             </div>
             <Link to="#" className="text-[14px] font-semibold text-umt-navy hover:text-umt-light transition-colors bg-surface-100 hover:bg-surface-200 px-4 py-2 rounded-lg">Review Dates</Link>
           </div>
           <div className="flex justify-between items-center p-5 border border-surface-200 rounded-xl bg-surface-50/50 hover:bg-white hover:border-surface-300 hover:shadow-soft transition-all duration-300 ease-out-expo cursor-default">
             <div className="flex items-center">
               <div className="w-12 h-12 rounded-xl bg-surface-200 text-surface-700 flex flex-col items-center justify-center mr-5 shadow-sm border border-surface-300/60">
                 <span className="text-[10px] font-bold uppercase tracking-widest leading-none mt-1">Nov</span>
                 <span className="text-[19px] font-display font-bold leading-none mt-1.5">02</span>
               </div>
               <div>
                 <span className="font-display font-semibold text-[17px] text-surface-900 block tracking-tight">1 Event Proposed</span>
                 <span className="text-[13px] text-emerald-600 font-semibold flex items-center mt-1 uppercase tracking-wider"><CheckCircle size={12} className="mr-1" strokeWidth={2.5}/> Clear schedule</span>
               </div>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
};

const HepaDashboard = ({ user, proposals, stats }: { user: any, proposals: EventProposal[], stats: any }) => {
  const navigate = useNavigate();
  const recentProposals = proposals.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={FileText} label="Total Proposals" value={stats.total} />
        <StatCard icon={Clock} label="Pending Action" value={stats.pending} />
        <StatCard icon={AlertCircle} label="Needs Improvement" value={stats.needsImprovement} />
        <StatCard icon={CheckCircle} label="Approved" value={stats.approved} />
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white p-6 border border-surface-200 rounded-xl shadow-soft">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display font-semibold text-xl text-surface-900">Recent Proposals</h2>
          <Link to="/proposals" className="text-sm font-bold text-umt-accent hover:text-amber-700 transition-colors">View All &rarr;</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-50/50">
                <th className="p-4 border-b border-surface-200 font-extrabold text-xs uppercase tracking-[0.12em] text-surface-500">Event Title</th>
                <th className="p-4 border-b border-surface-200 font-extrabold text-xs uppercase tracking-[0.12em] text-surface-500">Club</th>
                <th className="p-4 border-b border-surface-200 font-extrabold text-xs uppercase tracking-[0.12em] text-surface-500">Submitted</th>
                <th className="p-4 border-b border-surface-200 font-extrabold text-xs uppercase tracking-[0.12em] text-surface-500">Status</th>
                <th className="p-4 border-b border-surface-200 font-extrabold text-xs uppercase tracking-[0.12em] text-surface-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentProposals.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-surface-500 bg-surface-50/30">No proposals found.</td></tr>
              ) : (
                recentProposals.map((proposal) => (
                  <tr key={proposal.id} className="hover:bg-surface-50/80 transition-colors border-b border-surface-100 last:border-0 group">
                    <td className="p-4 font-semibold text-surface-900">{proposal.title}</td>
                    <td className="p-4 font-medium text-surface-600 bg-surface-50/30">{proposal.clubName}</td>
                    <td className="p-4 text-surface-600">{proposal.dateSubmitted}</td>
                    <td className="p-4"><StatusBadge status={proposal.status} /></td>
                    <td className="p-4">
                      <button onClick={() => navigate(`/proposals/${proposal.id}`)} className="text-sm font-bold text-umt-navy hover:text-umt-light transition-colors opacity-80 group-hover:opacity-100 flex items-center">View Details <ArrowRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { getStats, proposals } = useData();

  if (!user) return null;

  const stats = getStats(user.role, user.clubName);

  return (
    <div className="space-y-6">
      <div className="mb-8 pb-6 border-b border-surface-200">
        <h1 className="text-3xl font-display font-bold text-surface-900 tracking-tight">Dashboard</h1>
        <p className="font-medium text-surface-500 mt-2 flex items-center">
          Welcome back, <span className="text-umt-navy ml-1 font-semibold">{user.name}</span>
          <span className="mx-2 text-surface-300">•</span>
          <span className="bg-umt-paper text-umt-navy px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-[0.12em] border border-umt-navy/10">{user.role.replace('_', ' ')}</span>
        </p>
      </div>

      {user.role === UserRole.CLUB_REP && <ClubRepDashboard user={user} proposals={proposals} />}
      {user.role === UserRole.ADVISOR && <AdvisorDashboard user={user} proposals={proposals} />}
      {user.role === UserRole.MPP_EXCO && <ExcoDashboard user={user} proposals={proposals} stats={stats} />}
      {user.role === UserRole.HEPA_STAFF && <HepaDashboard user={user} proposals={proposals} stats={stats} />}
    </div>
  );
};

export default Dashboard;
