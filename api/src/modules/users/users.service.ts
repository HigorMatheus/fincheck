import { Injectable } from '@nestjs/common';

import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getUserById(userId) {
    return this.usersRepository.findUnique({
      where: { id: userId },
      select: { email: true, name: true },
    });
  }
}
