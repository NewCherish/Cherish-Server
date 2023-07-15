import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(newUser): Promise<User> {
    const user = await this.prisma.user.create({ data: newUser });
    return user;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        isDeleted: false,
      },
    });
    return user;
  }

  async getUserByKaKaoId(kakaoId: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        kakaoId,
        isDeleted: false,
      },
    });
    return user;
  }

  async updateRefreshTokenByUserId(
    id: number,
    refreshToken: string,
  ): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        refreshToken,
      },
    });
    return updatedUser;
  }
}
