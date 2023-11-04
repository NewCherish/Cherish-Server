import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ResponseSuccessDto } from 'src/common/dto/response-success.dto';
import { GET_PLANT_WATER_LOG } from 'src/constants/swagger';

const DTO_RESPONSE_DESCRIPTION = GET_PLANT_WATER_LOG.DTO_DESCRIPTION.RESPONSE;

export class PlantWaterLogData {
  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.REVIEWS.ID })
  id: number;

  @ApiProperty({
    description: DTO_RESPONSE_DESCRIPTION.REVIEWS.CREATEDAT,
  })
  wateringDate: string;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.REVIEWS.REVIEW })
  review: string;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.REVIEWS.REVIEW })
  keywords?: string[];
}

export class ResponseGetPlantWaterLogData {
  @ApiProperty({ isArray: true, type: PlantWaterLogData })
  reviews: PlantWaterLogData[];
}

export class ResponseGetPlantWaterLogDto extends ResponseSuccessDto {
  @ApiProperty()
  data: ResponseGetPlantWaterLogData;
}

export class CreatePlantWaterLogDto {
  @ApiProperty()
  keywords: string[];

  @ApiProperty()
  @IsString()
  review: string;
}

export class ResponseCreatePlantWaterDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userPlantId: number;

  @ApiProperty()
  wateringDate: Date;
}
