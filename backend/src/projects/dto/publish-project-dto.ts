import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class PublishProjectDto {
  @ApiProperty({
    example: true,
    description: '게시여부',
  })
  @IsBoolean()
  status: boolean;
}
