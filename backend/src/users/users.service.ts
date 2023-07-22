import {
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Pool, PoolConnection } from 'mysql2/promise';
import { DB_CONNECTION } from '../constants';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { User } from '../auth/user.model';
import { Token } from '../auth/token.model';
import { CreateUserDto } from '../auth/dto/create-user.dto';

import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(@Inject(DB_CONNECTION) private readonly pool: Pool) {}

  async getUserInfo(id: string): Promise<User> {
    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const [result] = await connectionPool.execute(
        `SELECT id
              , password
              , username
              , current
              , provider
          FROM USER 
         WHERE id = '${id}'`,
      );

      return result[0];
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    } finally {
      connectionPool.release();
    }
  }

  async existUserEmail(email: string): Promise<boolean> {
    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const [result] = await connectionPool.execute(
        `SELECT id FROM USER WHERE email = '${email}'`,
      );

      return result[0] ? true : false;
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    } finally {
      connectionPool.release();
    }
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password, username, provider } = createUserDto;
    const connectionPool: PoolConnection = await this.pool.getConnection();

    try {
      await connectionPool.execute(
        `INSERT INTO USER
        (
          email
        , password
        , username
        , provider
        )
        VALUES (
          '${email}'
        , '${password}'
        , '${username}'
        , '${provider}'
        );`,
      );

      const [lastInsert] = await connectionPool.execute(
        'SELECT LAST_INSERT_ID() as id',
      );

      return {
        id: lastInsert[0]['id'],
        email,
        password,
        username,
        provider,
      };
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    } finally {
      connectionPool.release();
    }
  }

  async insertUserRefreshToken(userId: number, refreshToken: string) {
    const connectionPool: PoolConnection = await this.pool.getConnection();

    try {
      const hashedRefreshToken = await this.getHashedRefreshToken(refreshToken);
      await connectionPool.execute(
        `INSERT INTO TOKEN (content, userId) VALUES ('${hashedRefreshToken}', '${userId}');`,
      );
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    } finally {
      connectionPool.release();
    }
  }

  async getHashedRefreshToken(refreshToken: string) {
    const saltOrRounds = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, saltOrRounds);
    return hashedRefreshToken;
  }

  async find(email: string) {
    const connectionPool: PoolConnection = await this.pool.getConnection();

    try {
      const [result] = await connectionPool.execute(
        `SELECT id, email, password, username, current, provider FROM USER WHERE email = '${email}'`,
      );

      return result as User[];
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    } finally {
      connectionPool.release();
    }
  }
  async login(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { email, password } = authCredentialsDto;

    const connectionPool: PoolConnection = await this.pool.getConnection();

    try {
      const [result] = await connectionPool.execute(
        `SELECT id, password, username, current, provider FROM USER WHERE email = '${email}'`,
      );

      if (!result[0]) {
        return null;
      }

      const passwordMatch = await bcrypt.compare(password, result[0].password);
      if (!passwordMatch) {
        throw new UnauthorizedException('아이디 또는 비밀번호를 확인해주세요.');
      }

      return result[0];
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    } finally {
      connectionPool.release();
    }
  }

  async getRefreshTokenId(userId: string, refreshToken: string) {
    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const [tokens] = await connectionPool.execute(
        `SELECT id
              , content
           FROM TOKEN 
          WHERE userId = '${userId}'`,
      );

      let refreshTokenId = null;
      for (const token of tokens as Token[]) {
        const storedRefreshToken = token.content;
        if (await bcrypt.compare(refreshToken, storedRefreshToken)) {
          refreshTokenId = token.id;
          break;
        }
      }

      return refreshTokenId;
    } catch (error) {
      throw new HttpException({ message: error.message, error }, error.status);
    } finally {
      connectionPool.release();
    }
  }
}
