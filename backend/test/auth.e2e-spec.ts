import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const email = 'test@test.com';
    const username = 'doe';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'mypassword', username })
      .expect(201)
      .then((res) => {
        const {
          id,
          email: resEmail,
          username: resUsername,
          provider,
        } = res.body;

        expect(id).toBeDefined();
        expect(username).toEqual(resUsername);
        expect(resEmail).toEqual(email);
        expect(provider).toEqual('local');
      });
  });

  it('signup and signin as a new user then get the currently logged in user', async () => {
    const email = 'test@test.com';
    const username = 'doe';

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'mypassword', username })
      .expect(201);

    const resSignin = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email, password: 'mypassword' })
      .expect(201);

    const { accessToken } = resSignin.body;

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(200);

    expect(body.email).toEqual(email);
  });

  it('handles a signout request', async () => {
    const email = 'test@test.com';
    const username = 'doe';

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'mypassword', username })
      .expect(HttpStatus.CREATED);

    const res = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email, password: 'mypassword' })
      .expect(HttpStatus.CREATED);

    const cookie = res.get('Set-Cookie');

    await request(app.getHttpServer())
      .post('/auth/signout')
      .set('Cookie', cookie)
      .expect(HttpStatus.OK);
  });

  it('handles a get refresh token', async () => {
    const email = 'test@test.com';
    const username = 'doe';

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'mypassword', username })
      .expect(HttpStatus.CREATED);

    const res = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email, password: 'mypassword' })
      .expect(HttpStatus.CREATED);

    const firstCookie = res.get('Set-Cookie');

    const resRefresh = await request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Cookie', firstCookie)
      .expect(HttpStatus.CREATED);

    expect(firstCookie).not.toEqual(resRefresh.get('Set-Cookie'));
  });
});
