import { Resident, ResidentPhoto } from 'generated/prisma/client';
import { AddResidentPhotoDto } from 'src/modules/residents/dto/addResidentPhotoDto';
import { CreateResidentDto } from 'src/modules/residents/dto/createResidentDto';
import { UpdateResidentDto } from 'src/modules/residents/dto/UpdateResidentDto';

export const RESIDENTS_REPOSITORY = Symbol('RESIDENTS_REPOSITORY');

export interface ResidentsRepository {
  findById(id: string): Promise<Resident | null>;
  findByApartmentId(apartmentId: string): Promise<Resident[]>;
  create(resident: CreateResidentDto): Promise<Resident>;
  update(id: string, data: UpdateResidentDto): Promise<Resident>;
  addPhoto(
    residentId: string,
    photo: AddResidentPhotoDto,
  ): Promise<ResidentPhoto>;
  findPhotos(residentId: string): Promise<ResidentPhoto[]>;
}
