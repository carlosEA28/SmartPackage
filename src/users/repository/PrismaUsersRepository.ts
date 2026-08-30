import { PrismaClient } from 'generated/prisma/client';
import { CreateUserDto } from '../dto/createUserDto';
import { UpdateUserDto } from '../dto/UpdateUserDto';
import { UsersRepostiory } from './interfaces/users.interfaces';
import { PrismaService } from 'src/database/prisma.service';

export class PrismaUsersRepository implements UsersRepostiory {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<unknown | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }
  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
  async createUser(params: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        ...params,
      },
    });

    return user;
  }
  async updateUser(id: string, data: UpdateUserDto) {
    throw new Error('Method not implemented.');
  }
}
