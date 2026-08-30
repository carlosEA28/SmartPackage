import { Injectable } from '@nestjs/common';
import { Apartment, Resident } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateApartmentDto } from 'src/apartments/dto/createApartmentDto';
import { UpdateApartmentDto } from 'src/apartments/dto/UpdateApartmentDto';
import { ApartmentsRepository } from '../interfaces/ApartmentsRepository';

@Injectable()
export class PrismaApartmentsRepository implements ApartmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Apartment | null> {
    return this.prisma.apartment.findUnique({
      where: {
        id,
      },
    });
  }

  async findByNumberAndBlock(
    number: string,
    block: string,
  ): Promise<Apartment | null> {
    return this.prisma.apartment.findUnique({
      where: {
        block_number: {
          block,
          number,
        },
      },
    });
  }

  async findResidents(id: string): Promise<Resident[]> {
    return this.prisma.resident.findMany({
      where: {
        apartmentId: id,
      },
    });
  }

  async create(apartment: CreateApartmentDto): Promise<Apartment> {
    return this.prisma.apartment.create({
      data: {
        ...apartment,
      },
    });
  }

  async update(id: string, data: UpdateApartmentDto): Promise<Apartment> {
    return this.prisma.apartment.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }
}
