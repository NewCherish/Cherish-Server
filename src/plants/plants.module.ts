import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Validation } from 'src/utils/validation';
import { PlantsController } from './plants.controller';

@Module({
  imports: [ConfigModule]
  controllers: [PlantsController],
  providers: [PlantsService, PrismaService, ConfigService, Validation]
})
export class PlantsModule {}
