import { apiRequest } from './api';

export interface ProposalApiModel {
  id: number | string;
  title: string;
  clubName?: string;
  submitterName?: string;
  dateSubmitted?: string;
  eventDate?: string;
  venue?: string;
  objective?: string;
  participants?: string;
  description?: string;
  budget?: string;
  committee?: string;
  logistics?: string;
  outcomes?: string;
  status: string;
  history?: string | Array<{ status: string; timestamp: string; actor: string }>;
  comments?: unknown[];
  documents?: unknown[];
  postEventReport?: unknown;
}

export const proposalsApi = {
  list: () => apiRequest<ProposalApiModel[]>('/api/proposals'),
  create: (body: Record<string, unknown>) =>
    apiRequest<ProposalApiModel>('/api/proposals', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  resubmit: (id: string, body: Record<string, unknown>) =>
    apiRequest<ProposalApiModel>(`/api/proposals/${id}/resubmit`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  approveAdvisor: (id: string, body: Record<string, unknown>) =>
    apiRequest<ProposalApiModel>(`/api/proposals/${id}/approve-advisor`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  approveMpp: (id: string, body: Record<string, unknown>) =>
    apiRequest<ProposalApiModel>(`/api/proposals/${id}/approve-mpp`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  requestChanges: (id: string, body: Record<string, unknown>) =>
    apiRequest<ProposalApiModel>(`/api/proposals/${id}/request-changes`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  reject: (id: string, body: Record<string, unknown>) =>
    apiRequest<ProposalApiModel>(`/api/proposals/${id}/reject`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  addComment: (id: string, body: Record<string, unknown>) =>
    apiRequest(`/api/proposals/${id}/comments`, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
