import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { User } from '../auth/user.model';
import { Token } from '../auth/token.model';
import { CreateUserDto } from '../auth/dto/create-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private dbService: DbService) {}

  async getUserInfo(id: string): Promise<User> {
    const [result] = await this.dbService.execute<User>(
      `SELECT id
            , email
            , password
            , username
            , current
            , provider
         FROM USER 
        WHERE id = '${id}'`,
    );

    return result;
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password, username, provider } = createUserDto;

    await this.dbService.execute(
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

    const [lastInsert] = await this.dbService.execute(
      'SELECT LAST_INSERT_ID() as id',
    );

    return {
      id: lastInsert['id'],
      email,
      password,
      username,
      provider,
    };
  }

  async insertUserRefreshToken(userId: number, refreshToken: string) {
    // const hashedRefreshToken = await this.getHashedRefreshToken(refreshToken);
    await this.dbService.execute(
      `INSERT INTO TOKEN (content, userId) VALUES ('${refreshToken}', '${userId}');`,
    );
  }

  async getHashedRefreshToken(refreshToken: string) {
    const saltOrRounds = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, saltOrRounds);
    return hashedRefreshToken;
  }

  async find(email: string) {
    const result = await this.dbService.execute<User>(
      `SELECT id, email, password, username, current, provider FROM USER WHERE email = '${email}'`,
    );

    return result as User[];
  }

  async getRefreshTokenId(userId: string, refreshToken: string) {
    const [tokens] = await this.dbService.execute<Token>(
      `SELECT id
            , content
         FROM TOKEN 
        WHERE userId = '${userId}'
          AND content = '${refreshToken}'`,
    );

    // let refreshTokenId = null;
    // for (const token of tokens) {
    //   const storedRefreshToken = token.content;
    //   if (await bcrypt.compare(refreshToken, storedRefreshToken)) {
    //     refreshTokenId = token.id;
    //     break;
    //   }
    // }

    return tokens.id;
  }

  async updateCurrent(userId: string, current: number) {
    await this.dbService.execute<Token>(
      `UPDATE USER SET 
              current = ${current}
        WHERE id = ${userId}`,
    );

    return current;
  }

  async createPasswordToken(userId: number, token: string) {
    await this.dbService.execute(
      `INSERT INTO RESET_PASSWORD_TOKEN (userId, token) VALUES ('${userId}', '${token}');`,
    );

    const [lastInsert] = await this.dbService.execute(
      'SELECT LAST_INSERT_ID() as id',
    );

    return {
      id: lastInsert['id'],
      userId,
      token,
    };
  }

  async removePasswordToken(userId: number) {
    await this.dbService.execute(
      `DELETE FROM RESET_PASSWORD_TOKEN
        WHERE userId = ${userId}`,
    );
  }

  async findPasswordToken(
    userId: number,
  ): Promise<{ id: number; token: string }> {
    const [result] = await this.dbService.execute<any>(
      `SELECT id, token FROM RESET_PASSWORD_TOKEN WHERE userId = '${userId}'`,
    );

    return result;
  }

  async updatePassword(userId: string, password: string) {
    await this.dbService.execute(
      `UPDATE USER SET 
              password = '${password}'
        WHERE id = ${userId}`,
    );

    await this.dbService.execute(`DELETE FROM TOKEN WHERE userId = ${userId}`);
  }
}
