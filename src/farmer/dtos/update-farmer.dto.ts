import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  Length,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IsValidDocument } from 'src/validators/document.validator';

export class UpdateFarmerDto {
  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  @Transform(({ value }) => value.replace(/[^\d]+/g, ''))
  @IsValidDocument()
  @IsOptional()
  document: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsOptional()
  farmName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsOptional()
  city: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  @IsOptional()
  state: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @IsOptional()
  totalArea: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @IsOptional()
  arableArea: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @IsOptional()
  vegetationArea: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @IsOptional()
  crops: string[];
}
