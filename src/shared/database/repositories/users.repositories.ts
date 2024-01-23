import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUser: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(createUser);
  }

  findUnique(data: Prisma.UserFindUniqueArgs) {
    return this.prismaService.user.findUnique(data);
  }
}
