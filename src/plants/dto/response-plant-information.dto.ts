import { ApiProperty } from '@nestjs/swagger';
import { ResponseSuccessDto } from 'src/common/dto/response-success.dto';
import { READ_PLANT_INFORMATION } from 'src/constants/swagger';

const DTO_RESPONSE_DESCRIPTION =
  READ_PLANT_INFORMATION.DTO_DESCRIPTION.RESPONSE;

export class PlantLevelData {
  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.PLANT_LEVEL.LEVEL_NAME })
  levelName: string;

  @ApiProperty({
    description: DTO_RESPONSE_DESCRIPTION.PLANT_LEVEL.DESCRIPTION,
  })
  description: string;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.PLANT_LEVEL.IMAGE_URL })
  imageURL: string;
}

export class ResponsePlantInformationData {
  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.INTRODUCTION })
  introduction: string;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.NAME })
  name: string;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.MEANING })
  meaning: string;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.EXPLANATION })
  explanation: string;

  @ApiProperty({
    isArray: true,
    type: PlantLevelData,
  })
  plantLevel: PlantLevelData[];

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.CIRCLE_IMAGE_URL })
  circleImageURL: string;
}

export class ResponsePlantInformationDto extends ResponseSuccessDto {
  @ApiProperty()
  data: ResponsePlantInformationData;
}
