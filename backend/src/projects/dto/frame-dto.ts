import { IsString, IsNumber } from 'class-validator';

export class FrameDto {
  @IsNumber()
  id: number;

  @IsNumber()
  projectId: number;

  @IsString()
  grid: string;

  @IsNumber()
  animateInterval: number;
}
