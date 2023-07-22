import { ApiProperty } from '@nestjs/swagger';
import { ResponseSuccessDto } from 'src/common/dto/response-success.dto';
import { ResponseTokenData } from './response-token.dto';

import { SIGNIN_DESCRIPTION } from 'src/constants/swagger';

const DTO_RESPONSE_DESCRIPTION = SIGNIN_DESCRIPTION.DTO_DESCRIPTION.RESPONSE;

export class ResponseSigninData extends ResponseTokenData {
  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.ID })
  id: number;
}

export class ResponseSigninDto extends ResponseSuccessDto {
  @ApiProperty()
  data: ResponseSigninData;
}
