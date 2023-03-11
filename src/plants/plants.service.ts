import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ResponsePlantsData } from './dto/read-plants.dto';

@Injectable()
export class PlantsService {
  constructor(private prisma: PrismaService) {}

  async getPlants(): Promise<ResponsePlantsData> {
    try {
      const userId = // 토큰 -> 유저 아이디;
      if (!userId) {

      }
      const plants = await this.prisma.userPlant.findMany({
        where: {
          userId,
        },
      });

      const plantCount = plants.length;
      // dto 맞게 foreach문 수정
    } catch (error) {
      console.log(error);
    }
  }
}
