import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterSuccessResponseDto {
  @ApiProperty({
    example: 'artist',
    description: '가입된 User Id',
  })
  readonly userId: string;

  @ApiProperty({
    example: 'gogh',
    description: '가입된 User Nickname',
  })
  readonly nickname: string;
}

export class UserRegisterFailedResponseDto {
  @ApiProperty({
    example: false,
  })
  success: boolean;
  @ApiProperty({
    example: '회원가입 중 오류가 발생했습니다.',
    description: '회원가입 오류 메시지',
  })
  message: string;
}
