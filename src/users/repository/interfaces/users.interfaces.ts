export interface UsersRepostiory {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string);
  createUser(user: User);
  updateUser(id: string, data: UpdateUserDto);
}
