import {
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { AccessTokenPayload } from './payload.model';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import { DbService } from '../db/db.service';

import { renderMailContent } from '../utils/mail';
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

  async verifyPasswordToken(token: string) {
    try {
      const verifiedToken = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_RESET_PASSWORD_SECRET'),
      });

      const [user] = await this.usersService.find(verifiedToken.email);
      if (!user) {
        throw new NotFoundException('User Not Found.');
      }

      const stored = await this.usersService.findPasswordToken(user.id);

      if (
        verifiedToken &&
        Object.keys(verifiedToken).length &&
        verifiedToken.key === stored.token
      ) {
        return verifiedToken;
      } else {
        throw new UnauthorizedException('Token verify failed.');
      }
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(error);
      } else if (error instanceof JsonWebTokenError) {
        throw new JsonWebTokenError(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async sendResetPasswordMail(email: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException();
    }

    await this.usersService.removePasswordToken(user.id);

    const currentTimeHash = await bcrypt.hash(new Date().toLocaleString(), 10);
    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        key: currentTimeHash,
      },
      {
        secret: this.configService.get<string>('JWT_RESET_PASSWORD_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_RESET_PASSWORD_EXPIRATION_TIME',
        ),
      },
    );

    await this.usersService.createPasswordToken(user.id, currentTimeHash);

    this.sendVerifyMail(user.username, user.email, token);

    return token;
  }

  async sendVerifyMail(username: string, to: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: this.configService.get<string>('EMAIL_ADDRESS'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });

    const redirectUrl = `${this.configService.get<string>(
      'CLIENT_URL',
    )}/reset-password?token=${token}`;

    const from = `${this.configService.get<string>(
      'PROJECT_NAME',
    )} <${this.configService.get<string>('EMAIL_ADDRESS')}>`;

    const mailOptions = {
      from,
      to,
      html: renderMailContent(username, redirectUrl),
      subject: 'Password help is arrived!',
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        throw new InternalServerErrorException(error);
      }
      return;
    });
  }

  async resetPassword(token: string, password: string) {
    const verifiedToken = await this.verifyPasswordToken(token);

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    this.usersService.updatePassword(verifiedToken.sub, hash);
  }
}
