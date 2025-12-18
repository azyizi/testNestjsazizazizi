import { IsBoolean, IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateVehiculeDto {
  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  model: string;

  @IsNumber()
  @Min(2000)
  year: number;

  @IsNumber()
  @IsPositive()
  pricePerDay: number;

  @IsBoolean()
  available: boolean;
}
