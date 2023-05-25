import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCreateUserDto } from './dto/auth-create-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  SignInSuccessResponseDto,
  SignInFailedResponseDto,
} from './dto/auth-signin-response.dto';
import {
  CreateUserFailedResponseDto,
  CreateUserDuplicatedIdResponseDto,
  CreateUserSuccessResponseDto,
} from './dto/auth-create-user-response.dto';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({
    summary: '유저 생성',
    description: '유저를 생성합니다.',
  })
  @ApiResponse({
    type: CreateUserFailedResponseDto,
    description: '회원가입 실패',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    type: CreateUserDuplicatedIdResponseDto,
    description: '아이디 중복 메시지',
    status: HttpStatus.CONFLICT,
  })
  signUp(@Body() authCreateUserDto: AuthCreateUserDto): Promise<void> {
    return this.authService.createUser(authCreateUserDto);
  }

  @Post('/signin')
  @ApiOperation({
    summary: '로그인',
    description: '로그인 합니다.',
  })
  @ApiResponse({
    type: SignInSuccessResponseDto,
    description: '로그인 성공',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    type: SignInFailedResponseDto,
    description: '로그인 실패',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    type: UnauthorizedException,
    description: '로그인 실패',
    status: HttpStatus.UNAUTHORIZED,
  })
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
