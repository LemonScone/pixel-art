import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  LoginSuccessResponseDto,
  LoginFailedResponseDto,
} from './dto/auth-login-response.dto';
import { Response } from 'express';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import {
  LogoutFailedResponseDto,
  LogoutSuccessResponseDto,
} from './dto/auth-logout-response.dto';
import {
  RefreshFailedResponseDto,
  RefreshSuccessResponseDto,
} from './dto/auth-refresh-response.dto';
import { ConfigService } from '@nestjs/config';
import { AuthSignupDto } from './dto/auth-signup.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import {
  CreateUserFailedResponseDto,
  CreateUserSuccessResponseDto,
} from './dto/create-user-response.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyResetPasswordDto } from './dto/verify-reset-password.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/whoami')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  whoAmI(@Req() req) {
    return req.user;
  }

  @Post('/signup')
  @ApiOperation({
    summary: '유저 생성',
    description: '유저를 생성합니다.',
  })
  @ApiResponse({
    type: CreateUserSuccessResponseDto,
    description: '회원가입된 user 정보',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    type: CreateUserFailedResponseDto,
    description: '회원가입 오류',
    status: HttpStatus.CONFLICT,
  })
  async signup(@Body() body: AuthSignupDto) {
    const user = await this.authService.signup({ ...body, provider: 'local' });
    return user;
  }

  @Post('/signin')
  @ApiOperation({
    summary: '로그인',
    description: '로그인 합니다.',
  })
  @ApiResponse({
    type: LoginSuccessResponseDto,
    description: '로그인 성공',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    type: LoginFailedResponseDto,
    description: '로그인 실패',
    status: HttpStatus.UNAUTHORIZED,
  })
  async signin(
    @Body() body: AuthCredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginSuccessResponseDto> {
    const user = await this.authService.signin(body);

    const {
      id,
      email,
      username,
      current,
      provider,
      accessToken,
      refreshToken,
    } = user;

    res.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });

    const expired = Number(
      this.configService.get<string>('JWT_EXPIRATION_TIME'),
    );

    return { id, email, accessToken, username, current, provider, expired };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/signout')
  @ApiOperation({
    summary: '로그아웃',
    description: '로그아웃 합니다.',
  })
  @ApiResponse({
    type: LogoutSuccessResponseDto,
    description: '로그아웃 성공',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    type: LogoutFailedResponseDto,
    description: '로그아웃 실패',
    status: HttpStatus.UNAUTHORIZED,
  })
  async signout(@Req() req, @Res() res: Response) {
    await this.authService.signout(req.user.refreshTokenId);
    res.clearCookie('refreshToken');

    res.status(HttpStatus.OK).send({
      message: '로그아웃 되었습니다.',
    });
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @ApiOperation({
    summary: '새 access token 생성',
    description: 'refresh token으로 새 access token을 얻습니다.',
  })
  @ApiResponse({
    type: RefreshSuccessResponseDto,
    description: '새 access token',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    type: RefreshFailedResponseDto,
    description: 'access token 생성 실패',
    status: HttpStatus.BAD_REQUEST,
  })
  async refresh(@Req() req: any): Promise<RefreshSuccessResponseDto> {
    const { userId } = req.user;
    const response = await this.authService.refresh(userId);
    const expired = Number(
      this.configService.get<string>('JWT_EXPIRATION_TIME'),
    );
    return { ...response, expired, id: userId };
  }

  @ApiOperation({
    summary: '비밀번호 변경 token 유효성 검증',
    description: '비밀번호를 변경을 위한 token의 유효성을 검증합니다.',
  })
  @Post('verify-password-token')
  async verifyPasswordToken(@Body() { token }: VerifyResetPasswordDto) {
    return await this.authService.verifyPasswordToken(token);
  }

  @ApiOperation({
    summary: '비밀번호 찾기',
    description: '비밀번호 초기화 메일을 발송합니다.',
  })
  @Post('forgot-password/:email')
  async sendEmailForgotPassword(@Param('email') email: string) {
    await this.authService.sendResetPasswordMail(email);
  }

  @ApiOperation({
    summary: '비밀번호 변경',
    description: '비밀번호를 변경합니다.',
  })
  @Post('reset-password')
  async resetPassword(@Body() { token, password }: ResetPasswordDto) {
    await this.authService.resetPassword(token, password);
  }
}
