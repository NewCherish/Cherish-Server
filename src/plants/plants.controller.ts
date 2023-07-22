import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { PlantsService } from './plants.service';
import { ResponsePlantInformationDto } from './dto/response-plantInformation.dto';
import { CommonParamsDto } from 'src/common/dto/common-params.dto';
import { ERROR_DESCRIPTION, PLANT_INFORMATION } from 'src/constants/swagger';
import { wrapSuccess } from 'src/utils/success';
import { RESPONSE_MESSAGE } from 'src/common/objects';

@Controller('plants')
@ApiTags('Plants')
@ApiInternalServerErrorResponse({
  description: ERROR_DESCRIPTION.INTERNAL_SERVER_ERROR,
})
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Get(':id/information')
  @ApiOperation({
    summary: PLANT_INFORMATION.API_OPERATION.SUMMARY,
    description: PLANT_INFORMATION.API_OPERATION.DESCRIPTION,
  })
  @ApiParam({
    type: Number,
    name: PLANT_INFORMATION.API_PARAM.NAME,
    required: true,
    description: PLANT_INFORMATION.API_PARAM.DESCRIPTION,
  })
  @ApiOkResponse({ type: ResponsePlantInformationDto })
  @ApiBadRequestResponse({
    description: PLANT_INFORMATION.ERROR_DESCRIPTION.BAD_REQUEST,
  })
  @ApiNotFoundResponse({
    description: PLANT_INFORMATION.ERROR_DESCRIPTION.NOT_FOUND,
  })
  async getPlantInformation(
    @Param() { id }: CommonParamsDto,
  ): Promise<ResponsePlantInformationDto> {
    const data = await this.plantsService.getPlantInformation(id);

    return wrapSuccess(
      HttpStatus.OK,
      RESPONSE_MESSAGE.READ_PLANT_INFORMATION_SUCCESS,
      data,
    );
  }
}
