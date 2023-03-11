import { Controller, Get } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('plants')
@ApiTags('Plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}
}
