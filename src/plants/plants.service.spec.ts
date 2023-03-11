import { Test, TestingModule } from '@nestjs/testing';
import { PlantsService } from './plants.service';

describe('PlantsService', () => {
  let service: PlantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantsService],
    }).compile();

    service = module.get<PlantsService>(PlantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
