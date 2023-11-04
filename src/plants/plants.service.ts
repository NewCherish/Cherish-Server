import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { notFound, badRequest } from 'src/utils/error';
import { renameObjectKey } from 'src/utils/object';
import { ResponsePlantInformationData } from './dto/response-plantInformation.dto';
import {
  ResponseGetPlantWaterLogData,
  ResponseCreatePlantWaterDto,
} from './dto/plantwaterlog.dto';
import * as dayjs from 'dayjs';
import { getCurrentSeoulTime } from 'src/utils/date';

@Injectable()
export class PlantsService {
  constructor(private prisma: PrismaService) {}

  async getPlantInformation(id: number): Promise<ResponsePlantInformationData> {
    const plant = await this.prisma.plant.findUnique({
      where: { id, isDeleted: false },
      select: {
        introduction: true,
        name: true,
        meaning: true,
        explanation: true,
        circleImageURL: true,
        PlantLevel: {
          select: {
            levelName: true,
            description: true,
            imageURL: true,
          },
        },
      },
    });

    if (!plant) {
      throw notFound();
    }

    return renameObjectKey<ResponsePlantInformationData, object>(
      plant,
      'PlantLevel',
      'plantLevel',
    );
  }

  async getPlantWaterLog(id: number): Promise<ResponseGetPlantWaterLogData> {
    const reviews = await this.prisma.water.findMany({
      where: { userPlantId: id, isDeleted: false },
      select: {
        id: true,
        review: true,
        wateringDate: true,
      },
    });

    const result = await Promise.all(
      reviews.map((review) => {
        const date = dayjs(review.wateringDate).format('MM/DD');
        const data = {
          id: review.id,
          review: review.review,
          wateringDate: date,
        };
        return data;
      }),
    );

    return { reviews: result };
  }

  async createPlantWater(id: number): Promise<ResponseCreatePlantWaterDto> {
    const today: Date = getCurrentSeoulTime();

    const startOfDay = new Date(today);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const checkTodayWatering = await this.prisma.water.findFirst({
      where: {
        userPlantId: id,
        wateringDate: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });

    if (checkTodayWatering) {
      throw badRequest();
    }
    const waterData = {
      userPlantId: id,
      wateringDate: today,
    };

    const water = await this.prisma.water.create({
      data: waterData,
    });

    const updateUserPlant = await this.prisma.userPlant.update({
      where: { id },
      data: {
        loveGauge: {
          increment: 0.5,
        },
        waterCount: {
          increment: 1,
        },
      },
    });

    const result = {
      id: water.id,
      userPlantId: water.userPlantId,
      wateringDate: water.wateringDate,
    };

    return result;
  }
}
