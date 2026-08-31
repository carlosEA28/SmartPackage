import { Injectable } from '@nestjs/common';
import { Package } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePackageDto } from 'src/packages/dto/create-package.dto';
import { WithdrawPackageDto } from 'src/packages/dto/withdraw-package.dto';
import { PackagesRepository } from '../interfaces/PackagesRepository';

@Injectable()
export class PrismaPackagesRepository implements PackagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Package | null> {
    return this.prisma.package.findUnique({
      where: { id },
    });
  }

  async findByApartmentId(apartmentId: string): Promise<Package[]> {
    return this.prisma.package.findMany({
      where: { apartmentId },
      orderBy: { receivedAt: 'desc' },
    });
  }

  async findAvailableByApartmentId(apartmentId: string): Promise<Package[]> {
    return this.prisma.package.findMany({
      where: { apartmentId, status: 'AVAILABLE' },
      orderBy: { receivedAt: 'desc' },
    });
  }

  async create(data: CreatePackageDto): Promise<Package> {
    return this.prisma.package.create({
      data: {
        ...data,
        status: 'AVAILABLE',
        receivedAt: new Date(),
      },
    });
  }

  async withdraw(id: string, data: WithdrawPackageDto): Promise<Package> {
    return this.prisma.package.update({
      where: { id },
      data: {
        status: 'WITHDRAWN',
        withdrawnAt: new Date(),
        withdrawnByResidentId: data.withdrawnByResidentId,
        withdrawalPhotoUrl: data.withdrawalPhotoUrl,
        similarityScore: data.similarityScore,
        updatedAt: new Date(),
      },
    });
  }
}
