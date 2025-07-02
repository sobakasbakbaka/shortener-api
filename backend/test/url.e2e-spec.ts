import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { v4 as uuidv4 } from 'uuid';

describe('URL Shortener (e2e)', () => {
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

  it('should create a short link with a custom alias', async () => {
    const alias = `test-${uuidv4().slice(0, 8)}`;

    const res = await request(app.getHttpServer())
      .post('/shorten')
      .send({
        originalUrl: 'https://example.com',
        alias,
      })
      .expect(201);

    expect(res.body).toHaveProperty('shortUrl');
    expect(res.body.shortUrl).toContain(alias);
  });

  it('should redirect to the original URL', async () => {
    const alias = `redirect-${uuidv4().slice(0, 8)}`;
    const originalUrl = 'https://google.com';

    await request(app.getHttpServer())
      .post('/shorten')
      .send({
        originalUrl,
        alias,
      })
      .expect(201);

    const res = await request(app.getHttpServer()).get(`/${alias}`).expect(302);

    expect(res.headers.location).toBe(originalUrl);
  });
});
