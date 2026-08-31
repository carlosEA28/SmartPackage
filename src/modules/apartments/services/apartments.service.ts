import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateApartmentDto } from '../dto/createApartmentDto';
import { UpdateApartmentDto } from '../dto/UpdateApartmentDto';
import { APARTMENTS_REPOSITORY } from '../repositories/interfaces/ApartmentsRepository';
import type { ApartmentsRepository } from '../repositories/interfaces/ApartmentsRepository';

@Injectable()
export class ApartmentsService {
  constructor(
    @Inject(APARTMENTS_REPOSITORY)
    private readonly apartmentsRepository: ApartmentsRepository,
  ) {}

  async findById(id: string) {
    const apartment = await this.apartmentsRepository.findById(id);

    if (!apartment) {
      throw new NotFoundException('Apartment was not found');
    }

    return apartment;
  }

  async findByNumberAndBlock(number: string, block: string) {
    const apartment = await this.apartmentsRepository.findByNumberAndBlock(
      number,
      block,
    );

    if (!apartment) {
      throw new NotFoundException('Apartment was not found');
    }

    return apartment;
  }

  async findResidents(id: string) {
    await this.findById(id);

    return this.apartmentsRepository.findResidents(id);
  }

  async create(params: CreateApartmentDto) {
    const apartmentExists =
      await this.apartmentsRepository.findByNumberAndBlock(
        params.number,
        params.block,
      );

    if (apartmentExists) {
      throw new ConflictException('Apartment already exists');
    }

    return this.apartmentsRepository.create(params);
  }

  async update(id: string, data: UpdateApartmentDto) {
    const apartment = await this.findById(id);
    const number = data.number ?? apartment.number;
    const block = data.block ?? apartment.block;

    const apartmentWithSameNumberAndBlock =
      await this.apartmentsRepository.findByNumberAndBlock(number, block);

    if (
      apartmentWithSameNumberAndBlock &&
      apartmentWithSameNumberAndBlock.id !== id
    ) {
      throw new ConflictException('Apartment already exists');
    }

    return this.apartmentsRepository.update(id, data);
  }
}
