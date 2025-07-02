import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import {
  type ShortenUrlDto,
  type ShortenUrlResponse,
  urlApi,
} from '@/entities/shorten-url';

export const useShortenUrl = (
  options?: UseMutationOptions<ShortenUrlResponse, unknown, ShortenUrlDto>,
) => {
  return useMutation<ShortenUrlResponse, unknown, ShortenUrlDto>({
    mutationFn: (data) => urlApi.shorten(data),
    ...options,
  });
};
