import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UsersRegisterDto {
  @ApiProperty({
    example: 'artist@art.com',
    description: 'user email',
    required: true,
  })
  @IsEmail()
  email: string;

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
