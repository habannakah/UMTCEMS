import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Proposal, ProposalStatus, UserRole, Comment } from '../types';

interface DataContextType {
  proposals: Proposal[];
  addProposal: (proposal: Omit<Proposal, 'id' | 'status' | 'history' | 'comments'>) => void;
  editProposal: (id: string, data: Partial<Proposal>) => void;
  updateProposalStatus: (id: string, status: ProposalStatus, actorName: string, comment?: string) => void;
  addComment: (proposalId: string, comment: Omit<Comment, 'id' | 'timestamp'>) => void;
  submitReport: (proposalId: string, reportData: { reportFile: string; photos: string[]; actualAttendance?: number; outcomesSummary?: string; budgetSpent?: string; problemsFaced?: string; improvements?: string }) => void;
  getStats: (role: UserRole, clubName?: string) => any;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const INITIAL_PROPOSALS: Proposal[] = [
  // --- 4 Pending Proposals ---
  {
    id: 'p1',
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
    id: 'p2',
    title: 'Web Development Bootcamp',
    clubName: 'Computer Science Club',
    submitterName: 'ALI BIN AHMAD',
    dateSubmitted: '2023-10-02',
    eventDate: '2023-11-20',
    venue: 'Computer Lab 1',
    objective: 'Hands-on React training.',
    participants: '40 Students',
    description: '3-day intensive bootcamp.',
    status: ProposalStatus.PENDING_MPP,
    documents: [{ name: 'proposal.pdf', url: '#' }],
    comments: [],
    history: [
      { status: ProposalStatus.PENDING_ADVISOR, timestamp: '2023-10-02', actor: 'ALI BIN AHMAD' },
      { status: ProposalStatus.PENDING_MPP, timestamp: '2023-10-04', actor: 'DR. AZMAN (Advisor)' }
    ]
  },
  {
    id: 'p3',
    title: 'Cybersecurity Awareness Talk',
    clubName: 'Computer Science Club',
    submitterName: 'ALI BIN AHMAD',
    dateSubmitted: '2023-10-03',
    eventDate: '2023-11-25',
    venue: 'Dewan Sultan Mizan',
    objective: 'Educate students on online safety.',
    participants: 'Open to all',
    description: '2-hour talk by industry expert.',
    status: ProposalStatus.PENDING_MPP,
    documents: [{ name: 'proposal.pdf', url: '#' }],
    comments: [],
    history: [
      { status: ProposalStatus.PENDING_ADVISOR, timestamp: '2023-10-03', actor: 'ALI BIN AHMAD' },
      { status: ProposalStatus.PENDING_MPP, timestamp: '2023-10-05', actor: 'DR. AZMAN (Advisor)' }
    ]
  },
  {
    id: 'p4',
    title: 'AI Hackathon 2024',
    clubName: 'Computer Science Club',
    submitterName: 'ALI BIN AHMAD',
    dateSubmitted: '2023-10-04',
    eventDate: '2023-12-01',
    venue: 'Library MakerSpace',
    objective: 'Build AI solutions.',
    participants: '50 Teams',
    description: '48-hour hackathon.',
    status: ProposalStatus.PENDING_ADVISOR,
    documents: [{ name: 'proposal.pdf', url: '#' }],
    comments: [],
    history: [{ status: ProposalStatus.PENDING_ADVISOR, timestamp: '2023-10-04', actor: 'ALI BIN AHMAD' }]
  },

  // --- 4 Approved Proposals ---
  {
    id: 'a1',
    title: 'Intro to Python Workshop',
    clubName: 'Computer Science Club',
    submitterName: 'ALI BIN AHMAD',
    dateSubmitted: '2023-09-01',
    eventDate: '2023-09-15',
    venue: 'Computer Lab 2',
    objective: 'Basic Python programming.',
    participants: '30 Students',
    description: 'Beginner friendly workshop.',
    status: ProposalStatus.APPROVED,
    documents: [{ name: 'proposal.pdf', url: '#' }],
    comments: [],
    history: [
      { status: ProposalStatus.PENDING_ADVISOR, timestamp: '2023-09-01', actor: 'ALI BIN AHMAD' },
      { status: ProposalStatus.APPROVED, timestamp: '2023-09-05', actor: 'MPP PRESIDENT' }
    ]
  },
  {
    id: 'a2',
    title: 'Alumni Networking Night',
    clubName: 'Computer Science Club',
    submitterName: 'ALI BIN AHMAD',
    dateSubmitted: '2023-09-05',
    eventDate: '2023-09-20',
    venue: 'Hotel Grand Continental',
    objective: 'Connect students with alumni.',
    participants: '100 Students & Alumni',
    description: 'Dinner and networking session.',
    status: ProposalStatus.APPROVED,
    documents: [{ name: 'proposal.pdf', url: '#' }],
    comments: [],
    history: [
      { status: ProposalStatus.PENDING_ADVISOR, timestamp: '2023-09-05', actor: 'ALI BIN AHMAD' },
      { status: ProposalStatus.APPROVED, timestamp: '2023-09-10', actor: 'MPP PRESIDENT' }
    ]
  },
  {
    id: 'a3',
    title: 'Tech Career Fair',
    clubName: 'Computer Science Club',
    submitterName: 'ALI BIN AHMAD',
    dateSubmitted: '2023-09-10',
    eventDate: '2023-10-05',
    venue: 'UMT Foyer',
    objective: 'Job opportunities for IT students.',
    participants: 'All IT Students',
    description: 'Booths from 20 tech companies.',
    status: ProposalStatus.APPROVED,
    documents: [{ name: 'proposal.pdf', url: '#' }],
    comments: [],
    history: [
      { status: ProposalStatus.PENDING_ADVISOR, timestamp: '2023-09-10', actor: 'ALI BIN AHMAD' },
      { status: ProposalStatus.APPROVED, timestamp: '2023-09-15', actor: 'MPP PRESIDENT' }
    ]
  },
  {
    id: 'a4',
    title: 'E-Sports Tournament',
    clubName: 'Computer Science Club',
    submitterName: 'ALI BIN AHMAD',
    dateSubmitted: '2023-09-15',
    eventDate: '2023-10-15',
    venue: 'Student Center',
    objective: 'Recreational activity.',
    participants: '64 Teams',
    description: 'FIFA and Mobile Legends tournament.',
    status: ProposalStatus.APPROVED,
    documents: [{ name: 'proposal.pdf', url: '#' }],
    comments: [],
    history: [
      { status: ProposalStatus.PENDING_ADVISOR, timestamp: '2023-09-15', actor: 'ALI BIN AHMAD' },
      { status: ProposalStatus.APPROVED, timestamp: '2023-09-20', actor: 'MPP PRESIDENT' }
    ]
  },

  // --- 4 Rejected / Needs Improvement Proposals ---
  {
    id: 'r1',
    title: 'Overseas Tech Tour',
    clubName: 'Computer Science Club',
    submitterName: 'ALI BIN AHMAD',
    dateSubmitted: '2023-08-01',
    eventDate: '2023-12-10',
    venue: 'Singapore',
    objective: 'Visit tech giants.',
    participants: '20 Students',
    description: 'Trip to Google and Microsoft offices.',
    status: ProposalStatus.REJECTED,
    documents: [{ name: 'proposal.pdf', url: '#' }],
    comments: [
      { id: 'c1', authorName: 'HEPA OFFICER', authorRole: UserRole.HEPA_STAFF, content: 'Budget is too high and not feasible.', timestamp: '2023-08-15', type: 'general' }
    ],
    history: [
      { status: ProposalStatus.PENDING_ADVISOR, timestamp: '2023-08-01', actor: 'ALI BIN AHMAD' },
      { status: ProposalStatus.REJECTED, timestamp: '2023-08-15', actor: 'MPP PRESIDENT' }
    ]
  },
  {
    id: 'r2',
    title: 'Late Night Coding Marathon',
    clubName: 'Computer Science Club',
    submitterName: 'ALI BIN AHMAD',
    dateSubmitted: '2023-08-10',
    eventDate: '2023-09-01',
    venue: 'Computer Lab 3',
    objective: 'Code all night.',
    participants: '30 Students',
    description: '10 PM to 6 AM coding session.',
    status: ProposalStatus.REJECTED,
    documents: [{ name: 'proposal.pdf', url: '#' }],
    comments: [
      { id: 'c2', authorName: 'DR. AZMAN', authorRole: UserRole.ADVISOR, content: 'Overnight events are not permitted.', timestamp: '2023-08-12', type: 'general' }
    ],
    history: [
      { status: ProposalStatus.PENDING_ADVISOR, timestamp: '2023-08-10', actor: 'ALI BIN AHMAD' },
      { status: ProposalStatus.REJECTED, timestamp: '2023-08-12', actor: 'DR. AZMAN' }
    ]
  },
  {
    id: 'r3',
    title: 'Hardware Assembly Workshop',
    clubName: 'Computer Science Club',
    submitterName: 'ALI BIN AHMAD',
    dateSubmitted: '2023-10-06',
    eventDate: '2023-11-10',
    venue: 'Hardware Lab',
    objective: 'Learn to build PCs.',
    participants: '20 Students',
    description: 'Hands-on PC building.',
    status: ProposalStatus.NEEDS_IMPROVEMENT,
    documents: [{ name: 'proposal.pdf', url: '#' }],
    comments: [
      { id: 'c3', authorName: 'DR. AZMAN', authorRole: UserRole.ADVISOR, content: 'Please include safety guidelines.', timestamp: '2023-10-08', type: 'amendment_request' }
    ],
    history: [
      { status: ProposalStatus.PENDING_ADVISOR, timestamp: '2023-10-06', actor: 'ALI BIN AHMAD' },
      { status: ProposalStatus.NEEDS_IMPROVEMENT, timestamp: '2023-10-08', actor: 'DR. AZMAN' }
    ]
  },
  {
    id: 'r4',
    title: 'Inter-University Coding Competition',
    clubName: 'Computer Science Club',
    submitterName: 'ALI BIN AHMAD',
    dateSubmitted: '2023-10-07',
    eventDate: '2023-12-15',
    venue: 'Main Hall',
    objective: 'Compete with other universities.',
    participants: '100 Teams',
    description: 'National level competition.',
    status: ProposalStatus.NEEDS_IMPROVEMENT,
    documents: [{ name: 'proposal.pdf', url: '#' }],
    comments: [
      { id: 'c4', authorName: 'MPP PRESIDENT', authorRole: UserRole.MPP_EXCO, content: 'Need detailed breakdown of sponsorship.', timestamp: '2023-10-10', type: 'amendment_request' }
    ],
    history: [
      { status: ProposalStatus.PENDING_ADVISOR, timestamp: '2023-10-07', actor: 'ALI BIN AHMAD' },
      { status: ProposalStatus.PENDING_MPP, timestamp: '2023-10-09', actor: 'DR. AZMAN' },
      { status: ProposalStatus.NEEDS_IMPROVEMENT, timestamp: '2023-10-10', actor: 'MPP PRESIDENT' }
    ]
  },
  // --- 4 Completed Proposals with Post-Event Reports ---
  {
    id: 'c1',
    title: 'Annual Tech Symposium 2023',
    clubName: 'Computer Science Club',
    submitterName: 'ALI BIN AHMAD',
    dateSubmitted: '2023-01-10',
    eventDate: '2023-03-15',
    venue: 'Auditorium UMT',
    objective: 'To share latest tech trends with students.',
    participants: 'All CS Students (Est. 200)',
    description: 'A full day event with speakers from industry.',
    status: ProposalStatus.COMPLETED,
    documents: [{ name: 'proposal_v1.pdf', url: '#' }, { name: 'budget.xlsx', url: '#' }],
    comments: [],
    history: [
      { status: ProposalStatus.PENDING_ADVISOR, timestamp: '2023-01-10', actor: 'ALI BIN AHMAD' },
      { status: ProposalStatus.PENDING_MPP, timestamp: '2023-01-15', actor: 'DR. AZMAN (Advisor)' },
      { status: ProposalStatus.APPROVED, timestamp: '2023-01-20', actor: 'MPP PRESIDENT' },
      { status: ProposalStatus.COMPLETED, timestamp: '2023-03-20', actor: 'System' }
    ],
    postEventReport: {
      reportFile: 'symposium_report_2023.pdf',
      photos: ['photo1.jpg', 'photo2.jpg'],
      submittedDate: '2023-03-20'
    }
  },
  {
    id: 'c2',
    title: 'Beach Cleanup Drive',
    clubName: 'Environmental Club',
    submitterName: 'SITI NURHALIZA',
    dateSubmitted: '2023-04-05',
    eventDate: '2023-05-10',
    venue: 'Pantai Teluk Ketapang',
    objective: 'Promote environmental awareness.',
    participants: '50 Volunteers',
    description: 'Half-day beach cleanup activity.',
    status: ProposalStatus.COMPLETED,
    documents: [{ name: 'cleanup_proposal.pdf', url: '#' }],
    comments: [],
    history: [
      { status: ProposalStatus.PENDING_ADVISOR, timestamp: '2023-04-05', actor: 'SITI NURHALIZA' },
      { status: ProposalStatus.PENDING_MPP, timestamp: '2023-04-10', actor: 'DR. AMINA (Advisor)' },
      { status: ProposalStatus.APPROVED, timestamp: '2023-04-15', actor: 'MPP PRESIDENT' },
      { status: ProposalStatus.COMPLETED, timestamp: '2023-05-15', actor: 'System' }
    ],
    postEventReport: {
      reportFile: 'beach_cleanup_report.pdf',
      photos: ['cleanup1.jpg', 'cleanup2.jpg', 'cleanup3.jpg'],
      submittedDate: '2023-05-15'
    }
  },
  {
    id: 'c3',
    title: 'Cultural Night 2023',
    clubName: 'Cultural Arts Society',
    submitterName: 'AHMAD FAIZAL',
    dateSubmitted: '2023-06-20',
    eventDate: '2023-08-25',
    venue: 'Dewan Sultan Mizan',
    objective: 'Celebrate diverse cultures in UMT.',
    participants: 'Open to all students',
    description: 'Performances, food stalls, and exhibitions.',
    status: ProposalStatus.COMPLETED,
    documents: [{ name: 'cultural_night_proposal.pdf', url: '#' }],
    comments: [],
    history: [
      { status: ProposalStatus.PENDING_ADVISOR, timestamp: '2023-06-20', actor: 'AHMAD FAIZAL' },
      { status: ProposalStatus.PENDING_MPP, timestamp: '2023-06-25', actor: 'MR. KHALID (Advisor)' },
      { status: ProposalStatus.APPROVED, timestamp: '2023-07-01', actor: 'MPP PRESIDENT' },
      { status: ProposalStatus.COMPLETED, timestamp: '2023-08-30', actor: 'System' }
    ],
    postEventReport: {
      reportFile: 'cultural_night_report.pdf',
      photos: ['performance1.jpg', 'food_stall.jpg'],
      submittedDate: '2023-08-30'
    }
  },
  {
    id: 'c4',
    title: 'Inter-Faculty Sports Carnival',
    clubName: 'Sports Council',
    submitterName: 'NURUL HUDA',
    dateSubmitted: '2023-09-01',
    eventDate: '2023-11-01',
    venue: 'UMT Sports Complex',
    objective: 'Foster sportsmanship among faculties.',
    participants: 'All Faculties',
    description: 'Various sports competitions over 3 days.',
    status: ProposalStatus.COMPLETED,
    documents: [{ name: 'sports_carnival_proposal.pdf', url: '#' }],
    comments: [],
    history: [
      { status: ProposalStatus.PENDING_ADVISOR, timestamp: '2023-09-01', actor: 'NURUL HUDA' },
      { status: ProposalStatus.PENDING_MPP, timestamp: '2023-09-05', actor: 'DR. RAZAK (Advisor)' },
      { status: ProposalStatus.APPROVED, timestamp: '2023-09-10', actor: 'MPP PRESIDENT' },
      { status: ProposalStatus.COMPLETED, timestamp: '2023-11-10', actor: 'System' }
    ],
    postEventReport: {
      reportFile: 'sports_carnival_report.pdf',
      photos: ['football_match.jpg', 'medal_ceremony.jpg'],
      submittedDate: '2023-11-10'
    }
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

  const submitReport = (proposalId: string, reportData: { reportFile: string; photos: string[]; actualAttendance?: number; outcomesSummary?: string; budgetSpent?: string; problemsFaced?: string; improvements?: string }) => {
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
      } else if (role === UserRole.MPP_EXCO) {
          filtered = proposals.filter(p => p.status !== ProposalStatus.PENDING_ADVISOR);
      }
      
      return {
          total: filtered.length,
          pending: filtered.filter(p => p.status === ProposalStatus.PENDING_ADVISOR || p.status === ProposalStatus.PENDING_MPP).length,
          needsImprovement: filtered.filter(p => {
              if (p.status !== ProposalStatus.NEEDS_IMPROVEMENT) return false;
              if (role === UserRole.MPP_EXCO) {
                  return p.history.some(h => h.status === ProposalStatus.PENDING_MPP);
              }
              return true;
          }).length,
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