import type {
  ShortenUrlDto,
  ShortenUrlResponse,
  UrlInfo,
} from '../model/types';
import { api } from '@/shared/api/axios.ts';

export const urlApi = {
  shorten: async (data: ShortenUrlDto) => {
    const response = await api.post<ShortenUrlResponse>('shorten', data);
    return response.data;
  },
  getInfo: async (shortUrl: string) => {
    const response = await api.get<UrlInfo>(`info/${shortUrl}`);
    return response.data;
  },
  delete: async (shortUrl: string) => {
    const response = await api.delete(`delete/${shortUrl}`);
    return response.data;
  },
};
