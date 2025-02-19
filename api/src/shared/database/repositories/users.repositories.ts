import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(data);
  }

  findUnique(data: Prisma.UserFindUniqueArgs) {
    return this.prismaService.user.findUnique(data);
  }
}
