import {
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Pool, PoolConnection } from 'mysql2/promise';
import { DB_CONNECTION } from 'src/constants';
import { UsersRegisterDto } from './dto/users-register.dto';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { User } from 'src/auth/user.model';

@Injectable()
export class UsersService {
  constructor(@Inject(DB_CONNECTION) private readonly pool: Pool) {}

  async getUserInfo(id: string): Promise<User> {
    const connectionPool: PoolConnection = await this.pool.getConnection();
    try {
      const [result] = await connectionPool.execute(
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
      const [result] = await connectionPool.execute(
        `SELECT id FROM USER WHERE id = '${id}'`,
      );

      return result[0] ? true : false;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error.message);
    } finally {
      connectionPool.release();
    }
  }

  async registerUser(usersRegisterDto: UsersRegisterDto) {
    const { userId, password, nickname, provider } = usersRegisterDto;

    const connectionPool: PoolConnection = await this.pool.getConnection();

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await connectionPool.execute(
        `INSERT INTO USER
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
        );`,
      );

      return {
        userId,
        nickname,
      };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error.message);
    } finally {
      connectionPool.release();
    }
  }

  async login(authCredentialsDto: AuthCredentialsDto) {
    const { userId, password } = authCredentialsDto;

    const connectionPool: PoolConnection = await this.pool.getConnection();

    try {
      const [result] = await connectionPool.execute(
        `SELECT id, password, nickname, current, provider FROM USER WHERE id = '${userId}'`,
      );

      if (!result[0]) {
        return null;
      }

      const passwordMatch = await bcrypt.compare(password, result[0].password);
      if (!passwordMatch) {
        throw new UnauthorizedException();
      }

      return result;
    } catch (error) {
      Logger.error(error);

      if (error.status === HttpStatus.UNAUTHORIZED) {
        throw new UnauthorizedException();
      } else {
        throw new InternalServerErrorException(error.message);
      }
    } finally {
      connectionPool.release();
    }
  }
}
