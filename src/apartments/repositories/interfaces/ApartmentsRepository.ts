import { Apartment, Resident } from 'generated/prisma/client';
import { CreateApartmentDto } from 'src/apartments/dto/createApartmentDto';
import { UpdateApartmentDto } from 'src/apartments/dto/UpdateApartmentDto';

export const APARTMENTS_REPOSITORY = Symbol('APARTMENTS_REPOSITORY');

export interface ApartmentsRepository {
  findById(id: string): Promise<Apartment | null>;
  findByNumberAndBlock(
    number: string,
    block: string,
  ): Promise<Apartment | null>;
  findResidents(id: string): Promise<Resident[]>;
  create(apartment: CreateApartmentDto): Promise<Apartment>;
  update(id: string, data: UpdateApartmentDto): Promise<Apartment>;
}
