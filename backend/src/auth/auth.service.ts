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
import { ConfigService } from '@nestjs/config';
import { AccessTokenPayload } from './payload.model';

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

      const { id, password, ...rest } = loginResults;

      const payload = { sub: id, ...rest };
      const accessToken = await this.generateAccessToken(payload);

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

  async generateAccessToken(user: AccessTokenPayload): Promise<string> {
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

  async refresh(userId: string): Promise<{ accessToken: string }> {
    try {
      const user = await this.usersService.getUserInfo(userId);

      if (!user) {
        throw new UnauthorizedException('Invalid user!');
      }

      const { id, ...rest } = user;
      const accessToken = await this.generateAccessToken({ sub: id, ...rest });

      return { accessToken };
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    }
  }
}
