import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { SIGNIN_DESCRIPTION } from 'src/constants/swagger';

const DTO_CREATE_DESCRIPTION = SIGNIN_DESCRIPTION.DTO_DESCRIPTION.CREATE;

export class CreateSigninDto {
  @ApiProperty({
    required: true,
    description: DTO_CREATE_DESCRIPTION.SOCIAL_TYPE,
  })
  @IsString()
  @IsNotEmpty()
  socialType: 'kakao' | 'apple';

  @ApiProperty({ required: true, description: DTO_CREATE_DESCRIPTION.NICKNAME })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({
    required: true,
    description: DTO_CREATE_DESCRIPTION.FCM_TOKEN,
  })
  @IsString()
  @IsNotEmpty()
  fcmToken: string;

  @ApiPropertyOptional({
    description: DTO_CREATE_DESCRIPTION.KAKAO_ACCESS_TOKEN,
  })
  @IsOptional()
  @IsString()
  kakaoAccessToken?: string;

  @ApiPropertyOptional({ description: DTO_CREATE_DESCRIPTION.ID_TOKEN })
  @IsOptional()
  @IsString()
  idToken?: string;

  @ApiPropertyOptional({ description: DTO_CREATE_DESCRIPTION.CODE })
  @IsOptional()
  @IsString()
  code?: string;
}
