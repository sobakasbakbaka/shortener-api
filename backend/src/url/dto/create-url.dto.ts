import {
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlDto {
  @IsUrl()
  @ApiProperty({
    example: 'https://example.com/some/long/url',
    description: 'Original URL to be shortened',
  })
  originalUrl: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @ApiProperty({
    example: 'short123',
    description: 'Custom alias for the shortened URL (optional)',
    maxLength: 20,
  })
  alias?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    example: '2023-12-31T23:59:59Z',
    description: 'Expiration date for the shortened URL (optional)',
  })
  expiresAt?: string;
}
