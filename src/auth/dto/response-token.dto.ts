import { ApiProperty } from '@nestjs/swagger';

import { ResponseSuccessDto } from 'src/common/dto/response-success.dto';
import { SIGNIN_DESCRIPTION } from 'src/constants/swagger';

const DTO_RESPONSE_DESCRIPTION = SIGNIN_DESCRIPTION.DTO_DESCRIPTION.RESPONSE;

export class ResponseTokenData {
  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.TOKEN.ACCESS_TOKEN })
  accessToken: string;

  @ApiProperty({ description: DTO_RESPONSE_DESCRIPTION.TOKEN.REFRESH_TOKEN })
  refreshToken: string;
}

export class ResponseTokenDto extends ResponseSuccessDto {
  @ApiProperty()
  data: ResponseTokenData;
}
