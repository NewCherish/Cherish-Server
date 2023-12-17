import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { UPDATE_PLANT_DETAIL } from 'src/constants/swagger';

const DTO_BODY_DESCRIPTION = UPDATE_PLANT_DETAIL.DTO_DESCRIPTION.BODY;

export class UpdatePlantDetailDto {
  @ApiProperty({ description: DTO_BODY_DESCRIPTION.PHONE, required: true })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ description: DTO_BODY_DESCRIPTION.NICKNAME, required: true })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty({
    description: DTO_BODY_DESCRIPTION.WATER_CYCLE,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  waterCycle: number;

  @ApiProperty({ description: DTO_BODY_DESCRIPTION.WATER_TIME, required: true })
  @IsNotEmpty()
  @IsString()
  waterTime: string;

  @ApiProperty({ description: DTO_BODY_DESCRIPTION.INSTAGRAM, required: false })
  @IsOptional()
  @IsString()
  instagram?: string;
}
