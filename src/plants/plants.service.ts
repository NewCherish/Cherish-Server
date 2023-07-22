import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { notFound } from 'src/utils/error';
import { renameObjectKey } from 'src/utils/object';
import { ResponsePlantInformationData } from './dto/response-plantInformation.dto';
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
}
