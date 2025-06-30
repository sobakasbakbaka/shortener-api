import { Module } from '@nestjs/common';
import { ClickEventService } from './click-event.service';
import { ClickEventController } from './click-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClickEvent } from './entities/click-event.entity';
import { Url } from '../url/entities/url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClickEvent, Url])],
  providers: [ClickEventService],
  controllers: [ClickEventController],
  exports: [ClickEventService],
})
export class ClickEventModule {}
