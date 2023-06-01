import {
  IsString,
  MaxLength,
  MinLength,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { FrameDto } from './frame-dto';

export class UpdateProjectDto {
  @IsNumber()
  id: number;

  @IsBoolean()
  animate: boolean;

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

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  title: string;

  @IsString()
  @MinLength(4)
  @MaxLength(255)
  description: string;

  @IsBoolean()
  isPublished: boolean;

  frames: FrameDto[];
}
