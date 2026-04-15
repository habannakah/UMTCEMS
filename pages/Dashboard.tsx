import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { UserRole, ProposalStatus, EventProposal } from '../types';
import { FileText, Clock, AlertCircle, CheckCircle, Plus, Calendar, Activity, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';

// --- Specialized Components ---

const StatCard = ({ icon: Icon, label, value }: any) => (
  <div className="bg-white p-6 flex items-center space-x-4">
    <div className="p-3 border-2 border-black">
      <Icon size={24} className="text-black" />
    </div>
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm font-bold uppercase tracking-wider">{label}</div>
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
    <div className="space-y-8">
      {/* Action Required Alert */}
      {actionRequired.length > 0 && (
        <div className="bg-red-50 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
           <div>
             <h3 className="font-bold text-lg flex items-center"><AlertCircle className="mr-2"/> Action Required</h3>
             <p className="font-bold">You have {actionRequired.length} proposal(s) that need revisions.</p>
           </div>
           <button onClick={() => navigate(`/proposals/${actionRequired[0].id}`)} className="bg-white px-4 py-2 font-bold flex items-center">
             Review Feedback <ArrowRight size={16} className="ml-2" />
           </button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/submit-proposal" className="bg-white p-8 flex flex-col items-center justify-center text-center hover:bg-slate-100 transition-transform">
           <Plus size={48} className="mb-4" />
           <span className="font-bold text-xl">Create New Proposal</span>
           <span className="text-sm mt-2">Draft a new event for {user.clubName}</span>
        </Link>
        <Link to="/reports" className="bg-white p-8 flex flex-col items-center justify-center text-center hover:bg-slate-100 transition-transform">
           <FileText size={48} className="mb-4" />
           <span className="font-bold text-xl">Submit Post-Event Report</span>
           <span className="text-sm mt-2">Pending reports: 1</span>
        </Link>
      </div>

      {/* Active Proposals Timeline */}
      <div className="bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-xl">Active Proposals Tracker</h3>
          <Link to="/proposals" className="font-bold underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="p-3 border-b-2 border-black font-bold">Event Title</th>
                <th className="p-3 border-b-2 border-black font-bold">Submitted</th>
                <th className="p-3 border-b-2 border-black font-bold">Current Stage</th>
                <th className="p-3 border-b-2 border-black font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {activeProposals.length === 0 ? (
                <tr><td colSpan={4} className="p-6 text-center font-bold">No active proposals.</td></tr>
              ) : (
                activeProposals.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3 border-b-2 border-black font-bold">{p.title}</td>
                    <td className="p-3 border-b-2 border-black">{p.dateSubmitted}</td>
                    <td className="p-3 border-b-2 border-black"><StatusBadge status={p.status} /></td>
                    <td className="p-3 border-b-2 border-black">
                      <button onClick={() => navigate(`/proposals/${p.id}`)} className="font-bold underline">Track</button>
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
    <div className="space-y-8">
       {/* Proposals to Review */}
       <div className="bg-amber-50 p-6">
         <div className="flex justify-between items-center mb-6">
           <h3 className="font-bold text-xl flex items-center"><Clock className="mr-2"/> Proposals to Review</h3>
           <span className="font-bold bg-white px-3 py-1 border-2 border-black">{pendingReview.length} Items</span>
         </div>
         <div className="space-y-4">
           {pendingReview.length === 0 ? (
             <p className="font-bold text-center p-4 bg-white">You're all caught up! No proposals pending your review for {user.clubName}.</p>
           ) : (
             pendingReview.map(p => (
               <div key={p.id} className="bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <div>
                   <h4 className="font-bold text-lg">{p.title}</h4>
                   <p className="text-sm font-bold">Submitted: {p.dateSubmitted}</p>
                 </div>
                 <button onClick={() => navigate(`/proposals/${p.id}`)} className="bg-white px-4 py-2 font-bold whitespace-nowrap">
                   Review Now
                 </button>
               </div>
             ))
           )}
         </div>
       </div>
       
       {/* My Club Overview */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-6">
            <h3 className="font-bold text-xl mb-4 flex items-center"><Activity className="mr-2"/> Proposal Status</h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center border-b-2 border-black pb-2">
                <span className="font-bold">Waiting for MPP Approval</span> 
                <span className="bg-slate-100 px-2 py-1 font-bold text-sm">{myClubProposals.filter(p => p.status === ProposalStatus.PENDING_MPP).length}</span>
              </li>
              <li className="flex justify-between items-center border-b-2 border-black pb-2">
                <span className="font-bold">Needs Changes by Club</span> 
                <span className="bg-slate-100 px-2 py-1 font-bold text-sm">{myClubProposals.filter(p => p.status === ProposalStatus.NEEDS_IMPROVEMENT).length}</span>
              </li>
              <li className="flex justify-between items-center border-b-2 border-black pb-2">
                <span className="font-bold">Approved Events</span> 
                <span className="bg-slate-100 px-2 py-1 font-bold text-sm">{myClubProposals.filter(p => p.status === ProposalStatus.APPROVED).length}</span>
              </li>
            </ul>
         </div>
         <div className="bg-white p-6">
            <h3 className="font-bold text-xl mb-4 flex items-center"><Calendar className="mr-2"/> Upcoming Approved Events</h3>
            <div className="space-y-3">
              {myClubProposals.filter(p => p.status === ProposalStatus.APPROVED).length === 0 ? (
                <p className="text-sm font-bold text-slate-500">No upcoming approved events.</p>
              ) : (
                myClubProposals.filter(p => p.status === ProposalStatus.APPROVED).slice(0, 2).map(p => (
                  <div key={p.id} className="border-2 border-black p-3 bg-slate-50">
                    <p className="font-bold truncate">{p.title}</p>
                    <p className="text-sm mt-1">Date: {p.eventDate}</p>
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
    <div onClick={() => navigate(`/proposals/${p.id}`)} className="bg-white p-3 mb-3 cursor-pointer hover:bg-slate-50 transition-colors border-2 border-black">
      <div className="font-bold text-sm mb-1">{p.title}</div>
      <div className="text-xs font-bold truncate">{p.clubName}</div>
      <div className="text-xs mt-2">{p.dateSubmitted}</div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Global Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={FileText} label="Total" value={stats.total} />
        <StatCard icon={Clock} label="Pending MPP" value={pendingMpp.length} />
        <StatCard icon={AlertCircle} label="Revisions" value={needsImprovement.length} />
        <StatCard icon={CheckCircle} label="Approved" value={stats.approved} />
      </div>

      {/* Progress Tracker Kanban */}
      <div className="bg-white p-6 overflow-x-auto">
        <h3 className="font-bold text-xl mb-6">Proposal Progress Tracker</h3>
        <div className="flex gap-4 min-w-[600px]">
           {/* Column 1 */}
           <div className="flex-1 bg-amber-50 p-4 border-2 border-black">
             <h4 className="font-bold mb-4 flex justify-between"><span>MPP EXCO</span> <span>{pendingMpp.length}</span></h4>
             {pendingMpp.map(p => <KanbanCard key={p.id} p={p} />)}
           </div>
           {/* Column 2 */}
           <div className="flex-1 bg-red-50 p-4 border-2 border-black">
             <h4 className="font-bold mb-4 flex justify-between"><span>Revisions</span> <span>{needsImprovement.length}</span></h4>
             {needsImprovement.map(p => <KanbanCard key={p.id} p={p} />)}
           </div>
        </div>
      </div>
      
      {/* Event Date Checker */}
      <div className="bg-white p-6">
         <h3 className="font-bold text-xl mb-4 flex items-center"><Calendar className="mr-2"/> Event Date Checker</h3>
         <p className="font-bold mb-4">Upcoming proposed event dates across all clubs to monitor for clashes.</p>
         <div className="space-y-2">
           <div className="flex justify-between p-3 border-2 border-black bg-slate-50">
             <span className="font-bold">Oct 15, 2026</span>
             <span className="font-bold">2 Events Proposed</span>
           </div>
           <div className="flex justify-between p-3 border-2 border-black bg-slate-50">
             <span className="font-bold">Nov 02, 2026</span>
             <span className="font-bold">1 Event Proposed</span>
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
      <div className="bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-xl">Recent Proposals</h2>
          <Link to="/proposals" className="font-bold underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="p-3 border-b-2 border-black font-bold">Event Title</th>
                <th className="p-3 border-b-2 border-black font-bold">Club</th>
                <th className="p-3 border-b-2 border-black font-bold">Submitted</th>
                <th className="p-3 border-b-2 border-black font-bold">Status</th>
                <th className="p-3 border-b-2 border-black font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentProposals.length === 0 ? (
                <tr><td colSpan={5} className="p-6 text-center font-bold">No proposals found.</td></tr>
              ) : (
                recentProposals.map((proposal) => (
                  <tr key={proposal.id} className="hover:bg-slate-50">
                    <td className="p-3 border-b-2 border-black font-bold">{proposal.title}</td>
                    <td className="p-3 border-b-2 border-black font-bold">{proposal.clubName}</td>
                    <td className="p-3 border-b-2 border-black">{proposal.dateSubmitted}</td>
                    <td className="p-3 border-b-2 border-black"><StatusBadge status={proposal.status} /></td>
                    <td className="p-3 border-b-2 border-black">
                      <button onClick={() => navigate(`/proposals/${proposal.id}`)} className="font-bold underline">View Details</button>
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="font-bold text-lg mt-2">Welcome back, {user.name} ({user.role.replace('_', ' ')})</p>
      </div>

      {user.role === UserRole.CLUB_REP && <ClubRepDashboard user={user} proposals={proposals} />}
      {user.role === UserRole.ADVISOR && <AdvisorDashboard user={user} proposals={proposals} />}
      {user.role === UserRole.MPP_EXCO && <ExcoDashboard user={user} proposals={proposals} stats={stats} />}
      {user.role === UserRole.HEPA_STAFF && <HepaDashboard user={user} proposals={proposals} stats={stats} />}
    </div>
  );
};

export default Dashboard;