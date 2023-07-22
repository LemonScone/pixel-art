import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class FrameDto {
  @ApiProperty({
    example:
      "['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','','','','','','rgb(0, 0, 0)','rgb(0, 0, 0)','','','','','','','','','','','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(255, 255, 255)','rgb(255, 255, 255)','','','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','','','','','','','','','','','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','','','','','','','','','','','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','','','','','','','','','','','','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','','','','','','','','','','','','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(0, 0, 0)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(0, 0, 0)','rgb(255, 255, 255)','rgb(255, 255, 255)','','','','','','','','','','','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(255, 255, 255)','','','','','','','','','','','','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(0, 0, 0)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(0, 0, 0)','rgb(255, 255, 255)','rgb(255, 255, 255)','','','','','','','','','','','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(0, 0, 0)','','','','','','','','','','','','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(139, 195, 74)','rgb(139, 195, 74)','rgb(139, 195, 74)','rgb(139, 195, 74)','rgb(139, 195, 74)','rgb(139, 195, 74)','','','','','','','','','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(139, 195, 74)','rgb(139, 195, 74)','rgb(139, 195, 74)','rgb(139, 195, 74)','rgb(255, 255, 255)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','','','','','','','','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(139, 195, 74)','rgb(139, 195, 74)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','','','','','','','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(139, 195, 74)','rgb(139, 195, 74)','rgb(0, 0, 0)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','','','','','','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(139, 195, 74)','rgb(139, 195, 74)','rgb(255, 255, 255)','rgb(0, 0, 0)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','','','','','','','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','','','','','','','','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','','']",
    required: true,
  })
  @IsString()
  grid: string;

  @ApiProperty({
    example: 10,
    required: true,
  })
  @IsNumber()
  animateInterval: number;
}
