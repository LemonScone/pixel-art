import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray } from 'class-validator';

export class FrameDto {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: [
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      '',
      '',
      '',
      '',
      '',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      '',
      '',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(0, 0, 0)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(0, 0, 0)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(255, 255, 255)',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(0, 0, 0)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(0, 0, 0)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(0, 0, 0)',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(139, 195, 74)',
      'rgb(139, 195, 74)',
      'rgb(139, 195, 74)',
      'rgb(139, 195, 74)',
      'rgb(139, 195, 74)',
      'rgb(139, 195, 74)',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(139, 195, 74)',
      'rgb(139, 195, 74)',
      'rgb(139, 195, 74)',
      'rgb(139, 195, 74)',
      'rgb(255, 255, 255)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(139, 195, 74)',
      'rgb(139, 195, 74)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      '',
      '',
      '',
      '',
      '',
      '',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(139, 195, 74)',
      'rgb(139, 195, 74)',
      'rgb(0, 0, 0)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      '',
      '',
      '',
      '',
      '',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(139, 195, 74)',
      'rgb(139, 195, 74)',
      'rgb(255, 255, 255)',
      'rgb(0, 0, 0)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      '',
      '',
      '',
      '',
      '',
      '',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(255, 255, 255)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      'rgb(0, 0, 0)',
      '',
      '',
    ],
    required: true,
  })
  @IsArray()
  grid: string[];

  @ApiProperty({
    example: 10,
    required: true,
  })
  @IsNumber()
  animateInterval: number;
}
