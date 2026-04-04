import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { UserRole, ProposalStatus } from '../types';
import { FileText, Clock, AlertCircle, CheckCircle, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { getStats, proposals } = useData();
  const navigate = useNavigate();

  if (!user) return null;

  const stats = getStats(user.role, user.clubName);

  // Filter proposals for recent list
  let recentProposals = proposals;
  if (user.role === UserRole.CLUB_REP) {
    recentProposals = proposals.filter(p => p.clubName === user.clubName);
  } else if (user.role === UserRole.ADVISOR) {
    recentProposals = proposals.filter(p => p.status === ProposalStatus.PENDING_ADVISOR);
  } else if (user.role === UserRole.MPP_EXCO) {
    recentProposals = proposals.filter(p => p.status === ProposalStatus.PENDING_MPP);
  }
  
  // HEPA sees all, recent 5
  recentProposals = recentProposals.slice(0, 5);

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
        <div className="text-sm text-slate-500 font-medium">{label}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500">Welcome back, {user.name}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={FileText} 
          label="Total Proposals" 
          value={stats.total} 
          color="bg-blue-500" 
        />
        <StatCard 
          icon={Clock} 
          label="Pending Action" 
          value={stats.pending} 
          color="bg-amber-500" 
        />
        <StatCard 
          icon={AlertCircle} 
          label="Needs Improvement" 
          value={stats.needsImprovement} 
          color="bg-orange-500" 
        />
        <StatCard 
          icon={CheckCircle} 
          label="Approved" 
          value={stats.approved} 
          color="bg-green-500" 
        />
      </div>

      {/* Action Bar for Club Rep */}
      {user.role === UserRole.CLUB_REP && (
        <div className="bg-umt-navy/5 p-6 rounded-xl border border-umt-navy/10 flex items-center justify-between">
           <div>
             <h3 className="font-bold text-umt-navy text-lg">Create New Event</h3>
             <p className="text-slate-600 text-sm">Start a new proposal for your club activity.</p>
           </div>
           <Link 
             to="/submit-proposal"
             className="bg-umt-navy text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-900 transition flex items-center space-x-2"
           >
             <Plus size={18} />
             <span>Submit Proposal</span>
           </Link>
        </div>
      )}

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-slate-800 text-lg">
            {user.role === UserRole.CLUB_REP ? 'My Recent Proposals' : 'Recent Queue'}
          </h2>
          <Link to={user.role === UserRole.CLUB_REP ? "/proposals" : "/reviews"} className="text-umt-light text-sm font-medium hover:underline">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Event Title</th>
                <th className="px-6 py-4 font-semibold">Club</th>
                <th className="px-6 py-4 font-semibold">Date Submitted</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentProposals.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No proposals found.
                  </td>
                </tr>
              ) : (
                recentProposals.map((proposal) => (
                  <tr key={proposal.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-medium text-slate-800">{proposal.title}</td>
                    <td className="px-6 py-4 text-slate-600">{proposal.clubName}</td>
                    <td className="px-6 py-4 text-slate-500">{proposal.dateSubmitted}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={proposal.status} />
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => navigate(`/proposals/${proposal.id}`)}
                        className="text-umt-light font-medium hover:text-blue-700"
                      >
                        View Details
                      </button>
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

export default Dashboard;