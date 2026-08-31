import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AddResidentPhotoDto } from '../dto/addResidentPhotoDto';
import { CreateResidentDto } from '../dto/createResidentDto';
import { UpdateResidentDto } from '../dto/UpdateResidentDto';
import { RESIDENTS_REPOSITORY } from '../repositories/interfaces/ResidentsRepository';
import type { ResidentsRepository } from '../repositories/interfaces/ResidentsRepository';
import { ApartmentsService } from 'src/modules/apartments/services/apartments.service';

@Injectable()
export class ResidentsService {
  constructor(
    @Inject(RESIDENTS_REPOSITORY)
    private readonly residentsRepository: ResidentsRepository,
    private readonly apartmentsService: ApartmentsService,
  ) {}

  async findById(id: string) {
    const resident = await this.residentsRepository.findById(id);

    if (!resident) {
      throw new NotFoundException('Resident was not found');
    }

    return resident;
  }

  async findByApartmentId(apartmentId: string) {
    await this.apartmentsService.findById(apartmentId);

    return this.residentsRepository.findByApartmentId(apartmentId);
  }

  async create(params: CreateResidentDto) {
    await this.apartmentsService.findById(params.apartmentId);

    return this.residentsRepository.create(params);
  }

  async update(id: string, data: UpdateResidentDto) {
    await this.findById(id);

    if (data.apartmentId) {
      await this.apartmentsService.findById(data.apartmentId);
    }

    return this.residentsRepository.update(id, data);
  }

  async addPhoto(residentId: string, photo: AddResidentPhotoDto) {
    await this.findById(residentId);

    return this.residentsRepository.addPhoto(residentId, photo);
  }

  async findPhotos(residentId: string) {
    await this.findById(residentId);

    return this.residentsRepository.findPhotos(residentId);
  }
}
