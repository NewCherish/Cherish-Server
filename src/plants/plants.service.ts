import { Injectable } from '@nestjs/common';
import { PlantLevel } from '@prisma/client';
import * as dayjs from 'dayjs';

import { PrismaService } from 'src/prisma.service';
import { notFound } from 'src/utils/error';
import { renameObjectKey } from 'src/utils/object';
import * as utilPlants from './utils/plants';
import * as utilDay from 'src/utils/day';
import { ResponsePlantDetailData } from './dto/response-plant-detail.dto';
import { ResponsePlantInformationData } from './dto/response-plant-information.dto';
import { ResponsePlantWaterLogData } from './dto/response-plant-water-log.dto';
import { ResponseUserPlantsData } from './dto/response-plants.dto';

@Injectable()
export class PlantsService {
  constructor(private prisma: PrismaService) {}

  async getUserPlantDetail(id: number): Promise<ResponsePlantDetailData> {
    const userPlant = await this.prisma.userPlant.findUnique({
      where: { id, isDeleted: false },
      select: {
        nickname: true,
        instagram: true,
        createdAt: true,
        plantId: true,
        waterCycle: true,
        loveGauge: true,
        plant: {
          select: {
            name: true,
            circleImageURL: true,
          },
        },
        Water: {
          select: {
            wateringDate: true,
          },
          orderBy: {
            wateringDate: 'desc',
          },
          take: 1,
        },
      },
    });
    if (!userPlant) {
      throw notFound();
    }

    const {
      nickname,
      instagram,
      plantId,
      loveGauge,
      waterCycle,
      createdAt,
      Water,
      plant,
    } = userPlant;
    const { wateringDate } = Water[0];
    const { name: plantName, circleImageURL: plantImage } = plant;

    const { levelName } = await this.getPlantLevelNameByLoveGauge(
      plantId,
      loveGauge,
    );

    const nextWateringDate: Date = utilPlants.calculateNextWateringDate(
      wateringDate,
      waterCycle,
    );

    const dDay: number = utilDay.calculateDday(new Date(), nextWateringDate);
    const duration: number = -utilDay.calculateDday(new Date(), createdAt);

    const { statusMessage, statusGauge } = utilPlants.calculatePlantStatus(
      plantId,
      -dDay,
    );

    return {
      id,
      nickname,
      instagram,
      duration,
      dDay,
      plantId,
      plantName,
      plantImage,
      levelName,
      statusMessage,
      statusGauge,
    };
  }

  async getPlantLevelNameByLoveGauge(
    plantId: number,
    loveGauge: number,
  ): Promise<Pick<PlantLevel, 'levelName'>> {
    const level = utilPlants.calculatePlantLevel(loveGauge);

    const plantLevel = await this.prisma.plantLevel.findUnique({
      where: { id: plantId, level, isDeleted: false },
      select: {
        levelName: true,
      },
    });

    return plantLevel;
  }

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

  async getPlantWaterLog(id: number): Promise<ResponsePlantWaterLogData> {
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

  async getUserPlants(userId: number): Promise<ResponseUserPlantsData> {
    const userPlants = await this.prisma.userPlant.findMany({
      where: {userId, isDeleted: false},
      select: {
        id: true,
        plantId: true,
        nickname: true,
        loveGauge: true,
        waterCycle: true,
        waterCount: true,
        plant: {
          select: {
            name: true,
            circleImageURL: true,
          },
        },
        Water: {
          select: {
            wateringDate: true,
          },
          orderBy: {
            wateringDate: 'desc',
          },
          take: 1,
        },
      }
    });

    if (!userPlants) {
      const data = {
        userPlants: [],
        userPlantsCount: 0
      }
      return data;
    }

    const processedUserPlants = await Promise.all(
      userPlants.map(async (userPlant) => {
        const nextWateringDate: Date = utilPlants.calculateNextWateringDate(
          userPlant.Water[0].wateringDate,
          userPlant.waterCycle,
        );
    
        const dDay: number = utilDay.calculateDday(new Date(), nextWateringDate);

        const description = utilPlants.makeRandomDescription(dDay, userPlant.waterCount);

        const levelName = await this.getPlantLevelNameByLoveGauge(userPlant.plantId, userPlant.loveGauge);

        const mainImage = await this.prisma.plantLevel.findFirst({
          where: {
            plantId: userPlant.plantId,
            level: utilPlants.calculatePlantLevel(userPlant.loveGauge)
          },
          select: {imageURL: true}
        });

        const data = {
          id: userPlant.id,
          plantType: userPlant.plant.name,
          dDay,
          nickname: userPlant.nickname,
          description,
          levelName: levelName.levelName,
          circleImage: userPlant.plant.circleImageURL,
          mainImage: mainImage.imageURL,
          loveGauge: userPlant.loveGauge,
        };
        return data;
      })
    );

    const data = {
      userPlants: processedUserPlants,
      userPlantsCount: processedUserPlants.length,
    }

    return data;
  }
}
