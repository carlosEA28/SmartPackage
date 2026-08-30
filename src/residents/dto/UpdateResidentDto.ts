import { PartialType } from '@nestjs/mapped-types';
import { CreateResidentDto } from './createResidentDto';

export class UpdateResidentDto extends PartialType(CreateResidentDto) {}
