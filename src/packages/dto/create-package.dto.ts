import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePackageDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  trackingCode: string;

  @IsString()
  @IsNotEmpty()
  apartmentId: string;

  @IsString()
  @IsNotEmpty()
  receivedByUserId: string;
}
