import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { Repository } from 'typeorm';
import { CreateUrlDto } from './dto/create-url.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
  ) {}

  async createShortUrl(dto: CreateUrlDto): Promise<Url> {
    const shortUrl = dto.alias ?? uuidv4().replace(/-/g, '').slice(0, 8);

    const url = this.urlRepository.create({
      shortUrl,
      originalUrl: dto.originalUrl,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
    });

    try {
      return await this.urlRepository.save(url);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Alias already exists');
      }
      throw new InternalServerErrorException('Failed to save link');
    }
  }

  async findByShortUrl(shortUrl: string) {
    return this.urlRepository.findOne({
      where: {
        shortUrl,
      },
    });
  }

  async incrementClickCount(id: string) {
    await this.urlRepository.increment({ id }, 'clickCount', 1);
  }

  async getUrlInfo(shortUrl: string) {
    return this.urlRepository.findOneBy({ shortUrl });
  }

  async deleteUrl(shortUrl: string): Promise<void> {
    const result = await this.urlRepository.delete({ shortUrl });

    if (result.affected === 0) {
      throw new NotFoundException('Short URL not found');
    }
  }
}
