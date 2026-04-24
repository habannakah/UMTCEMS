import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { ProposalStatus, UserRole } from '../types';
import { StatusBadge } from '../components/StatusBadge';

const Proposals: React.FC = () => {
  const { user } = useAuth();
  const { proposals } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const visibleProposals = useMemo(() => {
    if (!user) return [];

    let filtered = proposals;

    if (user.role === UserRole.CLUB_REP || user.role === UserRole.ADVISOR) {
      filtered = filtered.filter(proposal => proposal.clubName === user.clubName);
    }

    if (user.role === UserRole.MPP_EXCO) {
      filtered = filtered.filter(proposal => {
        if (proposal.status === ProposalStatus.PENDING_ADVISOR) return false;
        if (
          proposal.status === ProposalStatus.NEEDS_IMPROVEMENT &&
          !proposal.history.some(item => item.status === ProposalStatus.PENDING_MPP)
        ) {
          return false;
        }
        return true;
      });
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(proposal => proposal.status === statusFilter);
    }

    const query = searchTerm.toLowerCase();
    if (query) {
      filtered = filtered.filter(proposal =>
        proposal.title.toLowerCase().includes(query) ||
        proposal.clubName.toLowerCase().includes(query) ||
        proposal.venue.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [proposals, searchTerm, statusFilter, user]);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-surface-200">
        <div>
          <h1 className="text-3xl font-display font-bold text-surface-900">
            {user.role === UserRole.CLUB_REP ? 'My Proposals' : 'Proposals'}
          </h1>
          <p className="font-medium text-surface-500 mt-2">
            Browse proposal records with status, club, date, and review progress.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-surface-400" size={20} />
            <input
              type="text"
              placeholder="Search proposals..."
              className="pl-10 pr-4 py-2.5 border border-surface-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none w-full sm:w-72 shadow-sm"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="px-4 py-2.5 border border-surface-300 rounded-lg bg-white font-semibold text-surface-700 shadow-sm outline-none focus:ring-2 focus:ring-umt-light"
          >
            <option value="ALL">All Statuses</option>
            <option value={ProposalStatus.PENDING_ADVISOR}>Pending Advisor</option>
            <option value={ProposalStatus.PENDING_MPP}>Pending MPP</option>
            <option value={ProposalStatus.NEEDS_IMPROVEMENT}>Needs Improvement</option>
            <option value={ProposalStatus.APPROVED}>Approved</option>
            <option value={ProposalStatus.REJECTED}>Rejected</option>
            <option value={ProposalStatus.COMPLETED}>Completed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-soft border border-surface-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-50 text-surface-600 border-b border-surface-100">
              <tr>
                <th className="px-6 py-4 font-extrabold uppercase tracking-[0.12em] text-[12px]">Event Title</th>
                <th className="px-6 py-4 font-extrabold uppercase tracking-[0.12em] text-[12px]">Club</th>
                <th className="px-6 py-4 font-extrabold uppercase tracking-[0.12em] text-[12px]">Submitted</th>
                <th className="px-6 py-4 font-extrabold uppercase tracking-[0.12em] text-[12px]">Event Date</th>
                <th className="px-6 py-4 font-extrabold uppercase tracking-[0.12em] text-[12px]">Status</th>
                <th className="px-6 py-4 font-extrabold uppercase tracking-[0.12em] text-[12px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {visibleProposals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-surface-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-umt-paper rounded-full flex items-center justify-center mb-4 border border-umt-navy/10">
                        <FileText size={32} className="text-umt-navy" />
                      </div>
                      <h3 className="text-lg font-display font-semibold text-surface-900">No proposals found</h3>
                      <p className="text-surface-500 mt-1">Try adjusting the search or status filter.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                visibleProposals.map(proposal => (
                  <tr
                    key={proposal.id}
                    className="hover:bg-surface-50 transition group cursor-pointer"
                    onClick={() => navigate(`/proposals/${proposal.id}`)}
                  >
                    <td className="px-6 py-4 font-semibold text-surface-900">{proposal.title}</td>
                    <td className="px-6 py-4 text-surface-600 font-medium">{proposal.clubName}</td>
                    <td className="px-6 py-4 text-surface-500">{proposal.dateSubmitted}</td>
                    <td className="px-6 py-4 text-surface-500">{proposal.eventDate}</td>
                    <td className="px-6 py-4"><StatusBadge status={proposal.status} /></td>
                    <td className="px-6 py-4">
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          navigate(`/proposals/${proposal.id}`);
                        }}
                        className="text-umt-navy font-bold hover:text-umt-light bg-umt-paper px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all border border-umt-navy/10 inline-flex items-center"
                      >
                        View <ArrowRight size={14} className="ml-1.5" />
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

export default Proposals;
