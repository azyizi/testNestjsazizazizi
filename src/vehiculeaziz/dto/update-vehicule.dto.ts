import { IsBoolean, IsOptional, IsNumber, IsPositive, Min } from 'class-validator';

export class UpdateVehiculeDto {
  @IsOptional()
  brand?: string;

  @IsOptional()
  model?: string;

  @IsOptional()
  @IsNumber()
  @Min(2000)
  year?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  pricePerDay?: number;

  @IsOptional()
  @IsBoolean()
  available?: boolean;
}
