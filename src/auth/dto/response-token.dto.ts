import { ApiProperty } from '@nestjs/swagger';
import { ResponseSuccessDto } from 'src/common/dto/response-success.dto';

export class ResponseTokenData {
  @ApiProperty({ description: 'access token' })
  accessToken: string;

  @ApiProperty({ description: 'refresh token' })
  refreshToken: string;
}

export class ResponseTokenDto extends ResponseSuccessDto {
  @ApiProperty()
  data: ResponseTokenData;
}
