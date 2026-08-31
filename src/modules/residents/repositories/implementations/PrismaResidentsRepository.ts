import { Injectable } from '@nestjs/common';
import { Resident, ResidentPhoto } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { AddResidentPhotoDto } from 'src/modules/residents/dto/addResidentPhotoDto';
import { CreateResidentDto } from 'src/modules/residents/dto/createResidentDto';
import { UpdateResidentDto } from 'src/modules/residents/dto/UpdateResidentDto';
import { ResidentsRepository } from '../interfaces/ResidentsRepository';

@Injectable()
export class PrismaResidentsRepository implements ResidentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Resident | null> {
    return this.prisma.resident.findUnique({
      where: {
        id,
      },
    });
  }

  async findByApartmentId(apartmentId: string): Promise<Resident[]> {
    return this.prisma.resident.findMany({
      where: {
        apartmentId,
      },
    });
  }

  async create(resident: CreateResidentDto): Promise<Resident> {
    return this.prisma.resident.create({
      data: {
        ...resident,
      },
    });
  }

  async update(id: string, data: UpdateResidentDto): Promise<Resident> {
    return this.prisma.resident.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  async addPhoto(
    residentId: string,
    photo: AddResidentPhotoDto,
  ): Promise<ResidentPhoto> {
    return this.prisma.residentPhoto.create({
      data: {
        residentId,
        photoUrl: photo.photoUrl,
      },
    });
  }

  async findPhotos(residentId: string): Promise<ResidentPhoto[]> {
    return this.prisma.residentPhoto.findMany({
      where: {
        residentId,
      },
    });
  }
}
