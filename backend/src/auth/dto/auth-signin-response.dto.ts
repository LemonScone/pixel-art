import { ApiProperty } from '@nestjs/swagger';

export class SignInSuccessResponseDto {
  @ApiProperty({
    example: 'token',
    description: '토큰',
    required: true,
  })
  accessToken: string;
}

export class SignInFailedResponseDto {
  @ApiProperty({
    example: '로그인에 실패했습니다.',
    description: '로그인 실패 메시지',
  })
  message: string;
}
