import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersRegisterDto } from './dto/users-register.dto';
import {
  UserRegisterFailedResponseDto,
  UserRegisterSuccessResponseDto,
} from './dto/users-register-response.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @ApiOperation({
    summary: '유저 생성',
    description: '유저를 생성합니다.',
  })
  @ApiResponse({
    type: UserRegisterSuccessResponseDto,
    description: '회원가입된 user 정보',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    type: UserRegisterFailedResponseDto,
    description: '회원가입 오류',
    status: HttpStatus.CONFLICT,
  })
  async register(
    @Body() usersRegisterDto: UsersRegisterDto,
  ): Promise<UserRegisterSuccessResponseDto | UserRegisterFailedResponseDto> {
    const newUser = await this.usersService.create(usersRegisterDto);
    return newUser;
  }
}
