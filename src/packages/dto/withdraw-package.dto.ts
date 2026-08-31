import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class WithdrawPackageDto {
  @IsString()
  @IsNotEmpty()
  withdrawnByResidentId: string;

  @IsUrl()
  @IsNotEmpty()
  withdrawalPhotoUrl: string;

  @IsNumber()
  @IsNotEmpty()
  similarityScore: number;
}
