import {
  Body,
  ConflictException,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersRegisterDto } from './dto/users-register.dto';
import { UserRegisterResponseDto } from './dto/users-register-response.dto';

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
    type: UserRegisterResponseDto,
    description: '회원가입된 user 정보',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    type: ConflictException,
    description: '아이디 중복',
    status: HttpStatus.CONFLICT,
  })
  async register(
    @Body() usersRegisterDto: UsersRegisterDto,
  ): Promise<UserRegisterResponseDto> {
    const { userId } = usersRegisterDto;

    let existUserId;
    try {
      existUserId = await this.usersService.existUserId(userId);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(
        'User 생성 중 오류가 발생했습니다.',
      );
    }

    if (existUserId) {
      throw new ConflictException(`${userId}는 이미 가입된 ID입니다.`);
    }

    const newUser = await this.usersService.registerUser(usersRegisterDto);
    return newUser;
  }
}
