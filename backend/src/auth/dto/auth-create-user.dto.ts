import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userId: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/)
  password: string;

  @IsString()
  @MinLength(2)
  nickname: string;

  @IsString()
  provider: string;
}
