import type {
  ShortenUrlDto,
  ShortenUrlResponse,
  UrlInfo,
} from '../model/types';
import { api } from '@/shared/api/axios.ts';

export const urlApi = {
  shorten: async (data: ShortenUrlDto) => {
    const response = await api.post<ShortenUrlResponse>('/url/shorten', data);
    return response.data;
  },
  getInfo: async (shortUrl: string) => {
    const response = await api.get<UrlInfo>(`/url/info/${shortUrl}`);
    return response.data;
  },
  delete: async (shortUrl: string) => {
    const response = await api.delete(`/url/delete/${shortUrl}`);
    return response.data;
  },
};
