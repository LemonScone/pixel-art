import { ApiProperty } from '@nestjs/swagger';

export class LoginSuccessResponseDto {
  @ApiProperty({
    example: 'token',
    description: '토큰',
    required: true,
  })
  accessToken: string;
}

export class LoginFailedResponseDto {
  @ApiProperty({
    example: '로그인에 실패했습니다.',
    description: '로그인 실패 메시지',
  })
  message: string;
}
