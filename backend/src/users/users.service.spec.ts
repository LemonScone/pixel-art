import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { DbService } from '../db/db.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, DbService, UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
