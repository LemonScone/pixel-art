import {
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { AccessTokenPayload } from './payload.model';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';
import { DbService } from '../db/db.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private dbService: DbService,
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

  async signout(refreshTokenId: string) {
    await this.dbService.execute(
      `DELETE FROM TOKEN
        WHERE id = ${refreshTokenId}`,
    );
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
