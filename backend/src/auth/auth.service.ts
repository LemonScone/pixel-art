import {
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Pool, PoolConnection } from 'mysql2/promise';
import { DB_CONNECTION } from 'src/constants';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from './user.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DB_CONNECTION)
    private readonly pool: Pool,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const loginResults = await this.usersService.login(authCredentialsDto);

      if (!loginResults) {
        return null;
      }

      const { password, ...rest } = loginResults;
      const accessToken = await this.generateAccessToken(rest);
      const refreshToken = await this.generateRefreshToken(
        authCredentialsDto.userId,
      );

      await this.usersService.insertUserRefreshToken(
        authCredentialsDto.userId,
        refreshToken,
      );

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    } finally {
      connectionPool.release();
    }
  }

  async generateAccessToken(user: Omit<User, 'password'>): Promise<string> {
    return this.jwtService.signAsync(user);
  }

  async generateRefreshToken(userId: string): Promise<string> {
    const payload = { userId };
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

  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      // TODO: access token이 만료되었을 때 실행된다.
      // refresh token 유효성 확인

      // token이 유효한지 + 만료되지 않았는지? this.jwtService.verify
      // 유효 x -> 로그아웃
      const decodeRefreshToken = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      // 유효 O, DB에 존재하는지 확인
      //  - 유효 x -> 로그아웃
      //  - 유효 O, access token 재발급
      const userId = decodeRefreshToken.userId;
      const user = await this.usersService.getUserByRefreshToken(
        refreshToken,
        userId,
      );

      if (!user) {
        throw new UnauthorizedException('Invalid user!');
      }

      const accessToken = await this.generateAccessToken(user);

      return { accessToken };
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    }
  }
}
