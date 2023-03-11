import { ApiProperty } from '@nestjs/swagger';

export class ResponseSuccessDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;
}
