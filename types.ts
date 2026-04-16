export enum UserRole {
  CLUB_REP = 'CLUB_REP',
  ADVISOR = 'ADVISOR',
  MPP_EXCO = 'MPP_EXCO',
  HEPA_STAFF = 'HEPA_STAFF'
}

export enum ProposalStatus {
  PENDING_ADVISOR = 'PENDING_ADVISOR',
  PENDING_MPP = 'PENDING_MPP',
  NEEDS_IMPROVEMENT = 'NEEDS_IMPROVEMENT',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED' // Event done, report submitted
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  clubName?: string; // Only for Club Reps
}

export interface Comment {
  id: string;
  authorName: string;
  authorRole: UserRole;
  content: string;
  timestamp: string;
  type: 'general' | 'amendment_request' | 'rejection_reason' | 'compliance_note';
  tag?: string; // Optional tagging/referencing
}

export interface Proposal {
  id: string;
  title: string;
  clubName: string;
  submitterName: string;
  dateSubmitted: string;
  eventDate: string;
  venue: string;
  objective: string;
  participants: string;
  description: string;
  budget?: string;
  committee?: string;
  logistics?: string;
  outcomes?: string;
  status: ProposalStatus;
  documents: { name: string; url: string }[];
  comments: Comment[];
  history: { status: ProposalStatus; timestamp: string; actor: string }[];
  postEventReport?: {
    reportFile: string;
    photos: string[];
    submittedDate: string;
    actualAttendance?: number;
    outcomesSummary?: string;
    budgetSpent?: string;
    problemsFaced?: string;
    improvements?: string;
  };
}