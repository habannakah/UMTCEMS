import React from 'react';
import { ProposalStatus } from '../types';

interface StatusBadgeProps {
  status: ProposalStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStyle = (s: ProposalStatus) => {
    switch (s) {
      case ProposalStatus.APPROVED:
        return 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]';
      case ProposalStatus.COMPLETED:
        return 'bg-sky-50 text-sky-800 border-sky-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]';
      case ProposalStatus.REJECTED:
        return 'bg-red-50 text-red-800 border-red-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]';
      case ProposalStatus.NEEDS_IMPROVEMENT:
        return 'bg-amber-50 text-amber-800 border-amber-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]';
      case ProposalStatus.PENDING_ADVISOR:
      case ProposalStatus.PENDING_MPP:
        return 'bg-umt-paper text-umt-navy border-umt-navy/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]';
      default:
        return 'bg-surface-100 text-surface-800 border-surface-200';
    }
  };

  const getLabel = (s: ProposalStatus) => {
    if (!s) return 'Unknown';
    switch (s) {
      case ProposalStatus.PENDING_ADVISOR: return 'Pending Advisor';
      case ProposalStatus.PENDING_MPP: return 'Pending MPP';
      case ProposalStatus.NEEDS_IMPROVEMENT: return 'Needs Improvement';
      default: return s.charAt(0) + s.slice(1).toLowerCase();
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-[0.12em] border ${getStyle(status)}`}>
      {getLabel(status)}
    </span>
  );
};
