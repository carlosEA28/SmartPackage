import { Package } from 'generated/prisma/client';
import { CreatePackageDto } from 'src/modules/packages/dto/create-package.dto';
import { WithdrawPackageDto } from 'src/modules/packages/dto/withdraw-package.dto';

export const PACKAGES_REPOSITORY = Symbol('PACKAGES_REPOSITORY');

export interface PackagesRepository {
  findById(id: string): Promise<Package | null>;
  findByApartmentId(apartmentId: string): Promise<Package[]>;
  findAvailableByApartmentId(apartmentId: string): Promise<Package[]>;
  create(data: CreatePackageDto): Promise<Package>;
  withdraw(id: string, data: WithdrawPackageDto): Promise<Package>;
}
