import { ApiProperty } from '@nestjs/swagger';

export class CreateUserSuccessResponseDto {
  @ApiProperty({
    example: '회원가입이 완료되었습니다.',
    description: '회원가입 결과 메시지',
  })
  readonly message: string;
}

export class CreateUserFailedResponseDto {
  @ApiProperty({
    example: '회원가입 중 오류가 발생했습니다.',
    description: '회원가입 실패 메시지',
  })
  readonly message: string;
}

export class CreateUserDuplicatedIdResponseDto {
  @ApiProperty({
    example: '중복된 아이디입니다.',
    description: '아이디 중복 메시지',
  })
  readonly message: string;
}
