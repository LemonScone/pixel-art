import {
  IsString,
  MaxLength,
  MinLength,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userId: string;

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
}
