import { Test, TestingModule } from '@nestjs/testing';
import { ClickEventController } from './click-event.controller';

describe('ClickEventController', () => {
  let controller: ClickEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClickEventController],
    }).compile();

    controller = module.get<ClickEventController>(ClickEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
