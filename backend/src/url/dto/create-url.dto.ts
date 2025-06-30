import {
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateUrlDto {
  @IsUrl()
  originalUrl: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  alias?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
