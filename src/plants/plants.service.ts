import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ResponsePlantsData } from './dto/read-plants.dto';

@Injectable()
export class PlantsService {
  constructor(private prisma: PrismaService) {}

}
