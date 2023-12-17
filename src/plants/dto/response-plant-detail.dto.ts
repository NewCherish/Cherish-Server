import { ApiProperty } from '@nestjs/swagger';
import { ResponseSuccessDto } from 'src/common/dto/response-success.dto';
import { READ_PLANT_DETAIL } from 'src/constants/swagger';

const DTO_RESPONSE_DESCRIPTION = READ_PLANT_DETAIL.DTO_DESCRIPTION.RESPONSE;

export class ResponsePlantDetailData {
  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.ID })
  id: number;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.NICKNAME })
  nickname: string;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.DURATION })
  duration: number;

  @ApiProperty({
    required: false,
    description: DTO_RESPONSE_DESCRIPTION.INSTAGRAM,
  })
  instagram?: string;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.D_DAY })
  dDay: number;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.PLANT_ID })
  plantId: number;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.PLANT_IMAGE })
  plantImage: string;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.PLANT_NAME })
  plantName: string;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.LEVEL_NAME })
  levelName: string;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.STATUS_MESSAGE })
  statusMessage: string;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.STATUS_GAUGE })
  statusGauge: number;
}

export class ResponsePlantDetailDto extends ResponseSuccessDto {
  @ApiProperty()
  data: ResponsePlantDetailData;
}
