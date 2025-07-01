import { useQuery } from '@tanstack/react-query';
import { urlApi } from '@/entities/url';

export const useLinkAnalytics = (shortUrl: string) => {
  const infoQuery = useQuery({
    queryKey: ['link-info', shortUrl],
    queryFn: () => urlApi.getInfo(shortUrl),
    enabled: !!shortUrl,
  });

  const analyticsQuery = useQuery({
    queryKey: ['link-analytics', shortUrl],
    queryFn: () => urlApi.getAnalytics(shortUrl),
    enabled: !!shortUrl,
  });

  return {
    info: infoQuery.data,
    analytics: analyticsQuery.data,
    isLoading: infoQuery.isLoading || analyticsQuery.isLoading,
    isError: infoQuery.isError || analyticsQuery.isError,
  };
};
