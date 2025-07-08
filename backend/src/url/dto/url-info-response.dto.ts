import { ApiProperty } from '@nestjs/swagger';

export class UrlInfoResponseDto {
  @ApiProperty({ example: 1, description: 'Record ID' })
  id: number;

  @ApiProperty({
    example: 'https://example.com/very/long/url',
    description: 'Original long URL',
  })
  originalUrl: string;

  @ApiProperty({
    example: 'abc123',
    description: 'Short URL identifier',
  })
  shortUrl: string;

  @ApiProperty({ example: 12, description: 'Number of redirects (clicks)' })
  clickCount: number;

  @ApiProperty({
    example: '2025-07-06T10:00:00Z',
    description: 'Date the short URL was created (ISO format)',
  })
  createdAt: string;

  @ApiProperty({
    example: '2025-07-10T10:00:00Z',
    description: 'Expiration date of the short URL (if set)',
    nullable: true,
  })
  expiresAt: string | null;

  @ApiProperty({
    example: false,
    description: 'Whether the short URL has expired',
  })
  isExpired: boolean;
}
