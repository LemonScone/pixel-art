import {
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Pool, PoolConnection } from 'mysql2/promise';
import { DB_CONNECTION } from 'src/constants';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DB_CONNECTION)
    private readonly pool: Pool,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { userId } = authCredentialsDto;

    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const loginResults = await this.usersService.login(authCredentialsDto);

      if (!loginResults) {
        return null;
      }

      const payload = { userId };
      const accessToken = await this.jwtService.sign(payload);

      return {
        accessToken,
      };
    } catch (error) {
      if (error.status === HttpStatus.UNAUTHORIZED) {
        throw new UnauthorizedException('아이디 또는 비밀번호를 확인해주세요.');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    } finally {
      connectionPool.release();
    }
  }
}
