import { ApiProperty } from '@nestjs/swagger';

export class CreateUserSuccessResponseDto {
  @ApiProperty({
    example: 'artist@art.com',
    description: '가입된 User Email',
  })
  readonly email: string;

  @ApiProperty({
    example: 'gogh',
    description: '가입된 User Name',
  })
  readonly username: string;
}

export class CreateUserFailedResponseDto {
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
