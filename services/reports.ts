import { apiRequest } from './api';

export const reportsApi = {
  submit: (body: Record<string, unknown>) =>
    apiRequest('/api/reports', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
