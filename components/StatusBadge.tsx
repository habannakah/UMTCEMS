import React from 'react';
import { ProposalStatus } from '../types';

interface StatusBadgeProps {
  status: ProposalStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStyle = (s: ProposalStatus) => {
    switch (s) {
      case ProposalStatus.APPROVED:
        return 'bg-green-100 text-green-800 border-green-200';
      case ProposalStatus.COMPLETED:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case ProposalStatus.REJECTED:
        return 'bg-red-100 text-red-800 border-red-200';
      case ProposalStatus.NEEDS_IMPROVEMENT:
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case ProposalStatus.PENDING_ADVISOR:
      case ProposalStatus.PENDING_MPP:
        return 'bg-slate-100 text-slate-800 border-slate-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLabel = (s: ProposalStatus) => {
    switch (s) {
      case ProposalStatus.PENDING_ADVISOR: return 'Pending Advisor';
      case ProposalStatus.PENDING_MPP: return 'Pending MPP';
      case ProposalStatus.NEEDS_IMPROVEMENT: return 'Needs Improvement';
      default: return s.charAt(0) + s.slice(1).toLowerCase();
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyle(status)}`}>
      {getLabel(status)}
    </span>
  );
};