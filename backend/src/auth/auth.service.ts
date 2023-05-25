import {
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Pool, PoolConnection } from 'mysql2/promise';
import { DB_CONNECTION } from 'src/constants';
import { AuthCreateUserDto } from './dto/auth-create-user.dto';
import Imysql from 'mysql2/typings/mysql/lib/protocol/packets';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DB_CONNECTION)
    private readonly pool: Pool,
    private jwtService: JwtService,
  ) {}

  async getUserInfo(id: string): Promise<User> {
    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const [result]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await connectionPool.execute(
          `SELECT id, password, nickname, current, provider FROM USER WHERE id = '${id}'`,
        );

      return result[0];
    } catch (error) {
      throw new InternalServerErrorException();
    } finally {
      connectionPool.release();
    }
  }

  async existUserId(id: string): Promise<boolean> {
    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const [result]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await connectionPool.execute(`SELECT id FROM USER WHERE id = '${id}'`);

      return result[0] ? true : false;
    } catch (error) {
      throw new InternalServerErrorException();
    } finally {
      connectionPool.release();
    }
  }

  async createUser(authCreateUserDto: AuthCreateUserDto): Promise<void> {
    const { userId, password, nickname, provider } = authCreateUserDto;

    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const existUserId = await this.existUserId(userId);

      if (existUserId) {
        throw new ConflictException();
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      await connectionPool.execute(`INSERT INTO USER
                                      (
                                        id
                                      , password
                                      , nickname
                                      , provider
                                      )
                                    VALUES (
                                      '${userId}'
                                    , '${hashedPassword}'
                                    , '${nickname}'
                                    , '${provider}'
                                    );
      `);
    } catch (error) {
      if (error.status === HttpStatus.CONFLICT) {
        throw new ConflictException('이미 존재하는 아이디입니다.');
      } else {
        throw new InternalServerErrorException(
          '회원가입 중 오류가 발생했습니다.',
        );
      }
    } finally {
      connectionPool.release();
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { userId, password } = authCredentialsDto;

    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const user = await this.getUserInfo(userId);
      if (user && (await bcrypt.compare(password, user.password))) {
        const payload = { userId };
        const accessToken = await this.jwtService.sign(payload);

        return {
          accessToken,
        };
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      if (error.status === HttpStatus.UNAUTHORIZED) {
        throw new UnauthorizedException('로그인 실패');
      } else {
        throw new InternalServerErrorException();
      }
    } finally {
      connectionPool.release();
    }
  }
}
