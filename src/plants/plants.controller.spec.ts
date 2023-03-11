import { Test, TestingModule } from '@nestjs/testing';
import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';

describe('PlantsController', () => {
  let controller: PlantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantsController],
      providers: [PlantsService],
    }).compile();

    controller = module.get<PlantsController>(PlantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
