import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UsersRegisterDto {
  @ApiProperty({
    example: 'artist',
    description: 'user id',
    required: true,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userId: string;

  @ApiProperty({
    example: '12345',
    description: 'user password',
    required: true,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/)
  password: string;

  @ApiProperty({
    example: 'gogh',
    description: 'user username',
    required: true,
  })
  @IsString()
  @MinLength(2)
  username: string;

  @ApiProperty({
    example: 'local',
    description: 'signup provider',
    required: true,
  })
  @IsString()
  provider: string;
}
