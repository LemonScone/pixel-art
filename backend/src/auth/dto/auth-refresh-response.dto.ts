import { ApiProperty } from '@nestjs/swagger';
import { LoginSuccessResponseDto } from './auth-login-response.dto';

export class RefreshSuccessResponseDto extends LoginSuccessResponseDto {}

export class RefreshFailedResponseDto {
  @ApiProperty({
    example: false,
  })
  success: boolean;
  @ApiProperty({
    example: 'access token을 생성하는 도중 오류가 발생했습니다.',
    description: 'access token 생성 오류 메시지',
  })
  message: string;
}
