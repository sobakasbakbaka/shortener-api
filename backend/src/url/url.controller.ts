import {
  Body,
  Controller,
  Delete,
  Get,
  GoneException,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlSevice: UrlService) {}

  @Post('shorten')
  async create(@Body() dto: CreateUrlDto): Promise<{ shortUrl: string }> {
    const saved = await this.urlSevice.createShortUrl(dto);
    return { shortUrl: saved.shortUrl };
  }

  @Get(':shortUrl')
  async redirectToOriginal(
    @Param('shortUrl') shortUrl: string,
    @Res() res: Response,
  ) {
    const url = await this.urlSevice.findByShortUrl(shortUrl);

    if (!url) {
      throw new NotFoundException('Short Url not found');
    }

    if (url.expiresAt && new Date(url.expiresAt) < new Date()) {
      throw new GoneException('Short Url was expired');
    }

    await this.urlSevice.incrementClickCount(url.id);

    return res.redirect(url.originalUrl);
  }

  @Get('info/:shortUrl')
  async getUrlInfo(@Param('shortUrl') shortUrl: string) {
    const url = await this.urlSevice.getUrlInfo(shortUrl);

    if (!url) {
      throw new NotFoundException('Short Url not found');
    }

    return url;
  }

  @Delete('delete/:shortUrl')
  async deleteUrl(@Param('shortUrl') shortUrl: string) {
    await this.urlSevice.deleteUrl(shortUrl);
    return { message: 'Short URL was deleted' };
  }
}
