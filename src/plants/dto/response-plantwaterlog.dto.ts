import { ApiProperty } from '@nestjs/swagger';
import { ResponseSuccessDto } from 'src/common/dto/response-success.dto';
import { PLANT_WATER_LOG } from 'src/constants/swagger';

const DTO_RESPONSE_DESCRIPTION = PLANT_WATER_LOG.DTO_DESCRIPTION.RESPONSE;

export class PlantWaterReviewData {
  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.REVIEWS.ID })
  id: number;

  @ApiProperty({
    description: DTO_RESPONSE_DESCRIPTION.REVIEWS.CREATEDAT,
  })
  createdAt: Date;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.REVIEWS.REVIEW })
  review: string;
}

export class ResponsePlantWaterLogData {
  @ApiProperty()
  reviews: PlantWaterReviewData[];
}

export class ResponsePlantWaterLogDto extends ResponseSuccessDto {
  @ApiProperty()
  data: ResponsePlantWaterLogData;
}
