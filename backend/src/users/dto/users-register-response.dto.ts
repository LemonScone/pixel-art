import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterResponseDto {
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
