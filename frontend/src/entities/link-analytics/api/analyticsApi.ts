import { api } from '@/shared/api/axios';
import type { Analytics } from '../model/types';

export const analyticsApi = {
  getAnalytics: async (shortUrl: string) => {
    const response = await api.get<Analytics>(`/analytics/${shortUrl}`);
    return response.data;
  },
};
