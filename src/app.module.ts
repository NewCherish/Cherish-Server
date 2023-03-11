import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantsModule } from './plants/plants.module';

@Module({
  imports: [PlantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
