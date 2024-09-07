import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  Length,
  MaxLength,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IsValidDocument } from '../../validators/document.validator';

export class CreateFarmerDto {
  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  @Transform(({ value }) => value.replace(/[^\d]+/g, ''))
  @IsValidDocument()
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
  @Min(0)
  totalArea: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @Min(0)
  arableArea: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @Min(0)
  vegetationArea: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  crops: string[];
}
