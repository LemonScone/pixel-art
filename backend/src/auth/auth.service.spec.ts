import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.model';
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import ConfigServiceMock from '../../test/ConfigServiceMock';
import { CreateUserDto } from './dto/create-user.dto';
import { DbService } from '../db/db.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: ({ email, password, username, provider }: CreateUserDto) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
          username,
          provider,
          current: 0,
        } as User;

        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigServiceMock,
        DbService,
        AuthService,
        JwtService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup({
      email: 'asdf@asdf.com',
      password: 'mypassword',
      username: 'asdf',
      provider: 'local',
    });

    expect(user.password).not.toEqual('asdf');
  });

  it('throws an error if user signs up with email that is in use', async () => {
    await service.signup({
      email: 'asdf@asdf.com',
      password: 'mypassword',
      username: 'asdf',
      provider: 'local',
    });

    await expect(
      service.signup({
        email: 'asdf@asdf.com',
        password: 'mypassword',
        username: 'asdf',
        provider: 'local',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(
      service.signin({ email: 'asdf@asdf.com', password: 'asdf' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws if an invalid password is provided', async () => {
    await service.signup({
      email: 'asdf@asdf.com',
      password: 'mypassword',
      username: 'asdf',
      provider: 'local',
    });

    await expect(
      service.signin({ email: 'asdf@asdf.com', password: 'asdf' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('returns a user with tokens if correct password is provided', async () => {
    fakeUsersService.insertUserRefreshToken = () => {
      return null;
    };

    await service.signup({
      email: 'asdf@asdf.com',
      password: 'mypassword',
      username: 'asdf',
      provider: 'local',
    });

    const user = await service.signin({
      email: 'asdf@asdf.com',
      password: 'mypassword',
    });

    expect(user).toBeDefined();
    expect(user.accessToken).toBeDefined();
    expect(user.refreshToken).toBeDefined();
  });
});
