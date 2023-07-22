import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CommonParamsDto {
  @IsNumber()
  @Type(() => Number)
  readonly id: number;
}
