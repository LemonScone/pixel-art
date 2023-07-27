import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateUserCurrentDto {
  @ApiProperty({
    example: 10,
    description: 'user current project id',
    required: true,
  })
  @IsNumber()
  current: number;
}
