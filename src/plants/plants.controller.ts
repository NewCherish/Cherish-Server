import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
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
import {
  ERROR_DESCRIPTION,
  PLANT_INFORMATION,
  GET_PLANT_WATER_LOG,
  CREATE_PLANT_WATER,
} from 'src/constants/swagger';
import { wrapSuccess } from 'src/utils/success';
import { RESPONSE_MESSAGE } from 'src/common/objects';
import {
  ResponseCreatePlantWaterDto,
  ResponseGetPlantWaterLogDto,
} from './dto/plantwaterlog.dto';
import { badRequest } from 'src/utils/error';

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

  @Get(':id/water')
  @ApiOperation({
    summary: GET_PLANT_WATER_LOG.API_OPERATION.SUMMARY,
    description: GET_PLANT_WATER_LOG.API_OPERATION.DESCRIPTION,
  })
  @ApiParam({
    type: Number,
    name: GET_PLANT_WATER_LOG.API_PARAM.NAME,
    required: true,
    description: GET_PLANT_WATER_LOG.API_PARAM.DESCRIPTION,
  })
  @ApiOkResponse({ type: ResponseGetPlantWaterLogDto })
  @ApiBadRequestResponse({
    description: GET_PLANT_WATER_LOG.ERROR_DESCRIPTION.BAD_REQUEST,
  })
  async getPlantWaterLog(
    @Param() { id }: CommonParamsDto,
  ): Promise<ResponseGetPlantWaterLogDto> {
    const data = await this.plantsService.getPlantWaterLog(id);

    return wrapSuccess(
      HttpStatus.OK,
      RESPONSE_MESSAGE.READ_PLANT_WATER_LOG_SUCCESS,
      data,
    );
  }

  @Post(':id/water')
  @ApiOperation({
    summary: CREATE_PLANT_WATER.API_OPERATION.SUMMARY,
    description: CREATE_PLANT_WATER.API_OPERATION.DESCRIPTION,
  })
  @ApiParam({
    type: Number,
    name: CREATE_PLANT_WATER.API_PARAM.NAME,
    required: true,
    description: CREATE_PLANT_WATER.API_PARAM.DESCRIPTION,
  })
  @ApiOkResponse({ type: ResponseCreatePlantWaterDto })
  @ApiBadRequestResponse({
    description: CREATE_PLANT_WATER.ERROR_DESCRIPTION.BAD_REQUEST,
  })
  async postPlantWaterLog(
    @Param() { id }: CommonParamsDto,
  ): Promise<ResponseGetPlantWaterLogDto> {
    const data = await this.plantsService.createPlantWater(id);

    return wrapSuccess(
      HttpStatus.OK,
      RESPONSE_MESSAGE.CREATE_PLANT_WATER_LOG_SUCCESS,
      data,
    );
  }
}
