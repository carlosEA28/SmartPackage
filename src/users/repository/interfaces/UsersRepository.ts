import { Prisma, User } from 'generated/prisma/client';
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { UpdateUserDto } from 'src/users/dto/UpdateUserDto';

export const USERS_REPOSITORY = Symbol('USERS_REPOSITORY');

export interface UsersRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: CreateUserDto): Promise<User>;
  update(id: string, data: UpdateUserDto): Promise<User>;
}

export type CreateUserData = Prisma.UserCreateInput;
export type UpdateUserData = Prisma.UserUpdateInput;
