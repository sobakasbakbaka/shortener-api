export interface ShortenUrlDto {
  originalUrl: string;
  alias?: string;
  expiresAt?: Date;
}

export interface ShortenUrlResponse {
  shortUrl: string;
}

export interface UrlInfo {
  originalUrl: string;
  createdAt: string;
  clickCount: number;
  isExpired: boolean;
}
