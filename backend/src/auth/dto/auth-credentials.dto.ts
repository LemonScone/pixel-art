import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
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
}
