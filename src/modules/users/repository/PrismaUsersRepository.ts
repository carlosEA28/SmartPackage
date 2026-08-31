import { User } from 'generated/prisma/client';
import { CreateUserDto } from '../dto/createUserDto';
import { UpdateUserDto } from '../dto/UpdateUserDto';
import { UsersRepository } from './interfaces/UsersRepository';
import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
  async create(params: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        ...params,
      },
    });

    return user;
  }
  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return user;
  }
}
