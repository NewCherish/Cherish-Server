import { Test, TestingModule } from '@nestjs/testing';

import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';

import { mockPlant } from '../../test/mock/plants.mock';

describe('PlantsController', () => {
  let controller: PlantsController;
  let service: PlantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantsController],
      providers: [
        {
          provide: PlantsService,
          useValue: {
            getPlantInformation: jest.fn(),
            getPlantWaterLog: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlantsController>(PlantsController);
    service = module.get<PlantsService>(PlantsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
    const mockSuccessResponse = {
      statusCode: 200,
      success: true,
      message: '식물 단계 조회 성공',
      data: mockResult,
    };

    it('존재하는 식물 id가 주어지면, 성공 response 반환', async () => {
      jest.spyOn(service, 'getPlantInformation').mockResolvedValue(mockResult);

      const result = await controller.getPlantInformation({ id: mockPlantId });

      expect(result).toEqual(mockSuccessResponse);
    });
  });

  describe('get plant water log information by userPlantId', () => {
    const mockUserPlantId: number = 1;
    const mockResult = {
      reviews: [
        {
          id: 1,
          review: '리뷰1',
          wateringDate: '07/22',
        },
      ],
    };
    const mockSuccessResponse = {
      statusCode: 200,
      success: true,
      message: '식물 물주기 기록 조회 성공',
      data: mockResult,
    };

    it('존재하는 userPlant id가 주어지면, 성공 response 반환', async () => {
      jest.spyOn(service, 'getPlantWaterLog').mockResolvedValue(mockResult);

      const result = await controller.getPlantWaterLog({
        id: mockUserPlantId,
      });

      expect(result).toEqual(mockSuccessResponse);
    });
  });
});
