import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  LoginSuccessResponseDto,
  LoginFailedResponseDto,
} from './dto/auth-login-response.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  ): Promise<LoginSuccessResponseDto> {
    const loginResults = await this.authService.login(authCredentialsDto);

    if (!loginResults) {
      throw new UnauthorizedException('아이디 또는 비밀번호를 확인해주세요.');
    }
    return loginResults;
  }
}
