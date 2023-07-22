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
    const hashedRefreshToken = await this.getHashedRefreshToken(refreshToken);
    await this.dbService.execute(
      `INSERT INTO TOKEN (content, userId) VALUES ('${hashedRefreshToken}', '${userId}');`,
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
    const tokens = await this.dbService.execute<Token>(
      `SELECT id
            , content
         FROM TOKEN 
        WHERE userId = '${userId}'`,
    );

    let refreshTokenId = null;
    for (const token of tokens) {
      const storedRefreshToken = token.content;
      if (await bcrypt.compare(refreshToken, storedRefreshToken)) {
        refreshTokenId = token.id;
        break;
      }
    }

    return refreshTokenId;
  }
}
