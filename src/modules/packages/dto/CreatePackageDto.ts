import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePackageDto {
  @IsNotEmpty()
  @IsString()
  Description: string;

  @IsOptional()
  TrackingCode: string;

  @IsString()
  @IsNotEmpty()
  apartmentId: string;
}
