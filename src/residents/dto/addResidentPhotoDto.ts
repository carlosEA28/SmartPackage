import { IsNotEmpty, IsString } from 'class-validator';

export class AddResidentPhotoDto {
  @IsString()
  @IsNotEmpty()
  photoUrl: string;
}
