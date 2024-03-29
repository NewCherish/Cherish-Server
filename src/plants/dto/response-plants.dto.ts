import { ApiProperty } from '@nestjs/swagger';
import { ResponseSuccessDto } from 'src/common/dto/response-success.dto';
import { READ_PLANTS } from 'src/constants/swagger';

const DTO_RESPONSE_DESCRIPTION = READ_PLANTS.DTO_DESCRIPTION.RESPONSE;

export class UserPlantData {
  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.PLANTS.ID })
  id: number;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.PLANTS.PLANT_TYPE })
  plantType: string;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.PLANTS.D_DAY })
  dDay: number;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.PLANTS.NICKNAME })
  nickname: string;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.PLANTS.DESCRIPTION })
  description: string;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.PLANTS.LEVEL_NAME })
  levelName: string;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.PLANTS.CIRCLE_IMAGE })
  circleImage: string;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.PLANTS.MAIN_IMAGE })
  mainImage: string;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.PLANTS.LOVE_GAUGE })
  loveGauge: number;

  // @ApiProperty({description: DTO_RESPONSE_DESCRIPTION.PLANTS.IS_WATERED})
  // isWatered: boolean;
}

export class ResponseUserPlantsData {
  @ApiProperty({ isArray: true, type: UserPlantData })
  userPlants: UserPlantData[];

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.PLANT_COUNT })
  userPlantsCount: number;
}

export class ResponseUserPlantsDto extends ResponseSuccessDto {
  @ApiProperty()
  data: ResponseUserPlantsData;
}
