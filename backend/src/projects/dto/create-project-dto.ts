import { IsString, MaxLength, MinLength, IsNumber } from 'class-validator';
import { FrameDto } from './frame-dto';

export class CreateProjectDto {
  @IsNumber()
  @MinLength(1)
  @MaxLength(3)
  cellSize: number;

  @IsNumber()
  @MinLength(1)
  @MaxLength(3)
  gridColumns: number;

  @IsNumber()
  @MinLength(1)
  @MaxLength(3)
  gridRows: number;

  @IsString()
  pallete: string;

  frames: FrameDto[];
}
