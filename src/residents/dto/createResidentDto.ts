import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ResidentType } from 'generated/prisma/client';

export class CreateResidentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ResidentType)
  @IsOptional()
  type?: ResidentType;

  @IsString()
  @IsNotEmpty()
  apartmentId: string;

  @IsString()
  @IsOptional()
  userId?: string;
}
