import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ReadPlantInformationParam {
  @IsNumber()
  @Type(() => Number)
  readonly id: number;
}
