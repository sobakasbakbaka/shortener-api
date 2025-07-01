import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from '../url/entities/url.entity';
import { Click } from './entities/click.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Click)
    private analyticsRepository: Repository<Click>,

    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
  ) {}

  async logClickAndIncrement(shortUrl: string, ip: string): Promise<void> {
    const url = await this.urlRepository.findOne({
      where: { shortUrl: shortUrl },
    });

    if (!url) {
      return;
    }

    const click = this.analyticsRepository.create({ ip, url });
    await this.analyticsRepository.save(click);

    await this.urlRepository.increment({ id: url.id }, 'clickCount', 1);
  }

  async getAnalytics(shortUrl: string) {
    const url = await this.urlRepository.findOne({
      where: { shortUrl },
      relations: ['clickEvents'],
    });

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    const recentClicks = await this.analyticsRepository.find({
      where: { url: { id: url.id } },
      order: { timestamp: 'DESC' },
      take: 5,
    });

    return {
      clickCount: url.clickCount,
      lastClicks: recentClicks.map((click) => click.ip),
    };
  }
}
