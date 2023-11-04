import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { mock, MockProxy } from 'jest-mock-extended';

import { PrismaService } from 'src/prisma.service';
import { PlantsService } from './plants.service';

import { notFound } from 'src/utils/error';
import * as objectUtils from 'src/utils/object';

import {
  mockPlant,
  mockUserPlantDetailData,
  mockUserPlantResponse,
} from '../../test/mock/plants.mock';

describe('PlantsService', () => {
  let service: PlantsService;
  let plantPrisma: MockProxy<Pick<PrismaClient['plant'], 'findUnique'>> =
    mock();
  let waterPrisma: MockProxy<Pick<PrismaClient['water'], 'findMany'>> = mock();
  let userPlantPrisma: MockProxy<
    Pick<PrismaClient['userPlant'], 'findUnique'>
  > = mock();

  const mockPrismaClient = {
    plant: plantPrisma,
    water: waterPrisma,
    userPlant: userPlantPrisma,
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

  describe('get plant detail by userPlantId', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2023-08-13 18:00'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    const mockUserPlantId: number = 1;

    it('존재하는 userPlantId 가 주어지면 식물 상세 정보를 반환한다.', async () => {
      const mockFindUnique = userPlantPrisma.findUnique.mockResolvedValueOnce(
        mockUserPlantResponse as any,
      );
      jest
        .spyOn(service, 'getPlantLevelNameByLoveGague')
        .mockResolvedValueOnce({ levelName: '새싹' });

      const result = await service.getUserPlantDetail(mockUserPlantId);

      expect(result).toEqual(mockUserPlantDetailData);
    });

    it('존재하지 않는 userPlantId 가 주어지면 Not Found 에러를 반환한다.', async () => {
      const mockFindUnique =
        userPlantPrisma.findUnique.mockResolvedValueOnce(null);
      jest.spyOn(service, 'getPlantLevelNameByLoveGague').mockImplementation();

      await expect(
        service.getUserPlantDetail(mockUserPlantId),
      ).rejects.toThrowError(notFound());
      expect(service.getPlantLevelNameByLoveGague).not.toHaveBeenCalled();
    });
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

  describe('get plant water log information by userPlantId', () => {
    const mockUserPlantId: number = 1;
    const mockResult = [
      {
        id: 1,
        review: '리뷰1',
        wateringDate: '07/22',
      },
      {
        id: 3,
        review: '리뷰2',
        wateringDate: '07/22',
      },
    ];

    it('존재하는 userPlant id 가 주어지면, 식물 단계 정보를 반환한다.', async () => {
      const mockFindMany = waterPrisma.findMany.mockResolvedValueOnce(
        mockResult as any,
      );

      const result = await service.getPlantWaterLog(mockUserPlantId);
      expect(result).toEqual({ reviews: mockResult });
      expect(mockFindMany).toHaveBeenCalledWith({
        where: { userPlantId: mockUserPlantId, isDeleted: false },
        select: {
          id: true,
          review: true,
          wateringDate: true,
        },
      });
    });
  });
});
