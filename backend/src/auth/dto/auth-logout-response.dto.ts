import { ApiProperty } from '@nestjs/swagger';

export class LogoutSuccessResponseDto {
  @ApiProperty({
    example: '로그아웃 되었습니다.',
    description: '로그아웃 성공 메시지',
  })
  message: string;
}

export class LogoutFailedResponseDto {
  @ApiProperty({
    example: false,
  })
  success: boolean;
  @ApiProperty({
    example: '로그아웃 중 오류가 발생했습니다.',
    description: '로그아웃 실패 메시지',
  })
  message: string;
}
