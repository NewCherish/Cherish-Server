import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';

@Module({
  controllers: [PlantsController],
  providers: [PlantsService]
})
export class PlantsModule {}
