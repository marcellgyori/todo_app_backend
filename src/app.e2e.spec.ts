import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './app.module';
import { User } from './models/users/entities/user.entity';
import { UsersModule } from './models/users/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const mockRegisterUser = {
    saveNewUser: jest.fn().mockResolvedValue({}),
    findUserByEmail: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UsersModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockRegisterUser)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
