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
import { ResponsePlantInformationDto } from './dto/response-plant-information.dto';
import { CommonParamsDto } from 'src/common/dto/common-params.dto';
import {
  ERROR_DESCRIPTION,
  READ_PLANT_DETAIL,
  READ_PLANT_INFORMATION,
  READ_PLANT_WATER_LOG,
  READ_PLANTS
} from 'src/constants/swagger';
import { wrapSuccess } from 'src/utils/success';
import { RESPONSE_MESSAGE } from 'src/common/objects';
import { ResponsePlantWaterLogDto } from './dto/response-plant-water-log.dto';
import { ResponsePlantDetailDto } from './dto/response-plant-detail.dto';
import { ResponseUserPlantsDto } from './dto/response-plants.dto';
@Controller('plants')
@ApiTags('Plants')
@ApiInternalServerErrorResponse({
  description: ERROR_DESCRIPTION.INTERNAL_SERVER_ERROR,
})
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Get(':id')
  @ApiOperation(READ_PLANT_DETAIL.API_OPERATION)
  @ApiParam(READ_PLANT_DETAIL.API_PARAM)
  @ApiOkResponse({ type: ResponsePlantDetailDto })
  @ApiBadRequestResponse({
    description: READ_PLANT_DETAIL.ERROR_DESCRIPTION.BAD_REQUEST,
  })
  @ApiNotFoundResponse({
    description: READ_PLANT_DETAIL.ERROR_DESCRIPTION.NOT_FOUND,
  })
  async getPlantDetail(
    @Param() { id }: CommonParamsDto,
  ): Promise<ResponsePlantDetailDto> {
    const data = await this.plantsService.getUserPlantDetail(id);

    return wrapSuccess(
      HttpStatus.OK,
      RESPONSE_MESSAGE.READ_PLANT_DETAIL_SUCCESS,
      data,
    );
  }

  @Get(':id/information')
  @ApiOperation(READ_PLANT_INFORMATION.API_OPERATION)
  @ApiParam(READ_PLANT_INFORMATION.API_PARAM)
  @ApiOkResponse({ type: ResponsePlantInformationDto })
  @ApiBadRequestResponse({
    description: READ_PLANT_INFORMATION.ERROR_DESCRIPTION.BAD_REQUEST,
  })
  @ApiNotFoundResponse({
    description: READ_PLANT_INFORMATION.ERROR_DESCRIPTION.NOT_FOUND,
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
  @ApiOperation(READ_PLANT_WATER_LOG.API_OPERATION)
  @ApiParam(READ_PLANT_WATER_LOG.API_PARAM)
  @ApiOkResponse({ type: ResponsePlantWaterLogDto })
  @ApiBadRequestResponse({
    description: READ_PLANT_WATER_LOG.ERROR_DESCRIPTION.BAD_REQUEST,
  })
  async getPlantWaterLog(
    @Param() { id }: CommonParamsDto,
  ): Promise<ResponsePlantWaterLogDto> {
    const data = await this.plantsService.getPlantWaterLog(id);

    return wrapSuccess(
      HttpStatus.OK,
      RESPONSE_MESSAGE.READ_PLANT_WATER_LOG_SUCCESS,
      data,
    );
  }

  @Get()
  @ApiOperation(READ_PLANTS.API_OPERATION)
  @ApiOkResponse( {type: ResponseUserPlantsDto})
  async getUserPlants(): Promise<ResponseUserPlantsDto> {
    const data = await this.plantsService.getUserPlants(1);

    return wrapSuccess(
      HttpStatus.OK, 
      RESPONSE_MESSAGE.READ_PLANTS_SUCCESS, 
      data
    );
  }
}
