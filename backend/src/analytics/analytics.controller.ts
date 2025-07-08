import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AnalyticsResponseDto } from './dto/analytics-respons.dto';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get(':shortUrl')
  @ApiOperation({ summary: 'Get analytics by shortUrl' })
  @ApiParam({
    name: 'shortUrl',
    description: 'The short URL to get analytics for',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved analytics',
    type: AnalyticsResponseDto,
  })
  @ApiResponse({ status: 404, description: 'URL not found' })
  async getAnalytics(@Param('shortUrl') shortUrl: string) {
    return this.analyticsService.getAnalytics(shortUrl);
  }
}
