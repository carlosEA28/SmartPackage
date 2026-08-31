import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { USERS_REPOSITORY } from './repository/interfaces/UsersRepository';
import type { UsersRepository } from './repository/interfaces/UsersRepository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly userRepository: UsersRepository,
  ) {}

  async findById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    return user;
  }

  async create(params: CreateUserDto) {
    const userExists = await this.userRepository.findByEmail(params.email);

    if (userExists) {
      throw new ConflictException('Email is already in use');
    }

    return this.userRepository.create(params);
  }

  async update(id: string, data: UpdateUserDto) {
    await this.findById(id);

    if (data.email) {
      const userWithEmail = await this.userRepository.findByEmail(data.email);

      if (userWithEmail && userWithEmail.id !== id) {
        throw new ConflictException('Email is already in use');
      }
    }

    return this.userRepository.update(id, data);
  }
}
