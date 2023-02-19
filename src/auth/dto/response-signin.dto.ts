import { ApiProperty } from '@nestjs/swagger';
import { ResponseSuccessDto } from 'src/common/dto/response-success.dto';
import { ResponseTokenData } from './response-token.dto';

export class ResponseSigninData extends ResponseTokenData {
  @ApiProperty({ description: 'id' })
  id: number;
}

export class ResponseSigninDto extends ResponseSuccessDto {
  @ApiProperty()
  data: ResponseSigninData;
}
