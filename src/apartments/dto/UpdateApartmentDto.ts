import { PartialType } from '@nestjs/mapped-types';
import { CreateApartmentDto } from './createApartmentDto';

export class UpdateApartmentDto extends PartialType(CreateApartmentDto) {}
