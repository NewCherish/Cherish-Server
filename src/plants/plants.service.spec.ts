import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { mock, MockProxy } from 'jest-mock-extended';

import { PrismaService } from 'src/prisma.service';
import { PlantsService } from './plants.service';

import { notFound } from 'src/utils/error';
import * as objectUtils from 'src/utils/object';

import { mockPlant } from '../../test/mock/plants.mock';

describe('PlantsService', () => {
  let service: PlantsService;
  let plantPrisma: MockProxy<Pick<PrismaClient['plant'], 'findUnique'>> =
    mock();

  const mockPrismaClient = {
    plant: plantPrisma,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantsService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaClient)
      .compile();

    service = module.get<PlantsService>(PlantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get plant information by plantId', () => {
    const mockPlantId: number = 1;
    const mockResult = {
      ...mockPlant,
      plantLevel: [
        {
          levelName: '새싹',
          description: '새싹이 쏘옥 얼굴을 내밀었어요!',
          imageURL: '',
        },
      ],
    };

    it('존재하는 식물 id 가 주어지면, 식물 단계 정보를 반환한다.', async () => {
      const mockFindUnique = plantPrisma.findUnique.mockResolvedValueOnce(
        mockResult as any,
      );

      const result = await service.getPlantInformation(mockPlantId);

      expect(result).toEqual(mockResult);
      expect(mockFindUnique).toHaveBeenCalledWith({
        where: { id: mockPlantId, isDeleted: false },
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
    });

    it('존재하지 않는 식물 id 가 주어지면, Not Found 에러를 반환한다.', async () => {
      const mockFindUnique = plantPrisma.findUnique.mockResolvedValueOnce(null);
      jest.spyOn(objectUtils, 'renameObjectKey').mockImplementation(() => {});

      await expect(
        service.getPlantInformation(mockPlantId),
      ).rejects.toThrowError(notFound());
      expect(objectUtils.renameObjectKey).not.toHaveBeenCalled();
    });
  });
});
