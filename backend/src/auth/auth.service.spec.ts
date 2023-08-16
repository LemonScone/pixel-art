import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JsonWebTokenError } from 'jsonwebtoken';
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
    let passwordTokens = [];
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

      findPasswordToken(userId) {
        const token = passwordTokens.find((item) => item.userId == userId);
        return Promise.resolve(token);
      },
      createPasswordToken(userId, token) {
        const passwordToken = {
          id: 1,
          userId,
          token,
        };
        passwordTokens.push(passwordToken);
        return Promise.resolve({ id: passwordToken.id, userId, token });
      },
      removePasswordToken: (userId: number) => {
        const filteredPasswordTokens = passwordTokens.filter(
          (token) => token.userId !== userId,
        );
        passwordTokens = filteredPasswordTokens;
        return Promise.resolve();
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
    service.sendVerifyMail = (username: string, to: string, token: string) => {
      return null;
    };
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

  it('returns token if valid user email is provided', async () => {
    const user = await service.signup({
      email: 'test',
      password: 'mypassword',
      username: 'test',
      provider: 'local',
    });

    const token = await service.sendResetPasswordMail(user.email);
    expect(token).toBeDefined();
  });

  it('throws if sendResetPasswordMail is called with an unused email', async () => {
    await service.signup({
      email: 'test',
      password: 'mypassword',
      username: 'test',
      provider: 'local',
    });

    await expect(service.sendResetPasswordMail('unusedEmail')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('returns true if verifyPasswordToken is called with a valid password reset token', async () => {
    const user = await service.signup({
      email: 'test',
      password: 'mypassword',
      username: 'test',
      provider: 'local',
    });

    const token = await service.sendResetPasswordMail(user.email);
    const valid = await service.verifyPasswordToken(token);
    expect(valid).toBeTruthy();
  });

  it('throws if verifyPasswordToken is called with an invalid token', async () => {
    const user = await service.signup({
      email: 'test',
      password: 'mypassword',
      username: 'test',
      provider: 'local',
    });

    await service.sendResetPasswordMail(user.email);

    await expect(service.verifyPasswordToken('invalid-token')).rejects.toThrow(
      JsonWebTokenError,
    );
  });

  it('throws if resetPassword is called with an invalid token', async () => {
    const user = await service.signup({
      email: 'test',
      password: 'mypassword',
      username: 'test',
      provider: 'local',
    });

    await service.sendResetPasswordMail(user.email);

    await expect(
      service.resetPassword('invalid-token', 'newPassword'),
    ).rejects.toThrow(JsonWebTokenError);
  });
});
