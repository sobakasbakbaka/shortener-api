import { ApiProperty } from '@nestjs/swagger';

export class AnalyticsResponseDto {
  @ApiProperty({
    example: 123,
    description: 'Total number of times the short URL has been clicked',
  })
  clickCount: number;

  @ApiProperty({
    example: ['192.168.0.1', '172.16.0.3'],
    description: 'IP addresses of the most recent clicks',
  })
  lastClicks: string[];
}
