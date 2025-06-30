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

@Controller('url')
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  @Post('shorten')
  async create(@Body() dto: CreateUrlDto): Promise<{ shortUrl: string }> {
    const saved = await this.urlService.createShortUrl(dto);
    return { shortUrl: saved.shortUrl };
  }

  @Get(':shortUrl')
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

  @Get('info/:shortUrl')
  async getUrlInfo(@Param('shortUrl') shortUrl: string) {
    const url = await this.urlService.getUrlInfo(shortUrl);

    if (!url) {
      throw new NotFoundException('Short Url not found');
    }

    return url;
  }

  @Delete('delete/:shortUrl')
  async deleteUrl(@Param('shortUrl') shortUrl: string) {
    await this.urlService.deleteUrl(shortUrl);
    return { message: 'Short URL was deleted' };
  }
}
