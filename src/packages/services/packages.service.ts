import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreatePackageDto } from '../dto/create-package.dto';
import { WithdrawPackageDto } from '../dto/withdraw-package.dto';

import { PACKAGES_REPOSITORY } from '../repositories/interfaces/PackagesRepository';
import type { PackagesRepository } from '../repositories/interfaces/PackagesRepository';
import { ApartmentsService } from 'src/apartments/services/apartments.service';

import { USERS_REPOSITORY } from 'src/users/repository/interfaces/UsersRepository';
import type { UsersRepository } from 'src/users/repository/interfaces/UsersRepository';
import { ResidentsService } from 'src/residents/services/residents.service';

@Injectable()
export class PackagesService {
  constructor(
    @Inject(PACKAGES_REPOSITORY)
    private readonly packagesRepository: PackagesRepository,
    private readonly apartmentsService: ApartmentsService,
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
    private readonly residentsService: ResidentsService,
  ) {}

  async create(data: CreatePackageDto) {
    // 1. Verificar se o apartamento existe
    await this.apartmentsService.findById(data.apartmentId);
    // 2. Verificar se o usuário existe
    const user = await this.usersRepository.findById(data.receivedByUserId);
    if (!user)
      throw new NotFoundException('User who received package not found');
    // 3. Criar a encomenda
    return this.packagesRepository.create(data);
  }

  async findById(id: string) {
    const pkg = await this.packagesRepository.findById(id);
    if (!pkg) throw new NotFoundException('Package was not found');
    return pkg;
  }

  async findByApartmentId(apartmentId: string) {
    await this.apartmentsService.findById(apartmentId);
    return this.packagesRepository.findByApartmentId(apartmentId);
  }

  async findAvailableByApartmentId(apartmentId: string) {
    await this.apartmentsService.findById(apartmentId);
    return this.packagesRepository.findAvailableByApartmentId(apartmentId);
  }

  async withdraw(id: string, data: WithdrawPackageDto) {
    const pkg = await this.packagesRepository.findById(id);

    if (!pkg) throw new NotFoundException('Package was not found');
    if (pkg.status === 'WITHDRAWN')
      throw new ConflictException('Package already withdrawn');

    const resident = await this.residentsService.findById(
      data.withdrawnByResidentId,
    );
    // Verificar se é mesmo apartamento
    if (resident.apartmentId !== pkg.apartmentId) {
      throw new ConflictException(
        'Resident does not belong to package apartment',
      );
    }

    return this.packagesRepository.withdraw(id, data);
  }
}
