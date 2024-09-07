import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  Length,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFarmerDto {
  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  document: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  farmName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  state: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  totalArea: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  arableArea: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  vegetationArea: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  crops: string[];
}
