import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Proposal, ProposalStatus, UserRole, Comment } from '../types';

interface DataContextType {
  proposals: Proposal[];
  addProposal: (proposal: Omit<Proposal, 'id' | 'status' | 'history' | 'comments'>) => void;
  editProposal: (id: string, data: Partial<Proposal>) => void;
  updateProposalStatus: (id: string, status: ProposalStatus, actorName: string, comment?: string) => void;
  addComment: (proposalId: string, comment: Omit<Comment, 'id' | 'timestamp'>) => void;
  submitReport: (proposalId: string, reportData: { reportFile: string; photos: string[] }) => void;
  getStats: (role: UserRole, clubName?: string) => any;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: '1',
    title: 'Annual Tech Symposium 2024',
    clubName: 'Computer Science Club',
    submitterName: 'ALI BIN AHMAD',
    dateSubmitted: '2023-10-01',
    eventDate: '2023-11-15',
    venue: 'Auditorium UMT',
    objective: 'To share latest tech trends with students.',
    participants: 'All CS Students (Est. 200)',
    description: 'A full day event with speakers from industry.',
    status: ProposalStatus.PENDING_ADVISOR,
    documents: [{ name: 'proposal_v1.pdf', url: '#' }, { name: 'budget.xlsx', url: '#' }],
    comments: [],
    history: [{ status: ProposalStatus.PENDING_ADVISOR, timestamp: '2023-10-01', actor: 'ALI BIN AHMAD' }]
  },
  {
    id: '2',
    title: 'Beach Cleanup & Turtle Awareness',
    clubName: 'Marine Biology Club',
    submitterName: 'SITI SARAH',
    dateSubmitted: '2023-09-20',
    eventDate: '2023-10-10',
    venue: 'Pantai Mengabang Telipot',
    objective: 'Community service and awareness.',
    participants: 'Public & Students',
    description: 'Cleaning the beach area and educational talk.',
    status: ProposalStatus.APPROVED,
    documents: [{ name: 'proposal_final.pdf', url: '#' }],
    comments: [],
    history: [
        { status: ProposalStatus.PENDING_ADVISOR, timestamp: '2023-09-20', actor: 'SITI SARAH' },
        { status: ProposalStatus.PENDING_MPP, timestamp: '2023-09-22', actor: 'DR. AZMAN (Advisor)' },
        { status: ProposalStatus.APPROVED, timestamp: '2023-09-25', actor: 'MPP PRESIDENT' }
    ]
  },
  {
    id: '3',
    title: 'Inter-Faculty Futsal Tournament',
    clubName: 'Sports Club',
    submitterName: 'AH MENG',
    dateSubmitted: '2023-10-05',
    eventDate: '2023-11-01',
    venue: 'Sports Complex',
    objective: 'Promote healthy lifestyle.',
    participants: '30 Teams',
    description: 'Knockout tournament for all faculties.',
    status: ProposalStatus.NEEDS_IMPROVEMENT,
    documents: [{ name: 'proposal_v1.pdf', url: '#' }],
    comments: [
        { 
            id: 'c1', 
            authorName: 'DR. LIM', 
            authorRole: UserRole.ADVISOR, 
            content: 'Please clarify the budget for referees.', 
            timestamp: '2023-10-06',
            type: 'amendment_request'
        }
    ],
    history: [
        { status: ProposalStatus.PENDING_ADVISOR, timestamp: '2023-10-05', actor: 'AH MENG' },
        { status: ProposalStatus.NEEDS_IMPROVEMENT, timestamp: '2023-10-06', actor: 'DR. LIM (Advisor)' }
    ]
  }
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [proposals, setProposals] = useState<Proposal[]>(INITIAL_PROPOSALS);

  const addProposal = (data: Omit<Proposal, 'id' | 'status' | 'history' | 'comments'>) => {
    const newProposal: Proposal = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      status: ProposalStatus.PENDING_ADVISOR,
      comments: [],
      history: [{ status: ProposalStatus.PENDING_ADVISOR, timestamp: new Date().toISOString().split('T')[0], actor: data.submitterName }]
    };
    setProposals([newProposal, ...proposals]);
  };

  const editProposal = (id: string, data: Partial<Proposal>) => {
    setProposals(prev => prev.map(p => {
      if (p.id !== id) return p;
      return {
        ...p,
        ...data,
        status: ProposalStatus.PENDING_ADVISOR, // Reset to start of workflow
        history: [
            ...p.history, 
            { 
                status: ProposalStatus.PENDING_ADVISOR, 
                timestamp: new Date().toISOString().split('T')[0], 
                actor: p.submitterName // Assuming the club rep is editing their own
            }
        ]
      };
    }));
  };

  const updateProposalStatus = (id: string, status: ProposalStatus, actorName: string, commentText?: string) => {
    setProposals(prev => prev.map(p => {
      if (p.id !== id) return p;
      
      const newHistory = [...p.history, { status, timestamp: new Date().toISOString().split('T')[0], actor: actorName }];
      let newComments = [...p.comments];

      if (commentText) {
          // Infer role from status change for demo simplicity
          const role = status === ProposalStatus.NEEDS_IMPROVEMENT ? UserRole.ADVISOR : UserRole.MPP_EXCO; 
          newComments.push({
              id: Math.random().toString(36).substr(2, 9),
              authorName: actorName,
              authorRole: role, 
              content: commentText,
              timestamp: new Date().toISOString().split('T')[0],
              type: status === ProposalStatus.NEEDS_IMPROVEMENT ? 'amendment_request' : 'general'
          });
      }

      return { ...p, status, history: newHistory, comments: newComments };
    }));
  };

  const addComment = (proposalId: string, commentData: Omit<Comment, 'id' | 'timestamp'>) => {
      setProposals(prev => prev.map(p => {
          if (p.id !== proposalId) return p;
          return {
              ...p,
              comments: [...p.comments, {
                  ...commentData,
                  id: Math.random().toString(36).substr(2, 9),
                  timestamp: new Date().toISOString().split('T')[0]
              }]
          };
      }));
  };

  const submitReport = (proposalId: string, reportData: { reportFile: string; photos: string[] }) => {
      setProposals(prev => prev.map(p => {
          if (p.id !== proposalId) return p;
          return {
              ...p,
              status: ProposalStatus.COMPLETED,
              postEventReport: {
                  ...reportData,
                  submittedDate: new Date().toISOString().split('T')[0]
              },
              history: [...p.history, { status: ProposalStatus.COMPLETED, timestamp: new Date().toISOString().split('T')[0], actor: 'System' }]
          };
      }));
  };

  const getStats = (role: UserRole, clubName?: string) => {
      let filtered = proposals;
      if (role === UserRole.CLUB_REP && clubName) {
          filtered = proposals.filter(p => p.clubName === clubName);
      }
      
      return {
          total: filtered.length,
          pending: filtered.filter(p => p.status === ProposalStatus.PENDING_ADVISOR || p.status === ProposalStatus.PENDING_MPP).length,
          needsImprovement: filtered.filter(p => p.status === ProposalStatus.NEEDS_IMPROVEMENT).length,
          approved: filtered.filter(p => p.status === ProposalStatus.APPROVED).length,
          completed: filtered.filter(p => p.status === ProposalStatus.COMPLETED).length,
      };
  };

  return (
    <DataContext.Provider value={{ proposals, addProposal, editProposal, updateProposalStatus, addComment, submitReport, getStats }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};