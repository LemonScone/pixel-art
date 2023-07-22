import {
  ConflictException,
  ForbiddenException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Pool, PoolConnection } from 'mysql2/promise';
import { DB_CONNECTION } from '../constants';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { AccessTokenPayload } from './payload.model';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DB_CONNECTION)
    private readonly pool: Pool,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const users = await this.usersService.find(email);

    if (users.length) {
      throw new ConflictException(`${email}는 이미 가입된 email입니다.`);
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const user = await this.usersService.create({
      ...createUserDto,
      password: hash,
    });

    return user;
  }

  async signin(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;

    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('아이디 또는 비밀번호를 확인해주세요.');
    }

    const { id, password: storedPassword, ...rest } = user;

    const payload = { sub: id, ...rest };
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken({ sub: id });

    await this.usersService.insertUserRefreshToken(id, refreshToken);

    return {
      ...user,
      accessToken,
      refreshToken,
    };
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<
    {
      accessToken: string;
      refreshToken: string;
    } & Omit<User, 'password'>
  > {
    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const loginResults = await this.usersService.login(authCredentialsDto);

      if (!loginResults) {
        return null;
      }

      const { id, password, ...rest } = loginResults;

      const payload = { sub: id, ...rest };
      const accessToken = await this.generateAccessToken(payload);

      const refreshToken = await this.generateRefreshToken({ sub: id });

      await this.usersService.insertUserRefreshToken(id, refreshToken);

      return {
        id,
        accessToken,
        refreshToken,
        ...rest,
      };
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    } finally {
      connectionPool.release();
    }
  }

  async generateAccessToken(user: AccessTokenPayload): Promise<string> {
    return this.jwtService.signAsync(user, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME'),
    });
  }

  async generateRefreshToken(payload: { sub: number }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME'),
    });
  }

  async logout(refreshTokenId: number) {
    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const [result] = await connectionPool.execute(
        `DELETE FROM TOKEN
          WHERE id = ${refreshTokenId}`,
      );

      return result;
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    } finally {
      connectionPool.release();
    }
  }

  async refresh(
    userId: string,
  ): Promise<Omit<User, 'password' | 'id'> & { accessToken: string }> {
    try {
      const user = await this.usersService.getUserInfo(userId);

      if (!user) {
        throw new ForbiddenException('Invalid user!');
      }

      const { id, password, ...rest } = user;
      const accessToken = await this.generateAccessToken({ sub: id, ...rest });

      return { accessToken, ...rest };
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    }
  }
}
