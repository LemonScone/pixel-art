import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbProvider } from './db/db.provider';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users/users.service';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { JwtService } from '@nestjs/jwt';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        dbProvider,
        UsersService,
        JwtAuthGuard,
        JwtService,
        ConfigService,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
