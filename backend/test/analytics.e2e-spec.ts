import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { v4 as uuidv4 } from 'uuid';
import * as request from 'supertest';

describe('Analytics (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should track clicks and return analytics data', async () => {
    const alias = `analytics-${uuidv4().slice(0, 8)}`;
    const originalUrl = 'https://openai.com';

    await request(app.getHttpServer())
      .post('/shorten')
      .send({ originalUrl, alias })
      .expect(201);

    for (let i = 0; i < 3; i++) {
      await request(app.getHttpServer())
        .get(`/${alias}`)
        .set('X-Forwarded-For', `127.0.0.${i + 1}`)
        .expect(302);
    }

    const res = await request(app.getHttpServer())
      .get(`/analytics/${alias}`)
      .expect(200);

    expect(res.body).toHaveProperty('clickCount', 3);
    expect(res.body).toHaveProperty('lastClicks');
    expect(res.body.lastClicks.length).toBeGreaterThanOrEqual(3);
    expect(res.body.lastClicks[0]).toMatch(/^127\.0\.0\./);
  });
});
