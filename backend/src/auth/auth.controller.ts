import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  BadRequestException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  LoginSuccessResponseDto,
  LoginFailedResponseDto,
} from './dto/auth-login-response.dto';
import { Response, Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import {
  LogoutFailedResponseDto,
  LogoutSuccessResponseDto,
} from './dto/auth-logout-response.dto';
import {
  RefreshFailedResponseDto,
  RefreshSuccessResponseDto,
} from './dto/auth-refresh-response.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/login')
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
  async login(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginSuccessResponseDto> {
    const loginResults = await this.authService.login(authCredentialsDto);

    if (!loginResults) {
      throw new UnauthorizedException('아이디 또는 비밀번호를 확인해주세요.');
    }

    const { accessToken, refreshToken } = loginResults;
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
    });

    return { accessToken };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/logout')
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
  async logout(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LogoutSuccessResponseDto | LogoutFailedResponseDto> {
    await this.authService.logout(req.user.refreshTokenId);
    res.clearCookie('refresh_token');

    return {
      message: '로그아웃 되었습니다.',
    };
  }

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
  async refresh(@Req() req: Request) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new BadRequestException('refresh token이 존재하지 않습니다.');
    }
    const newAccessToken = await this.authService.refresh(refreshToken);

    return newAccessToken;
  }
}
