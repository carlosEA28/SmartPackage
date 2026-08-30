import { CreateUserDto } from 'src/users/dto/createUserDto';
import { UpdateUserDto } from 'src/users/dto/UpdateUserDto';

export interface UsersRepostiory {
  findById(id: string): Promise<unknown | null>;
  findByEmail(email: string);
  createUser(user: CreateUserDto);
  updateUser(id: string, data: UpdateUserDto);
}
