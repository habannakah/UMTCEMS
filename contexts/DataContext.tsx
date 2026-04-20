import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { Comment, Proposal, ProposalDraft, ProposalStatus, UserRole } from '../types';
import { ApiError } from '../services/api';
import { ProposalApiModel, proposalsApi } from '../services/proposals';
import { reportsApi } from '../services/reports';

interface DataContextType {
  proposals: Proposal[];
  isLoading: boolean;
  error: string | null;
  addProposal: (proposal: ProposalDraft) => void;
  editProposal: (id: string, data: Partial<ProposalDraft>) => void;
  updateProposalStatus: (id: string, status: ProposalStatus, actorName: string, comment?: string) => void;
  addComment: (proposalId: string, comment: Omit<Comment, 'id' | 'timestamp'>) => void;
  submitReport: (proposalId: string, reportData: { reportFile: string; photos: string[] }) => void;
  getStats: (role: UserRole, clubName?: string) => {
    total: number;
    pending: number;
    needsImprovement: number;
    approved: number;
    completed: number;
  };
  refreshProposals: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const normalizeHistory = (
  history: ProposalApiModel['history'],
  fallbackStatus: ProposalStatus,
  fallbackActor: string,
): Proposal['history'] => {
  if (Array.isArray(history)) {
    return history
      .map(item => ({
        status: item.status as ProposalStatus,
        timestamp: item.timestamp,
        actor: item.actor,
      }))
      .filter(item => item.status && item.timestamp && item.actor);
  }

  if (typeof history === 'string' && history.trim()) {
    try {
      const parsed = JSON.parse(history);
      if (Array.isArray(parsed)) {
        return normalizeHistory(parsed, fallbackStatus, fallbackActor);
      }
    } catch {
      // Ignore malformed history payloads and fall back to a minimal timeline.
    }
  }

  return [
    {
      status: fallbackStatus,
      timestamp: new Date().toISOString().split('T')[0],
      actor: fallbackActor,
    },
  ];
};

const normalizeComments = (comments: unknown): Comment[] => {
  if (!Array.isArray(comments)) {
    return [];
  }

  return comments
    .map((item, index) => {
      const comment = item as Partial<Comment> & { id?: string | number };

      return {
        id: String(comment.id ?? `comment-${index}`),
        authorName: comment.authorName || 'Unknown',
        authorRole: (comment.authorRole || UserRole.ADVISOR) as UserRole,
        content: comment.content || '',
        timestamp: comment.timestamp || '',
        type: (comment.type || 'general') as Comment['type'],
        tag: comment.tag,
      };
    })
    .filter(comment => comment.content);
};

const normalizeDocuments = (documents: unknown): NonNullable<Proposal['documents']> => {
  if (!Array.isArray(documents)) {
    return [];
  }

  return documents
    .map((item, index) => {
      const document = item as {
        id?: string | number;
        name?: string;
        url?: string;
        documentName?: string;
        documentUrl?: string;
      };

      const name = document.name || document.documentName;
      const url = document.url || document.documentUrl;

      return {
        name: name || `Document ${index + 1}`,
        url: url || '#',
      };
    })
    .filter(document => document.url !== '#');
};

const normalizePostEventReport = (
  report: unknown,
): Proposal['postEventReport'] | undefined => {
  if (!report || typeof report !== 'object') {
    return undefined;
  }

  const item = report as {
    reportFile?: string;
    photos?: string[] | string;
    submittedDate?: string;
  };

  let photos: string[] = [];

  if (Array.isArray(item.photos)) {
    photos = item.photos.filter((photo): photo is string => typeof photo === 'string' && photo.trim().length > 0);
  } else if (typeof item.photos === 'string' && item.photos.trim()) {
    const rawPhotos = item.photos.trim();

    try {
      const parsed = JSON.parse(rawPhotos);
      if (Array.isArray(parsed)) {
        photos = parsed.filter((photo): photo is string => typeof photo === 'string' && photo.trim().length > 0);
      } else {
        photos = [rawPhotos];
      }
    } catch {
      photos = [rawPhotos];
    }
  }

  if (!item.reportFile && !photos.length && !item.submittedDate) {
    return undefined;
  }

  return {
    reportFile: item.reportFile || 'Uploaded report',
    photos,
    submittedDate: item.submittedDate || '',
  };
};

const normalizeProposal = (proposal: ProposalApiModel): Proposal => {
  const status = (proposal.status as ProposalStatus) || ProposalStatus.PENDING_ADVISOR;
  const submitterName = proposal.submitterName || 'Unknown';

  return {
    id: String(proposal.id),
    title: proposal.title,
    clubName: proposal.clubName || 'Unknown Club',
    submitterName,
    dateSubmitted: proposal.dateSubmitted || '',
    eventDate: proposal.eventDate || '',
    venue: proposal.venue || '',
    objective: proposal.objective || '',
    participants: proposal.participants || '',
    description: proposal.description || '',
    budget: proposal.budget || '',
    committee: proposal.committee || '',
    logistics: proposal.logistics || '',
    outcomes: proposal.outcomes || '',
    status,
    documents: normalizeDocuments(proposal.documents),
    comments: normalizeComments(proposal.comments),
    history: normalizeHistory(proposal.history, status, submitterName),
    postEventReport: normalizePostEventReport(proposal.postEventReport),
  };
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshProposals = async () => {
    setIsLoading(true);
    try {
      const response = await proposalsApi.list();
      setProposals(response.map(normalizeProposal));
      setError(null);
    } catch (fetchError) {
      setError(getErrorMessage(fetchError, 'Unable to load proposals from the backend.'));
      setProposals([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refreshProposals();
  }, []);

  const addProposal = (data: ProposalDraft) => {
    void (async () => {
      try {
        const createdProposal = await proposalsApi.create({
          title: data.title,
          clubName: data.clubName,
          submitterName: data.submitterName,
          eventDate: data.eventDate,
          venue: data.venue,
          objective: data.objective,
          participants: data.participants,
          description: data.description,
          budget: data.budget,
          committee: data.committee,
          logistics: data.logistics,
          outcomes: data.outcomes,
        });

        setProposals(prev => [normalizeProposal(createdProposal), ...prev]);
        setError(null);
      } catch (submitError) {
        setError(getErrorMessage(submitError, 'Unable to submit the proposal.'));
      }
    })();
  };

  const editProposal = (id: string, data: Partial<ProposalDraft>) => {
    void (async () => {
      try {
        const updatedProposal = await proposalsApi.resubmit(id, {
          submitterName: data.submitterName,
          updates: {
            title: data.title,
            eventDate: data.eventDate,
            venue: data.venue,
            objective: data.objective,
            participants: data.participants,
            description: data.description,
            budget: data.budget,
            committee: data.committee,
            logistics: data.logistics,
            outcomes: data.outcomes,
          },
        });

        setProposals(prev =>
          prev.map(proposal => (proposal.id === id ? normalizeProposal(updatedProposal) : proposal)),
        );
        setError(null);
      } catch (updateError) {
        setError(getErrorMessage(updateError, 'Unable to resubmit the proposal.'));
      }
    })();
  };

  const updateProposalStatus = (id: string, status: ProposalStatus, actorName: string, commentText?: string) => {
    void (async () => {
      try {
        let updatedProposal: ProposalApiModel;

        if (status === ProposalStatus.PENDING_MPP) {
          updatedProposal = await proposalsApi.approveAdvisor(id, {
            advisorName: actorName,
          });
        } else if (status === ProposalStatus.APPROVED) {
          updatedProposal = await proposalsApi.approveMpp(id, {
            mppName: actorName,
          });
        } else if (status === ProposalStatus.NEEDS_IMPROVEMENT) {
          updatedProposal = await proposalsApi.requestChanges(id, {
            reviewerName: actorName,
            comment: commentText || '',
          });
        } else if (status === ProposalStatus.REJECTED) {
          updatedProposal = await proposalsApi.reject(id, {
            mppName: actorName,
            reason: commentText || '',
          });
        } else {
          throw new Error(`Unsupported status transition: ${status}`);
        }

        setProposals(prev =>
          prev.map(proposal => (proposal.id === id ? normalizeProposal(updatedProposal) : proposal)),
        );
        setError(null);
      } catch (statusError) {
        setError(getErrorMessage(statusError, 'Unable to update the proposal status.'));
      }
    })();
  };

  const addComment = (proposalId: string, commentData: Omit<Comment, 'id' | 'timestamp'>) => {
    void (async () => {
      try {
        await proposalsApi.addComment(proposalId, {
          authorName: commentData.authorName,
          authorRole: commentData.authorRole,
          content: commentData.content,
          type: commentData.type,
          tag: commentData.tag,
        });

        await refreshProposals();
      } catch (commentError) {
        setError(getErrorMessage(commentError, 'Unable to add the comment.'));
      }
    })();
  };

  const submitReport = (proposalId: string, reportData: { reportFile: string; photos: string[] }) => {
    void (async () => {
      try {
        await reportsApi.submit({
          proposalId,
          reportFile: reportData.reportFile,
          photos: reportData.photos,
        });

        await refreshProposals();
      } catch (reportError) {
        setError(getErrorMessage(reportError, 'Unable to submit the post-event report.'));
      }
    })();
  };

  const getStats = (role: UserRole, clubName?: string) => {
    let filtered = proposals;

    if (role === UserRole.CLUB_REP && clubName) {
      filtered = proposals.filter(proposal => proposal.clubName === clubName);
    } else if (role === UserRole.MPP_EXCO) {
      filtered = proposals.filter(proposal => proposal.status !== ProposalStatus.PENDING_ADVISOR);
    }

    return {
      total: filtered.length,
      pending: filtered.filter(
        proposal =>
          proposal.status === ProposalStatus.PENDING_ADVISOR ||
          proposal.status === ProposalStatus.PENDING_MPP,
      ).length,
      needsImprovement: filtered.filter(proposal => {
        if (proposal.status !== ProposalStatus.NEEDS_IMPROVEMENT) {
          return false;
        }

        if (role === UserRole.MPP_EXCO) {
          return proposal.history.some(item => item.status === ProposalStatus.PENDING_MPP);
        }

        return true;
      }).length,
      approved: filtered.filter(proposal => proposal.status === ProposalStatus.APPROVED).length,
      completed: filtered.filter(proposal => proposal.status === ProposalStatus.COMPLETED).length,
    };
  };

  const contextValue = useMemo(
    () => ({
      proposals,
      isLoading,
      error,
      addProposal,
      editProposal,
      updateProposalStatus,
      addComment,
      submitReport,
      getStats,
      refreshProposals,
    }),
    [proposals, isLoading, error],
  );

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
