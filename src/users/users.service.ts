import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { CustomException } from 'src/exceptions';
import { PrismaService } from 'src/prisma.service';
import { internalServerError } from 'src/utils/error';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(UsersService.name);

  async createUser(newUser): Promise<User | CustomException> {
    try {
      const user = await this.prisma.user.create({ data: newUser });
      return user;
    } catch (error) {
      this.logger.error({ error });
      return internalServerError();
    }
  }

  async getUserById(id: number): Promise<User | CustomException> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
          isDeleted: false,
        },
      });
      return user;
    } catch (error) {
      this.logger.error({ error });
      return internalServerError();
    }
  }

  async getUserByKaKaoId(kakaoId: number): Promise<User | CustomException> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          kakaoId,
          isDeleted: false,
        },
      });
      return user;
    } catch (error) {
      this.logger.error({ error });
      return internalServerError();
    }
  }

  async updateRefreshTokenByUserId(
    id: number,
    refreshToken: string,
  ): Promise<User | CustomException> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          refreshToken,
        },
      });
      return updatedUser;
    } catch (error) {
      this.logger.error(error);
      return internalServerError();
    }
  }
}
