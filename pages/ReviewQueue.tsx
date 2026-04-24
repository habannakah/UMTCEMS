import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { ProposalStatus, UserRole } from '../types';
import { StatusBadge } from '../components/StatusBadge';

const ReviewQueue: React.FC = () => {
  const { user } = useAuth();
  const { proposals } = useData();
  const navigate = useNavigate();

  const reviewItems = useMemo(() => {
    if (!user) return [];

    if (user.role === UserRole.ADVISOR) {
      return proposals.filter(proposal =>
        proposal.clubName === user.clubName &&
        proposal.status === ProposalStatus.PENDING_ADVISOR
      );
    }

    if (user.role === UserRole.MPP_EXCO) {
      return proposals.filter(proposal => proposal.status === ProposalStatus.PENDING_MPP);
    }

    return [];
  }, [proposals, user]);

  if (!user) return null;

  const isReviewer = user.role === UserRole.ADVISOR || user.role === UserRole.MPP_EXCO;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-surface-200">
        <div>
          <h1 className="text-3xl font-display font-bold text-surface-900">Review Queue</h1>
          <p className="font-medium text-surface-500 mt-2">
            {isReviewer
              ? 'Review proposals currently waiting for your approval stage.'
              : 'This page is only used by reviewers.'}
          </p>
        </div>
        {isReviewer && (
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-extrabold text-amber-800">
            <Clock size={16} />
            {reviewItems.length} pending
          </span>
        )}
      </div>

      {!isReviewer ? (
        <div className="bg-white rounded-xl shadow-soft border border-surface-200 p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-50 text-surface-400 border border-surface-200">
            <FileText size={32} strokeWidth={1.6} />
          </div>
          <h2 className="font-display font-semibold text-xl text-surface-900">No review access</h2>
          <p className="text-surface-500 mt-2">Your role does not have a review queue.</p>
        </div>
      ) : reviewItems.length === 0 ? (
        <div className="bg-white rounded-xl shadow-soft border border-surface-200 p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
            <CheckCircle size={32} strokeWidth={1.6} />
          </div>
          <h2 className="font-display font-semibold text-xl text-surface-900">You are all caught up</h2>
          <p className="text-surface-500 mt-2">There are no proposals waiting for your review right now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviewItems.map(proposal => (
            <div
              key={proposal.id}
              className="bg-white rounded-xl shadow-soft border border-surface-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-umt-accent/40 hover:shadow-elevated transition-all cursor-pointer group"
              onClick={() => navigate(`/proposals/${proposal.id}`)}
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display font-semibold text-xl text-surface-900 group-hover:text-umt-navy transition-colors">
                    {proposal.title}
                  </h2>
                  <StatusBadge status={proposal.status} />
                </div>
                <div className="mt-2 flex flex-wrap gap-4 text-sm font-medium text-surface-500">
                  <span>{proposal.clubName}</span>
                  <span>Submitted {proposal.dateSubmitted}</span>
                  <span>Event date {proposal.eventDate}</span>
                </div>
              </div>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/proposals/${proposal.id}`);
                }}
                className="bg-umt-navy text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-umt-light transition-all shadow-sm hover:shadow-md inline-flex items-center justify-center"
              >
                Review Now <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewQueue;
