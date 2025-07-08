import {
  Body,
  Controller,
  Delete,
  Get,
  GoneException,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { AnalyticsService } from '../analytics/analytics.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UrlInfoResponseDto } from './dto/url-info-response.dto';

@ApiTags('Url')
@Controller()
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  @Post('shorten')
  @ApiOperation({
    summary: 'Create a short URL',
    description:
      'Creates a short URL from the original URL provided in the request body.',
  })
  @ApiParam({
    name: 'CreateUrlDto',
    description: 'The DTO containing the original URL and optional parameters.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully created short URL',
    type: CreateUrlDto,
  })
  async create(@Body() dto: CreateUrlDto): Promise<{ shortUrl: string }> {
    const saved = await this.urlService.createShortUrl(dto);
    return { shortUrl: saved.shortUrl };
  }

  @Get('info/:shortUrl')
  @ApiOperation({
    summary: 'Get information about a short URL',
    description:
      'Retrieves information about the short URL, including its original URL, creation date, and expiration status.',
  })
  @ApiParam({
    name: 'shortUrl',
    description: 'The short URL to get information about a short URL',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved URL information',
    type: UrlInfoResponseDto,
  })
  async getUrlInfo(@Param('shortUrl') shortUrl: string) {
    const url = await this.urlService.getUrlInfo(shortUrl);

    if (!url) {
      throw new NotFoundException('Short Url not found');
    }

    const now = new Date();
    const isExpired = !!url.expiresAt && new Date(url.expiresAt) < now;

    return { ...url, isExpired };
  }

  @Delete('delete/:shortUrl')
  @ApiOperation({
    summary: 'Delete a short URL',
    description: 'Deletes the short URL specified by the shortUrl parameter.',
  })
  @ApiParam({
    name: 'shortUrl',
    description: 'The short URL to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'Short URL was deleted successfully',
  })
  async deleteUrl(@Param('shortUrl') shortUrl: string) {
    await this.urlService.deleteUrl(shortUrl);
    return { message: 'Short URL was deleted' };
  }

  @Get(':shortUrl')
  @Get(':shortUrl')
  @ApiOperation({ summary: 'Redirect to the original URL using a short code' })
  @ApiParam({ name: 'shortUrl', description: 'Short URL code (e.g. abc123)' })
  @ApiResponse({
    status: 302,
    description: 'Successfully redirected to the original URL',
  })
  @ApiResponse({
    status: 404,
    description: 'Short URL not found',
  })
  @ApiResponse({
    status: 410,
    description: 'Short URL has expired',
  })
  async redirectToOriginal(
    @Param('shortUrl') shortUrl: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const url = await this.urlService.findByShortUrl(shortUrl);

    if (!url) {
      throw new NotFoundException('Short Url not found');
    }

    if (url.expiresAt && new Date(url.expiresAt) < new Date()) {
      throw new GoneException('Short Url was expired');
    }

    const ip =
      req.headers['x-forwarded-for']?.toString().split(',')[0] ?? req.ip;
    await this.analyticsService.logClickAndIncrement(shortUrl, ip);

    return res.redirect(url.originalUrl);
  }
}
