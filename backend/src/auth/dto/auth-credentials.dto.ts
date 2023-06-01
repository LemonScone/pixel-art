import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty({
    example: 'test',
    description: 'user id',
    required: true,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userId: string;

  @ApiProperty({
    example: '1234',
    description: 'user password',
    required: true,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/)
  password: string;
}
