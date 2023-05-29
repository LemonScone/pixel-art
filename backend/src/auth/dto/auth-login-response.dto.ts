import { ApiProperty } from '@nestjs/swagger';
import { AccessTokenDto } from './access-token.dto';

export class LoginSuccessResponseDto extends AccessTokenDto {}

export class LoginFailedResponseDto {
  @ApiProperty({
    example: false,
  })
  success: boolean;
  @ApiProperty({
    example: '로그인에 실패했습니다.',
    description: '로그인 실패 메시지',
  })
  message: string;
}
